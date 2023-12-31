import UpdateInterface from '@/pages/Admin/Interface/components/UpdateInterface';
import {
  deleteInterfaceBatch,
  deleteInterfaceById,
  editInterface,
  listInterfaceInfo,
} from '@/services/api/interface';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import SearchInterface from "@/pages/Admin/Interface/components/SearchInterface";

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
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
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
      ellipsis: true,
    },
    {
      title: '是否删除',
      dataIndex: 'deleted',
      key: 'deleted',
      render: (deleted) =>
        deleted === 0 ? (
          <Tag color="magenta">{deleted === 0 && '未删除'}</Tag>
        ) : (
          <Tag color="red">{deleted === 1 && '已删除'}</Tag>
        ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '8%',
      render: (status: number, record) => (
        <Switch
          checked={status === 0}
          checkedChildren="可用"
          unCheckedChildren="关闭"
          onClick={(checked, event) => changeInterfaceStatus(checked, record)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space>
          <Button type={'dashed'} onClick={() => showEditModal(record)}>
            编辑
          </Button>
          <Popconfirm
            title={`${record.name}`}
            description={`你确定要删除吗?`}
            onConfirm={() => removeInterfaceById(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type={'dashed'}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const changeInterfaceStatus = async (checked: boolean, record: object) => {
    const data = {
      ...record,
      status: checked ? 0 : 1,
    };
    const res = await editInterface(data);
    if (res?.code === 200) {
      await getInterfaceList({
        current: paginationOption.current,
        size: paginationOption.size,
      });
    }
  };

  const [interfaceList, setInterfaceList] = useState<CUSTOM_API.InterfaceInfo[]>([]);
  useEffect(() => {
    // 初始化接口数据
    getInterfaceList({}).then();
  }, []);
  /**
   * 根据ID删除接口（逻辑）
   */
  const removeInterfaceById = async (record: CUSTOM_API.InterfaceInfo) => {
    const res = await deleteInterfaceById({
      ids: [record?.id],
    });
    if (res?.code === 200) {
      message.success(res?.message);
      await getInterfaceList({});
      return;
    }
    message.error(res?.message);
  };
  /**
   * 批量删除接口
   */
  const removeInterfaceBatch = async () => {
    const res = await deleteInterfaceBatch({
      ids: selectedRowKeys,
    });
    if (res?.code === 200) {
      message.success('删除成功');
      await getInterfaceList({});
      return;
    }
    message.error(res?.message);
  };

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
  const getInterfaceList = async (data: object) => {
    const res = await listInterfaceInfo(data);
    if (res?.code === 200) {
      setInterfaceList(res?.data?.records);
      setPaginationOption({
        ...paginationOption,
        current: res?.data?.current,
        size: res?.data?.size,
        page: res?.data?.page,
        total: res?.data?.total,
      });
    }
  };
  /**
   * 重置
   */
  const resetInterfaceList = async () => {
    await getInterfaceList({});
  };
  /**
   * 表格分页
   */
  const onPageChange = async (current: number, size: number) => {
    await getInterfaceList({
      current,
      size,
    });
  };
  const [paginationOption, setPaginationOption] = useState<any>({
    onChange: onPageChange,
    current: 1,
    size: 10,
    page: 1,
    total: 10,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [interfaceId, setInterfaceId] = useState<any>();
  const showEditModal = (record: CUSTOM_API.InterfaceInfo) => {
    setInterfaceId(record?.id);
    setEditModalVisible(true);
  };
  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  // @ts-ignore
  // @ts-ignore
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
                <Button type="primary" danger>
                  批量删除
                </Button>
              </Popconfirm>,
            ]
          : []
      }
    >
      <SearchInterface
        // @ts-ignore
        getSearchInterfaceList={getInterfaceList}
        resetInterfaceList={resetInterfaceList}
      />
      <Divider />
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
