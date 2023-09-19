import UpdateInterface from "@/pages/Admin/Interface/components/UpdateInterface";
import { PageContainer } from '@ant-design/pro-components';
import {Button, Col, Divider, Input, message, Popconfirm, Row, Select, Space, Switch, Table, Tag} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React,{ useEffect,useState } from 'react';
import updateInterface from "@/pages/Admin/Interface/components/UpdateInterface";
import {deleteInterfaceBatch, deleteInterfaceById, editInterface, listInterfaceInfo} from "@/services/api/interface";


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
      ellipsis:true
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis:true
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      ellipsis:true
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
      ellipsis:true
    },
    {
      title: '是否删除',
      dataIndex: 'deleted',
      key: 'deleted',
      render:(deleted)=>(
        deleted === 0
          ? <Tag color="magenta">{deleted === 0 && '未删除'}</Tag>
          : <Tag color="red">{deleted === 1 && '已删除'}</Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width:'8%',
      render: (status: number,record) => (
        <Switch
          checked={status === 0} checkedChildren="可用" unCheckedChildren="关闭"
          onClick={(checked, event)=>changeInterfaceStatus(checked,record)}
        />
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

  const changeInterfaceStatus = async (checked:boolean,record:object) => {
    const data = {
      ...record,
      status:checked ? 0 : 1
    }
    const res = await editInterface(data)
    if (res?.code === 200){
      await getInterfaceList({
        name:interfaceName,
        status:interfaceStatus,
        method:interfaceMethod,
        current:paginationOption.current,
        size:paginationOption.size
      })
    }
  }

  const [interfaceList, setInterfaceList] = useState<CUSTOM_API.InterfaceInfo[]>([]);
  useEffect(() => {
    // 初始化接口数据
    getInterfaceList({}).then()
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
  const getInterfaceList = async (data:object) => {
    const res = await listInterfaceInfo(data)
    if (res?.code === 200){
      setInterfaceList(res?.data?.records)
      setPaginationOption({
        ...paginationOption,
        current: res?.data?.current,
        size: res?.data?.size,
        page: res?.data?.page,
        total: res?.data?.total
      })
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
  const onPageChange = async (current:number,size:number) => {
    await getInterfaceList({
      name:interfaceName,
      status:interfaceStatus,
      method:interfaceMethod,
      current,
      size
    })
  }
  const [paginationOption,setPaginationOption] = useState<any>({
    onChange: onPageChange,
    current:1,
    size:10,
    page:1,
    total:10,
  })
  const [editModalVisible,setEditModalVisible] = useState(false)
  const [interfaceId,setInterfaceId] = useState<any>()
  const showEditModal = (record:CUSTOM_API.InterfaceInfo) => {
    setInterfaceId(record?.id)
    setEditModalVisible(true)
  }
  const handleEditCancel = () => {
    setEditModalVisible(false)
  }

  const requestMethodOptions = [
    {
      value: 'GET',
      label: 'GET',
    },
    {
      value: 'POST',
      label: 'POST',
    },
    {
      value: 'PUT',
      label: 'PUT',
    },
    {
      value: 'DELETE',
      label: 'DELETE',
    },
    {
      value: 'OPTIONS',
      label: 'OPTIONS',
    },
    {
      value: 'PATCH',
      label: 'PATCH',
    },
  ]

  const onChangeInterfaceMethod = async (value: string)=> {
    setInterfaceMethod(value)
    await getInterfaceList({
      name:interfaceName,
      status:interfaceStatus,
      method:value,
    })
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
                <Button type="primary" danger>批量删除</Button>
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
              onChange={(value) => onChangeInterfaceMethod(value)}
              options={requestMethodOptions}
            />
          </Space>
        </Col>
        <Col span={4}>
          <Row>
            <Col offset={8}>
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
        // title={()=><Button type={"dashed"}>管理员</Button>}
        rowSelection={rowSelection}
        dataSource={interfaceList}
        columns={columns}
        rowKey={(record) => record.id as number}
        pagination={paginationOption}
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
