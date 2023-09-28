import SearchJob from '@/pages/System/Job/components/SearchJob';
import UpdateJob from '@/pages/System/Job/components/UpdateJob';
import { deleteInterfaceBatch } from '@/services/api/interface';
import { changeJobStatus, deleteJobById, listJob } from '@/services/api/job';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';

const Job: React.FC = () => {
  const columns: ColumnsType<API.SysConfig> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
      key: 'jobName',
      ellipsis: true,
    },
    {
      title: '任务分组',
      dataIndex: 'jobGroup',
      key: 'jobGroup',
      ellipsis: true,
    },
    {
      title: '调用方法',
      dataIndex: 'invokeTarget',
      key: 'invokeTarget',
      ellipsis: true,
    },
    {
      title: '并发执行',
      dataIndex: 'concurrent',
      key: 'concurrent',
      render({ record }) {
        return record?.concurrent === 0 ? (
          <Tag color={'success'}>允许</Tag>
        ) : (
          <Tag color={'error'}>禁止</Tag>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '8%',
      render: (status: number, record) => (
        <Switch
          checked={status === 0}
          checkedChildren="正常"
          unCheckedChildren="暂停"
          onClick={(checked, event) => changeStatus(checked, record)}
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

  const changeStatus = async (checked: boolean, record: object) => {
    const data = {
      ...record,
      status: checked ? 0 : 1,
    };
    const res = await changeJobStatus(data);
    if (res?.code === 200) {
      await getJobList({
        current: paginationOption.current,
        size: paginationOption.size,
      });
    }
  };

  useEffect(() => {
    // 初始化接口数据
    getJobList({}).then();
  }, []);
  /**
   * 根据ID删除接口（逻辑）
   */
  const removeDictTypeById = async (record: API.SysJob) => {
    const res = await deleteJobById({
      id: record?.id,
    });
    if (res?.code === 200) {
      message.success(res?.message);
      await getJobList({});
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
      await getJobList({});
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
  const [jobList, setJobList] = useState<any>([]);
  const getJobList = async (params: any) => {
    const res = await listJob(params);
    if (res?.code === 200) {
      setJobList(res?.data?.records);
      setPaginationOption({
        ...paginationOption,
        current: res?.data?.current,
        size: res?.data?.size,
        total: res?.data?.total,
      });
    }
  };

  /**
   * 重置
   */
  const resetJobList = () => {
    getJobList({}).then();
  };

  /**
   * 表格分页
   */
  const onPageChange = async (current: number, size: number) => {
    await getJobList({
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
  const showEditModal = (record: API.SysJob) => {
    setId(record?.id);
    setEditModalVisible(true);
  };
  const handleEditCancel = () => {
    setId('');
    setEditModalVisible(false);
    getJobList({}).then();
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
      <SearchJob
        // @ts-ignore
        getSearchJobList={getJobList} resetSearchJobList={resetJobList} />
      <Divider />
      <Table
        // title={()=><Button type={"dashed"}>管理员</Button>}
        rowSelection={rowSelection}
        dataSource={jobList}
        columns={columns}
        rowKey={(record) => record.id as number}
        pagination={paginationOption}
      />
      <UpdateJob editModalVisible={editModalVisible} id={id} handleEditCancel={handleEditCancel} />
    </PageContainer>
  );
};

export default Job;
