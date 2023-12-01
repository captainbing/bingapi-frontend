import SearchConfig from '@/pages/System/Config/components/SearchConfig';
import UpdateConfig from '@/pages/System/Config/components/UpdateConfig';
import { deleteDictTypeById } from '@/services/api/dicttype';
import { deleteInterfaceBatch, editInterface } from '@/services/api/interface';
import {deleteConfigById, listConfig} from '@/services/api/sysconfig';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';

const Config: React.FC = () => {
  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '参数键名',
      dataIndex: 'configKey',
      key: 'configKey',
      ellipsis: true,
    },
    {
      title: '参数键值',
      dataIndex: 'configValue',
      key: 'configValue',
      ellipsis: true,
    },
    {
      title: '系统内置',
      dataIndex: 'configType',
      key: 'configType',
      width: '8%',
      render: (status: string, record) => (
        <Switch
          checked={status === 'Y'}
          checkedChildren="是"
          unCheckedChildren="否"
          onClick={(checked, event) => changeInterfaceStatus(checked, record)}
        />
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      key: 'createBy',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
    },
    {
      title: '更新人',
      dataIndex: 'updateBy',
      key: 'updateBy',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space>
          <Button type={'dashed'} onClick={() => showEditModal(record, true)}>
            编辑
          </Button>
          <Popconfirm
            title={`${record.configKey}`}
            description={`你确定要删除吗?`}
            onConfirm={() => removeDictTypeById(record)}
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
      await getConfigList({
        current: paginationOption.current,
        size: paginationOption.size,
      });
    }
  };

  useEffect(() => {
    // 初始化接口数据
    getConfigList({}).then();
  }, []);
  /**
   * 根据ID删除接口（逻辑）
   */
  const removeDictTypeById = async (record: any) => {
    const res = await deleteConfigById({
      id: record?.id,
    });
    if (res?.code === 200) {
      message.success(res?.message);
      await getConfigList({});
      return;
    }
    message.error(res?.message);
  };
  /**
   * 添加配置
   */
  const handleAddConfig = () => {
    setEditFlag(false);
    setEditModalVisible(true);
    setId('');
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
      await getConfigList({});
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
  const [configList, setConfigList] = useState<any>([]);
  const getConfigList = async (params: any) => {
    const res = await listConfig(params);
    if (res?.code === 200) {
      setConfigList(res?.data?.records);
      setPaginationOption({
        ...paginationOption,
        current: res?.data?.current,
        size: res?.data?.size,
        total: res?.data?.total,
      });
    }
  };

  /**
   * 表格分页
   */
  const onPageChange = async (current: number, size: number) => {
    await getConfigList({
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
  const [id, setId] = useState<any>('');
  const [editFlag, setEditFlag] = useState(false);
  const showEditModal = (record: any, isEdit: boolean) => {
    setEditFlag(isEdit);
    setId(record?.id);
    setEditModalVisible(true);
  };
  const handleEditCancel = () => {
    setEditFlag(false)
    setId('');
    setEditModalVisible(false);
    getConfigList({}).then();
  };

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
      <SearchConfig
        // @ts-ignore
        onAddConfig={handleAddConfig} />
      <Divider />
      <Table
        // title={()=><Button type={"dashed"}>管理员</Button>}
        rowSelection={rowSelection}
        dataSource={configList}
        columns={columns}
        rowKey={(record) => record.id as number}
        pagination={paginationOption}
      />
      <UpdateConfig
        editModalVisible={editModalVisible}
        id={id}
        isEdit={editFlag}
        handleEditCancel={handleEditCancel}
      />
    </PageContainer>
  );
};

export default Config;
