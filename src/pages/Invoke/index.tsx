import {
  AndroidOutlined,
  AppleOutlined,
  EllipsisOutlined,
  FolderOutlined, InfoCircleOutlined, PlusOutlined, SearchOutlined, UserOutlined,
} from '@ant-design/icons';

import { PageContainer } from '@ant-design/pro-components';
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Dropdown, Input,
  MenuProps,
  message,
  Row,
  Select,
  Space,
  Tabs,
  Tag, Tooltip,
  Tree,
} from 'antd';

import DrawerInterface from '@/pages/Invoke/components/DrawerInterface';
import RequestBody from '@/pages/Invoke/components/RequestBody';
import RequestHeader from '@/pages/Invoke/components/RequestHeader';
import RequestParam from '@/pages/Invoke/components/RequestParam';
import TabInterface from '@/pages/Invoke/components/TabInterface';
import { getInterfaceById } from '@/services/api/interface';
import { invokeInterface } from '@/services/api/invoke';
import { DirectoryTreeProps } from 'antd/es/tree';
import React, { useEffect, useRef, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useLocation, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const { DirectoryTree } = Tree;
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a onClick={event=>event.preventDefault()} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        编辑
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a onClick={event=>event.preventDefault()} target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        添加菜单
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a onClick={event=>event.preventDefault()} target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        复制
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a onClick={event=>event.preventDefault()} target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        删除
      </a>
    ),
  },
];

const treeData: any = [
  {
    title: (
      <>
        'parent 0'
        <Dropdown
          menu={{ items,onClick:event=>event.domEvent.stopPropagation() }}
          trigger={['click']}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
        >
          <Button
            onClick={(e) => e.stopPropagation()}
            type="dashed"
            size="small"
            shape="circle"
            icon={<EllipsisOutlined />}
          />
        </Dropdown>
      </>
    ),
    key: '0-0',
    children: [
      {
        title: (
          <>
            'leaf 0-0'
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              placement="bottomLeft"
              arrow={{ pointAtCenter: true }}
            >
              <Button
                onClick={(e) => e.stopPropagation()}
                type="dashed"
                size="small"
                shape="circle"
                icon={<EllipsisOutlined />}
              />
            </Dropdown>
          </>
        ),
        key: '0-0-0',
        isLeaf: false,
      },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: false },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true, icon: <FolderOutlined /> },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

const Index: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const location: any = useLocation();
  useEffect(() => {
    const id = location.state?.interfaceId;
    if (id) {
      setDrawerOpen(true);
      getInterfaceById({
        id,
      }).then((res) => {
        setCurrentInterface(res?.data);
      });
    }
    console.log('params=', params);
    console.log('searchParams', searchParams);
    console.log('location', location);
  }, []);

  /*** 当前需要调试的接口*/
  const [currentInterface, setCurrentInterface] = useState({});
  /*** 控制抽屉 */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(!open);
  };
  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };
  const [url, setUrl] = useState('');
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestParams, setRequestParams] = useState({});
  const [requestHeaders, setRequestHeaders] = useState({});
  const [responseHeader, setResponseHeader] = useState({});
  const [requestBody, setRequestBody] = useState('');
  const [responseBody, setResponseBody] = useState({});
  const [baseResponse, setBaseResponse] = useState([]);
  const onAutoChange = (data: string) => {
    setUrl(data);
  };
  const invokeAnotherInterface = async () => {
    if (url === '') {
      message.warning('url是必填项');
      return;
    }
    const res = await invokeInterface({
      url: url,
      method: requestMethod,
      requestParams,
      requestHeaders,
      requestBody,
    });
    console.log(res);
    if (res?.code === 200) {
      // @ts-ignore
      setBaseResponse(JSON.parse(res?.data?.baseResponse));
      return;
    }
    message.error(res?.message);
  };
  /**
   * 切换请求方法
   */
  const changeRequestMethod = (method: string) => {
    setRequestMethod(method);
  };
  /**
   * 切换tab的回调函数
   * @param key
   */
  const tabRef = useRef();

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    // @ts-ignore
    tabRef.current && tabRef.current.test(info.node.key, info.node.title, info.node.isLeaf);

    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

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

  const acceptRequestParams = (acceptParams: []) => {
    setRequestParams(requestParams);
    let params = '';
    acceptParams.forEach((param) => {
      params = params + param['requestKey'] + '=' + param['requestValue'] + '&';
    });
    params = params.substring(0, params.lastIndexOf('&'));
    setUrl(url + '?' + params);
  };

  const code1 = "// your original code...";
  const code2 = "// a different version...";
  const options = {
    //renderSideBySide: false
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
          <Space.Compact>
            <Button type="primary" shape="circle">
              <PlusOutlined />
            </Button>
            <Input
              placeholder=""
              prefix={<SearchOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="搜索">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </Space.Compact>
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </Col>

        <Col span={18} offset={1}>
          <Row gutter={0}>
            <Col className="gutter-row" span={24}>
              <TabInterface ref={tabRef} />
              <Space.Compact block={true}>
                <Select
                  size="large"
                  value={requestMethod}
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
                  value={url}
                  options={[
                    { value: 'http://localhost:9527/sys/interface/listInterfaces?id=11' },
                    { value: 'http://localhost:9527/sys/invoke/post' },
                    { value: 'https://q.qlogo.cn/g?b=qq&nk=750321038&s=640' },
                    {
                      value: 'http://q.qlogo.cn/headimg_dl?dst_uin=750321038&spec=640&img_type=jpg',
                    },
                    { value: 'http://localhost:9527/sys/invoke/qq?qq=750321038' },
                  ]}
                />
                <Button type="primary" size="large" onClick={invokeAnotherInterface}>
                  Send
                </Button>
                <Button type="primary" size="large" onClick={showDrawer}>
                  open
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
                    Params
                  </span>
                ),
                key: 'params',
                children: <RequestParam acceptRequestParams={acceptRequestParams} />,
              },
              {
                label: (
                  <span>
                    <AndroidOutlined />
                    Headers
                  </span>
                ),
                key: 'headers',
                children: <RequestHeader />,
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

          <JSONPretty json={baseResponse}></JSONPretty>
        </Col>
      </Row>

      <DrawerInterface
        currentInterface={currentInterface}
        drawerOpen={drawerOpen}
        onCloseDrawer={onCloseDrawer}
      />
    </PageContainer>
  );
};

export default Index;
