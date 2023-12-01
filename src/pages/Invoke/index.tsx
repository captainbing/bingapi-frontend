import {
  AndroidOutlined,
  AppleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { PageContainer } from '@ant-design/pro-components';
import {
  AutoComplete,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Tree,
  TreeSelect,
} from 'antd';

import DrawerInterface from '@/pages/Invoke/components/DrawerInterface';
import MenuModal from '@/pages/Invoke/components/MenuModal';
import RequestBody from '@/pages/Invoke/components/RequestBody';
import RequestHeader from '@/pages/Invoke/components/RequestHeader';
import RequestParam from '@/pages/Invoke/components/RequestParam';
import SelfDropDown from '@/pages/Invoke/components/SelfDropDown';
import TabInterface from '@/pages/Invoke/components/TabInterface';
import {
  addInterfaceRecord,
  getInvokeRecordById,
  getMenuTree,
  invokeInterface,
  recoverInvokeRecordById,
  selectMenu,
} from '@/services/api/invoke';
import { getInterfaceInfoById } from '@/services/bingapi/interfaceInfoController';
import { useModel } from '@umijs/max';
import { DirectoryTreeProps } from 'antd/es/tree';
import React, { useEffect, useRef, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useLocation, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const { DirectoryTree } = Tree;

const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [recordTreeData, setRecordTreeData] = useState<any>([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const location: any = useLocation();
  const [treeMenu, setTreeMenu] = useState([]);
  /**
   * 原始请求数据
   */
  const listMenuTree = async () => {
    const directoryMenuData = await selectMenu({
      id: initialState?.currentUser?.id,
    });
    if (directoryMenuData?.code === 200) {
      setTreeMenu(directoryMenuData?.data);
      const res = await getMenuTree();
      if (res?.code === 200) {
        setRecordTreeData(res?.data);
        recursionGetTree(res?.data, directoryMenuData?.data);
        return;
      }
      message.error(res?.message);
    } else {
      message.error(directoryMenuData?.message);
    }
  };

  /**
   * 生成树形结构
   * @param menu
   */
  const recursionGetTree = (menu: any, treeMenuData: any) => {
    if (menu?.length) {
      for (let i = 0; i < menu.length; i++) {
        let currentMenu = menu[i];
        const temp = {
          key: currentMenu?.key,
          title: currentMenu?.title,
          parentId: currentMenu?.parentId,
          isLeaf: currentMenu?.isLeaf,
        };
        if (currentMenu.isLeaf) {
          // 文件
          currentMenu.title = (
            <SelfDropDown
              currentFloor={temp}
              treeMenu={treeMenuData}
              listMenuTree={listMenuTree}
              isMenu={false}
            />
          );
        } else {
          currentMenu.title = (
            <SelfDropDown
              currentFloor={temp}
              treeMenu={treeMenuData}
              listMenuTree={listMenuTree}
              isMenu={true}
            />
          );
        }
        if (menu[i].children) {
          recursionGetTree(menu[i].children, treeMenuData);
        }
      }
    }
  };
  useEffect(() => {
    const id = location.state?.interfaceId;
    if (id) {
      setDrawerOpen(true);
      getInterfaceInfoById({
        id,
      }).then((res) => {
        setCurrentInterface(res?.data);
      });
    }
    listMenuTree();
  }, []);

  /*** 当前需要调试的接口*/
  const [currentInterface, setCurrentInterface] = useState({});

  /**
   * 填充当前调式接口响应参数
   * @param id
   */
  const fillCurrentInterfaceInfo = async (id: any) => {
    if (!id) {
      message.error('当前id为空');
      return;
    }
    const res = await getInterfaceInfoById({
      id,
    });
    if (res?.code === 200) {
      setCurrentInterface(res?.data);
      showDrawer();
      return;
    }
    message.error(res?.message);
  };

  /**
   * 请求相关信息
   */
  const defaultInvokeRecord = {
    requestUrl: '',
    requestMethod: 'GET',
    requestParam: [],
    requestHeader: [],
    requestBody: '{}',
    responseHeader: [
      {
        key: '0',
        requestKey: '',
        requestValue: '',
        description: '',
      },
    ],
    responseBody: '{}',
  };
  const [invokeRecord, setInvokeRecord] = useState({ ...defaultInvokeRecord });

  /*** 控制抽屉 */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const onAutoChange = (requestUrl: string) => {
    setInvokeRecord({
      ...invokeRecord,
      requestUrl,
    });
  };
  /**
   * 接口调用
   */
  const invokeAnotherInterface = async () => {
    if (invokeRecord?.url === '') {
      message.warning('url是必填项');
      return;
    }
    const res = await invokeInterface({
      requestUrl: invokeRecord?.requestUrl,
      requestMethod: invokeRecord.requestMethod,
      requestParam: invokeRecord.requestParam,
      requestHeader: invokeRecord.requestHeader,
      requestBody: invokeRecord.requestBody,
    });
    if (res?.code === 200) {
      // @ts-ignore
      setInvokeRecord({
        ...invokeRecord,
        responseBody: res?.data?.responseBody,
      });
      return;
    }
    message.error(res?.message);
  };
  /**
   * 切换请求方法
   */
  const changeRequestMethod = (method: string) => {
    setInvokeRecord({
      ...invokeRecord,
      requestMethod: method,
    });
  };
  /**
   * 切换tab的回调函数
   * @param key
   */
  const tabRef = useRef();

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    if (!info.node.isLeaf) {
      // 类型为目录
      return;
    }
    setCurrentRecordId(info.node.key as string);
    // @ts-ignore
    tabRef.current && tabRef.current.test(info.node.key, info.node.title, info.node.isLeaf);
    fetchInvokeRecordById(info.node.key as string);
    console.log('Trigger Select', keys, info);
  };

  /**
   * 获取当前接口 调用信息
   * @param id
   */
  const fetchInvokeRecordById = async (id: string) => {
    const res = await getInvokeRecordById({
      id,
    });
    if (res?.code === 200) {
      setInvokeRecord(res?.data);
      return;
    }
    if (res?.code === 40400) {
      setInvokeRecord({ ...defaultInvokeRecord });
      return;
    }
    message.error(res?.message);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  /**
   * 请求选项 todo做成配置式
   */
  const requestMethodOptions = [
    {
      value: 'GET',
      label: (
        <Tag bordered={false} color="processing">
          GET
        </Tag>
      ),
    },
    {
      value: 'POST',
      label: (
        <Tag bordered={false} color="success">
          POST
        </Tag>
      ),
    },
    {
      value: 'PUT',
      label: (
        <Tag bordered={false} color="error">
          PUT
        </Tag>
      ),
    },
    {
      value: 'DELETE',
      label: (
        <Tag bordered={false} color="warning">
          DELETE
        </Tag>
      ),
    },
    {
      value: 'OPTIONS',
      label: (
        <Tag bordered={false} color="magenta">
          OPTIONS
        </Tag>
      ),
    },
    {
      value: 'PATCH',
      label: (
        <Tag bordered={false} color="orange">
          PATCH
        </Tag>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuModal = useRef();
  const showModal = () => {
    menuModal.current?.editSetting();
    setIsModalOpen(true);
  };

  /**
   * 接受子组件的请求参数
   * @param acceptParams
   */
  const acceptRequestParams = (acceptParams: any) => {
    setInvokeRecord({
      ...invokeRecord,
      requestParam: acceptParams,
    });
  };

  const acceptRequestHeader = (acceptHeaders: any) => {
    setInvokeRecord({
      ...invokeRecord,
      requestHeader: acceptHeaders,
    });
  };

  const cancelMenuModal = () => {
    setIsModalOpen(false);
  };

  /**
   * 保存记录
   */
  const [form] = Form.useForm();
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const handelCancelMenuModal = () => {
    setSaveModalOpen(false);
  };

  const handleSaveRecord = async () => {
    const data = {
      ...invokeRecord,
      ...form.getFieldsValue(),
    };
    const res = await addInterfaceRecord(data);
    if (res?.code === 200) {
      message.success('保存成功');
      listMenuTree();
      setSaveModalOpen(false);
      form.resetFields();
      return;
    }
    message.error(res?.message);
  };

  /**
   * 删除请求参数当前行
   * @param key
   */
  const handleDeleteRequestParam = (key) => {
    const newData = invokeRecord.requestParam.filter((item) => item.key !== key);
    setInvokeRecord({
      ...invokeRecord,
      requestParam: newData,
    });
  };

  /**
   * 删除请求头当前行
   * @param key
   */
  const handleDeleteRequestHeader = (key) => {
    const newData = invokeRecord?.requestHeader.filter((item) => item.key !== key);
    setInvokeRecord({
      ...invokeRecord,
      requestHeader: newData,
    });
  };

  /**
   * 覆盖当前调用记录
   */
  const [currentRecordId, setCurrentRecordId] = useState<string>('');
  const recoverInvokeRecord = async () => {
    if (currentRecordId === '') {
      message.warning('还未选择');
      return;
    }
    const res = await recoverInvokeRecordById({
      ...invokeRecord,
      id: currentRecordId,
    });
    if (res?.code === 200) {
      message.success('更新成功');
      return;
    }
    message.error(res?.message);
  };

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <Row>
        <Col span={4}>
          <Space>
            <Input
              placeholder=""
              prefix={<SearchOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="搜索">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <Button type="primary" shape="default" onClick={showModal}>
              <PlusOutlined />
            </Button>
          </Space>

          <DirectoryTree
            expandAction="doubleClick"
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={recordTreeData}
          />
        </Col>

        <Col span={18} offset={1}>
          <Row gutter={0}>
            <Col className="gutter-row" span={24}>
              <TabInterface
                ref={tabRef}
                fetchInvokeRecordById={fetchInvokeRecordById}
                showDrawer={showDrawer}
                fillCurrentInterfaceInfo={fillCurrentInterfaceInfo}
              />
              <Space.Compact block={true}>
                <Select
                  size="large"
                  value={invokeRecord?.requestMethod}
                  style={{ width: '15%' }}
                  onSelect={changeRequestMethod}
                  options={requestMethodOptions}
                ></Select>
                <AutoComplete
                  autoFocus={true}
                  onChange={onAutoChange}
                  size="large"
                  style={{ width: '90%' }}
                  placeholder="URL"
                  value={invokeRecord?.requestUrl}
                  options={[
                    { value: 'http://localhost:9527/sys/interface/listInterfaces?id=11' },
                    { value: 'http://localhost:9527/sys/invoke/post' },
                    { value: 'https://q.qlogo.cn/g?b=qq&nk=750321038&s=640' },
                    {
                      value: 'http://q.qlogo.cn/headimg_dl?dst_uin=750321038&spec=640&img_type=jpg',
                    },
                    { value: 'http://localhost:9527/sys/invoke/qq?qq=750321038' },
                    { value: 'http://localhost:9527/sys/invoke/post' },
                  ]}
                />
                <Button type="primary" size="large" onClick={invokeAnotherInterface}>
                  Send
                </Button>
                <Button type="primary" size="large" onClick={() => setSaveModalOpen(true)}>
                  保存
                </Button>
                <Button type="primary" size="large" onClick={recoverInvokeRecord}>
                  覆盖
                </Button>
              </Space.Compact>
            </Col>
          </Row>
          <Tabs
            size="large"
            defaultActiveKey="params"
            items={[
              {
                label: (
                  <span>
                    <AppleOutlined />
                    Param
                  </span>
                ),
                key: 'params',
                children: (
                  <RequestParam
                    requestParam={invokeRecord?.requestParam}
                    acceptRequestParams={acceptRequestParams}
                    handleDeleteRequestParam={handleDeleteRequestParam}
                  />
                ),
              },
              {
                label: (
                  <span>
                    <AndroidOutlined />
                    Header
                  </span>
                ),
                key: 'headers',
                children: (
                  <RequestHeader
                    acceptRequestHeader={acceptRequestHeader}
                    requestHeader={invokeRecord?.requestHeader}
                    handleDeleteRequestHeader={handleDeleteRequestHeader}
                  />
                ),
              },
              {
                label: (
                  <span>
                    <AndroidOutlined />
                    Body
                  </span>
                ),
                key: 'body',
                children: <RequestBody />,
              },
            ]}
          />
          <Divider children="Response" orientation="left" />
          <Card>
            <JSONPretty json={invokeRecord?.responseBody}></JSONPretty>
            {/*<JSONPretty json={interfaceInfo?.responseBody}></JSONPretty>*/}
          </Card>
        </Col>
      </Row>

      <MenuModal
        isModalOpen={isModalOpen}
        cancelMenuModal={cancelMenuModal}
        isEdit={false}
        onRef={menuModal}
        listMenuTree={listMenuTree}
        treeMenu={treeMenu}
      />

      <DrawerInterface
        currentInterface={currentInterface}
        drawerOpen={drawerOpen}
        onCloseDrawer={onCloseDrawer}
      />

      {/*保存接口*/}
      <>
        <Modal
          title="保存"
          open={saveModalOpen}
          onOk={handleSaveRecord}
          onCancel={handelCancelMenuModal}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 13 }}
            style={{ maxWidth: 600 }}
            initialValues={{ title: '', parentId: '0' }}
            autoComplete="off"
          >
            <Form.Item<any>
              label="名称"
              name="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="父级菜单" name="parentId">
              <TreeSelect treeData={treeMenu} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    </PageContainer>
  );
};

export default Index;
