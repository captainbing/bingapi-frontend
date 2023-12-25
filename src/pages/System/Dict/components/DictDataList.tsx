import { Button, Modal, Popconfirm, Space, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import {listDictData} from "@/services/api/dictdata";
import UpdateDictData from "@/pages/System/Dict/components/UpdateDictData";

/**
 * 编辑接口
 */
const DictDataList = ({ dictType, editModalVisible, handleEditCancel, editFlag }: any) => {
  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
      key: 'dictLabel',
      ellipsis: true,
    },
    {
      title: '字典键值',
      dataIndex: 'dictValue',
      key: 'dictValue',
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

  const [dictDataList, setDictDataList] = useState([]);
  useEffect(() => {
    listDictData({
      dictType,
    }).then((res) => {
      setDictDataList(res?.data?.records);
    });
  }, [dictType]);

  const handleEditOk = async () => {
    // const res = await editInterface(form.getFieldsValue(true))
    // if (res?.code === 200){
    //   message.success("修改成功")
    //   handleEditCancel()
    //   return
    // }
    // message.error(res?.message)
  };

  const [editDictDataModalVisible, setEditDictDataModalVisible] = useState(false);
  const [id, setId] = useState<any>();
  const showEditModal = (record: any) => {
    setId(record?.id);
    setEditDictDataModalVisible(true);
  };

  function changeInterfaceStatus(checked: boolean, record: any) {}

  function removeDictTypeById(record: any) {}

  /**
   * 表格分页
   */
  const onPageChange = async (current: number, size: number) => {
    await getDictDataByDictType({
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

  const handleEditDictDataCancel = () => {
    setId('');
    setEditDictDataModalVisible(false);
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

  return (
    <Modal
      title="编辑字典数据"
      width={1200}
      open={editModalVisible}
      onOk={handleEditOk}
      onCancel={handleEditCancel}
    >
      <Table
        // title={()=><Button type={"dashed"}>管理员</Button>}
        rowSelection={rowSelection}
        dataSource={dictDataList}
        columns={columns}
        rowKey={(record) => record.id as number}
        pagination={paginationOption}
      />
      <UpdateDictData
        id={id}
        editDictDataModalVisible={editDictDataModalVisible}
        handleEditDictDataCancel={handleEditDictDataCancel}
      />
    </Modal>
  );
};

export default DictDataList;
