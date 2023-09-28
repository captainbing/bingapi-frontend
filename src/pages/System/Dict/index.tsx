import DictDataList from '@/pages/System/Dict/components/DictDataList';
import SearchDictType from '@/pages/System/Dict/components/SearchDictType';
import { deleteDictTypeById, listDictType } from '@/services/api/dicttype';
import { deleteInterfaceBatch, editInterface } from '@/services/api/interface';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';

const DictType: React.FC = () => {
  const columns: ColumnsType<API.DictType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
      key: 'dictName',
      ellipsis: true,
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      key: 'dictType',
      ellipsis: true,
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
          <Button type={'dashed'} onClick={() => showEditModal(record)}>
            编辑
          </Button>
          <Popconfirm
            title={`${record.dictName}`}
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
      await getDictTypeList({
        name: interfaceName,
        status: interfaceStatus,
        method: interfaceMethod,
        current: paginationOption.current,
        size: paginationOption.size,
      });
    }
  };

  useEffect(() => {
    // 初始化接口数据
    getDictTypeList({}).then();
  }, []);
  /**
   * 根据ID删除接口（逻辑）
   */
  const removeDictTypeById = async (record: API.DictType) => {
    const res = await deleteDictTypeById({
      id: record?.id,
    });
    if (res?.code === 200) {
      message.success(res?.message);
      await getDictTypeList({});
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
      await getDictTypeList({});
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
   * 获取字典集合
   */
  const [dictTypeList, setDictTypeList] = useState([]);
  const getDictTypeList = async (params: any) => {
    const res = await listDictType(params);
    if (res?.code === 200) {
      setDictTypeList(res?.data?.records);
      setPaginationOption({
        ...paginationOption,
        current: res?.data?.current,
        size: res?.data?.size,
        total: res?.data?.total,
      });
    }
  };

  /**
   * 搜索接口相关参数
   */
  const [interfaceName, setInterfaceName] = useState('');
  const [interfaceStatus, setInterfaceStatus] = useState('');
  const [interfaceMethod, setInterfaceMethod] = useState('');

  const searchInterfaceList = async () => {
    await getDictTypeList({
      name: interfaceName,
      status: interfaceStatus,
      method: interfaceMethod,
    });
  };

  /**
   * 添加
   */
  const [editFlag, setEditFlag] = useState(false);
  const addDictType = () => {
    setEditFlag(false);
    setEditModalVisible(true);
  };
  const addCancel = () => {
    getDictTypeList({}).then();
  };

  /**
   * 重置
   */
  const resetDictType = async () => {
    setInterfaceName('');
    setInterfaceStatus('');
    setInterfaceMethod('');
    await getDictTypeList({});
  };
  /**
   * 表格分页
   */
  const onPageChange = async (current: number, size: number) => {
    await getDictTypeList({
      name: interfaceName,
      status: interfaceStatus,
      method: interfaceMethod,
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
  const [dictType, setDictType] = useState<any>();
  const showEditModal = (record: API.DictType) => {
    setDictType(record?.dictType);
    setEditModalVisible(true);
  };
  const handleEditCancel = () => {
    setEditModalVisible(false);
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
      <SearchDictType
        onSearchDictType={getDictTypeList}
        onResetDictType={resetDictType}
        onAddDictType={addDictType}
        addCancel={addCancel}
      />
      <Divider />
      <Table
        // title={()=><Button type={"dashed"}>管理员</Button>}
        rowSelection={rowSelection}
        dataSource={dictTypeList}
        columns={columns}
        rowKey={(record) => record.id as number}
        pagination={paginationOption}
      />
      <DictDataList
        editFlag={editFlag}
        editModalVisible={editModalVisible}
        dictType={dictType}
        handleEditCancel={handleEditCancel}
      />
    </PageContainer>
  );
};

export default DictType;
