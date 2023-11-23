import { Button, Form, FormInstance, Input, InputRef, Popconfirm, Table } from 'antd';
import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useRef, useState } from 'react';

const RequestParam = ({ acceptRequestParams, requestParam, handleDeleteRequestParam }: any) => {
  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
  const paramColumn: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Key',
      dataIndex: 'requestKey',
      width: '30%',
      editable: true,
    },
    {
      title: 'value',
      dataIndex: 'requestValue',
      width: '30%',
      editable: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      // @ts-ignore
      render: (_, record: { key: React.Key }) =>
        requestParam.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];


  const handleSave = (row: DataType) => {
    const newData = [...requestParam];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    acceptRequestParams(newData);
  };

  const handleDelete = (key: React.Key) => {
    handleDeleteRequestParam(key)

    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

  const paramsColumn = paramColumn.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const EditableContext = React.createContext<FormInstance<any> | null>(null);
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

  interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
  }

  interface EditableRowProps {
    index: number;
  }

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
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // @ts-ignore
  const onSelectParam = (record, selected, selectedRows, nativeEvent) => {
    let requestParam = {};
    for (let index in selectedRows) {
      let key = selectedRows[index].requestKey as any;
      // @ts-ignore
      requestParam[key] = selectedRows[index].requestValue;
    }
  };
  // @ts-ignore
  const onSelectAllParams = (selected, selectedRows, changeRow) => {
    onSelectParam(null, selected, selectedRows, null);
  };

  const [selectedParamRowKeys, setSelectedParamRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      requestKey: 'key1',
      requestValue: 'value1',
      description: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      requestKey: 'key2',
      requestValue: 'value2',
      description: 'London, Park Lane no. 1',
    },
  ]);
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    let requestParam = {};
    for (let index in selectedRows) {
      let key = selectedRows[index].requestKey as any;
      // @ts-ignore
      requestParam[key] = selectedRows[index].requestValue;
    }
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedParamRowKeys(newSelectedRowKeys);
  };
  const paramRowSelection = {
    selections: false,
    selectedParamRowKeys,
    onSelect: onSelectParam,
    onChange: onSelectChange,
    onSelectAll: onSelectAllParams,
  };

  interface DataType {
    key: React.Key;
    requestKey: string;
    requestValue: string;
    description: string;
  }

  const handleAdd = () => {
    const newData: DataType = {
      key: nanoid(),
      requestKey: `Edward King`,
      requestValue: '32',
      description: `London, Park Lane no.`,
    };
    acceptRequestParams([...requestParam, newData]);
  };

  return (
    <>
      {/*Query Params*/}
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        size="small"
        rowSelection={paramRowSelection}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={requestParam}
        columns={paramsColumn as ColumnTypes}
        pagination={false}
      />
    </>
  );
};

export default RequestParam;
