import UpdateInterface from "@/pages/Admin/components/UpdateInterface";
import { deleteInterfaceBatch,deleteInterfaceById,listInterfaceInfo } from '@/services/customapi';
import { PageContainer } from '@ant-design/pro-components';
import {Button, Col, Divider, Input, message, Popconfirm, Row, Select, Space, Table, Tag} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React,{ useEffect,useState } from 'react';


const InterfaceManager: React.FC = () => {
  const columns: ColumnsType<CUSTOM_API.InterfaceInfo> = [

    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      key: 'requestHeader',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      key: 'responseHeader',
    },
    {
      title: 'METHOD',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: '创建人',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '是否删除',
      dataIndex: 'deleted',
      key: 'deleted',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (tag: number) => (
        <span>
        <Tag color={tag === 0 ? 'geekblue' : 'green'} key={tag}>
          {tag === 0 ? '可用' : '关闭'}
        </Tag>
      </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type={'dashed'} onClick={()=>showEditModal(record)}>编辑</Button>
          <Popconfirm
            title={`${record.name}`}
            description={`你确定要删除吗?`}
            onConfirm={()=>removeInterfaceById(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type={'dashed'}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [interfaceList, setInterfaceList] = useState<CUSTOM_API.InterfaceInfo[]>([]);
  useEffect(() => {
    // 初始化接口数据
    getInterfaceList({})
  }, []);
  /**
   * 根据ID删除接口（逻辑）
   */
  const removeInterfaceById = async (record :CUSTOM_API.InterfaceInfo)=> {
    const res = await deleteInterfaceById({
      ids:[record?.id]
    })
    if (res?.code === 200){
      message.success(res?.message)
      await getInterfaceList({})
      return
    }
    message.error(res?.message)
  }
  /**
   * 批量删除接口
   */
  const removeInterfaceBatch = async () => {
    console.log(selectedRowKeys)
    const res = await deleteInterfaceBatch({
      ids:selectedRowKeys
    })
    if (res?.code === 200){
      message.success("删除成功")
      await getInterfaceList({})
      return
    }
    message.error(res?.message)
  }

  /**
   *   表格选择项控制
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('onSelectChange changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const onSelect = (newSelectedRowKeys: React.Key[]) => {
    console.log('onSelect changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: true,
    onSelect: onSelect,
  };

  /**
   * 获取接口集合
   */
  const getInterfaceList = async (params:object) => {
    const res = await listInterfaceInfo(params)
    if (res?.code === 200){
      setInterfaceList(res?.data?.records)
      setTotal(res?.data?.total)
    }
  }

  /**
   * 搜索接口相关参数
   */
  const [interfaceName,setInterfaceName] =useState("")
  const [interfaceStatus,setInterfaceStatus] =useState("")
  const [interfaceMethod,setInterfaceMethod] =useState("")

  const searchInterfaceList = async () => {
    await getInterfaceList({
      name:interfaceName,
      status:interfaceStatus,
      method:interfaceMethod,
    })
  }

  /**
   * 重置
   */
  const resetInterfaceList = async () => {
    setInterfaceName("")
    setInterfaceStatus("")
    setInterfaceMethod("")
    await getInterfaceList({})
  }
  /**
   * 表格分页
   */
  const [total,setTotal] = useState(0)
  const onPageChange = async (current:number,size:number) => {
    await getInterfaceList({
      name:interfaceName,
      status:interfaceStatus,
      method:interfaceMethod,
      current,
      size
    })
  }
  const [editModalVisible,setEditModalVisible] = useState(false)
  const [interfaceId,setInterfaceId] = useState<any>()
  const showEditModal = (record:CUSTOM_API.InterfaceInfo) => {
    setInterfaceId(record?.id)
    setEditModalVisible(true)
  }
  const handleEditCancel = () => {
    setEditModalVisible(false)
  }
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
      footer={
        selectedRowKeys.length > 0
          ? [
              <Popconfirm
                title=""
                description={`你确定要删除吗?`}
                onConfirm={removeInterfaceBatch}
                okText="确定"
                cancelText="取消"
              >
                <Button type="dashed">批量删除</Button>
              </Popconfirm>,
            ]
          : []
      }
    >
      <Row>
        <Col span={5} offset={3}>
          <Space size={'middle'}>
            名称:
            <Input
              placeholder="名称"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
            />
          </Space>
        </Col>
        <Col span={5} offset={1}>
          <Space>
            状态:
            <Select
              defaultValue=""
              value={interfaceStatus}
              style={{ width: 120 }}
              allowClear
              onChange={(value) => setInterfaceStatus(value)}
              options={[
                { value: 0, label: '可用' },
                { value: 1, label: '关闭' },
              ]}
            />
          </Space>
        </Col>
        <Col span={5} offset={1}>
          <Space>
            方法:
            <Select
              defaultValue=""
              value={interfaceMethod}
              style={{ width: 120 }}
              allowClear
              onChange={(value) => setInterfaceMethod(value)}
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
              ]}
            />
          </Space>
        </Col>
        <Col span={4}>
          <Row>
            <Col offset={12}>
              <Button type={'primary'} onClick={searchInterfaceList}>
                搜索
              </Button>
              <Button type={'primary'} onClick={resetInterfaceList}>
                重置
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider/>
      <Table
        title={()=><Button type={"dashed"}>管理员</Button>}
        rowSelection={rowSelection}
        dataSource={interfaceList}
        columns={columns}
        rowKey={(record) => record.id as number}
        pagination={{
          onChange: onPageChange,
          total,
        }}
      />
      <UpdateInterface
        editModalVisible={editModalVisible}
        id={interfaceId}
        handleEditCancel={handleEditCancel}
      />
    </PageContainer>
  );
};

export default InterfaceManager;
