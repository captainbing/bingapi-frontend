import UpdateUser from "@/pages/Admin/User/components/UpdateUser";
import { PageContainer } from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import {Button, Col, Divider, Form, Input, message, Popconfirm, Row, Select, Space, Switch, Table} from 'antd';
import type { FormInstance } from 'antd/es/form';
import { TableRowSelection } from "antd/es/table/interface";
import React,{ useContext,useEffect,useRef,useState } from 'react';
import {deleteUserBatch, editUserInfo, listUser} from "@/services/api/user";
import SearchUser from "@/pages/Admin/User/components/SearchUser";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                     title,
                                                     editable,
                                                     children,
                                                     dataIndex,
                                                     record,
                                                     handleSave,
                                                     ...restProps
                                                   }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

/**
 * 用户管理
 * @constructor
 */
const UserManager = ()=>{
  const [userDataSource, setUserDataSource] = useState([]);

  const getUserList = async (data: object) => {
    const res = await listUser(data);
    if (res?.code === 200) {
      setUserDataSource(res?.data?.records);
      setPaginationOption({
        ...paginationOption,
        current: res?.data?.current,
        size: res?.data?.size,
        page: res?.data?.page,
        total: res?.data?.total,
      });
    }
  };
  useEffect(() => {
    getUserList({}).then();
  }, []);

  /**
   * 删除用户
   * @param id
   */
  const handleDeleteUser = async (id: number) => {
    const res = await deleteUserBatch({
      ids: [id],
    });
    if (res?.code === 200) {
      message.success('删除成功');
      await getUserList({});
      return;
    }
    message.error(res?.message);
  };
  /**
   * 编辑用户
   * @param id
   */
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [id, setId] = useState<number>();
  const handleEditUser = (id: number) => {
    setId(id);
    setEditModalVisible(true);
  };
  const handleEditCancel = async () => {
    setEditModalVisible(false);
    await getUserList({});
  };

  const userColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '昵称',
      dataIndex: 'userName',
      editable: true,
      ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'userAccount',
      ellipsis: true,
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      editable: true,
      width: '7%',
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      editable: true,
      width: '10%',
      ellipsis: true,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      width: '20%',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      width: '8%',
      render(_, record) {
        return (
          <Switch
            checked={record?.userStatus === 1}
            checkedChildren="BAN"
            unCheckedChildren="正常"
            onClick={(checked, event) => changeUserStatus(checked, record)}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '15%',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, record: any) =>
        userDataSource.length >= 1 ? (
          <>
            <Button type={'dashed'} onClick={() => handleEditUser(record?.id)}>
              编辑
            </Button>
            <Popconfirm
              title={record?.userName}
              description={`你确定要删除${record?.userName}吗?`}
              onConfirm={() => handleDeleteUser(record?.id)}
            >
              <Button type={'dashed'}>删除</Button>
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  /**
   * 表格选择项控制
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

  const handleSave = (row: any) => {};

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = userColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  /**
   * 批量删除用户
   */
  const removeUserBatch = async () => {
    const res = await deleteUserBatch({
      ids: selectedRowKeys,
    });
    if (res?.code === 200) {
      message.success('删除成功');
      await getUserList({});
      return;
    }
    message.error(res?.message);
  };

  /**
   * 搜索接口相关参数
   */
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userStatus, setUserStatus] = useState('');

  /**
   * 重置
   */
  const resetUserList = async () => {
    setUserName('');
    setUserRole('');
    setUserStatus('');
    await getUserList({});
  };

  /**
   * 根据id修改用户状态
   * @param record
   */
  const changeUserStatus = async (checked: boolean, record: object) => {
    const data = {
      ...record,
      userStatus: checked ? 1 : 0,
    };
    const res = await editUserInfo(data);
    if (res?.code === 200) {
      await getUserList({
        userName,
        userStatus,
        userRole,
        current: paginationOption.current,
        size: paginationOption.size,
      });
    }
  };

  /**
   * 表格分页
   */
  const onPageChange = async (current: number, size: number) => {
    await getUserList({
      userName,
      userRole,
      userStatus,
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
                onConfirm={removeUserBatch}
                okText="确定"
                cancelText="取消"
              >
                <Button type="dashed">批量删除</Button>
              </Popconfirm>,
            ]
          : []
      }
    >
      <SearchUser
        // @ts-ignore
        getSearchUserList={getUserList}
        resetUserList={resetUserList} />

      <Divider />

      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={userDataSource}
        columns={columns as ColumnTypes}
        rowKey={(record) => record.id as number}
        size={'middle'}
        rowSelection={rowSelection}
        pagination={paginationOption}
      />
      <UpdateUser editModalVisible={editModalVisible} id={id} handleEditCancel={handleEditCancel} />
    </PageContainer>
  );
}
export default UserManager
