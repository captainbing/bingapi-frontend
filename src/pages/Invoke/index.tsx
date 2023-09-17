import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';

import { PageContainer } from '@ant-design/pro-components';
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  FormInstance,
  Input,
  InputRef,
  message,
  Popconfirm, RadioChangeEvent,
  Row,
  Select,
  Space,
  Table,
  Tabs, Tree,
} from 'antd';

import React, { useContext, useEffect, useRef, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useLocation, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import {DirectoryTreeProps} from "antd/es/tree";
import DrawerInterface from "@/pages/Invoke/components/DrawerInterface";
import TabInterface from "@/pages/Invoke/components/TabInterface";
import {getInterfaceById} from "@/services/api/interface";
import {invokeInterface} from "@/services/api/invoke";

const { DirectoryTree } = Tree;

const treeData: any= [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];


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

interface DataType {
  key: React.Key;
  requestKey: string;
  requestValue: string;
  description: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Index: React.FC = () => {
  const [selectedParamRowKeys, setSelectedParamRowKeys] = useState<React.Key[]>([]);
  const [selectedHeaderRowKeys, setSelectedHeaderRowKeys] = useState<React.Key[]>([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const location:any = useLocation();
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
  // @ts-ignore
  const onSelectParam = (record, selected, selectedRows, nativeEvent) => {
    let requestParam = {};
    for (let index in selectedRows) {
      let key = selectedRows[index].requestKey as any;
      // @ts-ignore
      requestParam[key] = selectedRows[index].requestValue;
    }
    setRequestParams(requestParam);
  };
  // @ts-ignore
  const onSelectAllParams = (selected, selectedRows, changeRow) => {
    onSelectParam(null, selected, selectedRows, null);
  };
  const paramRowSelection = {
    selections: false,
    selectedParamRowKeys,
    onSelect: onSelectParam,
    onSelectAll: onSelectAllParams,
  };
  // @ts-ignore
  const onSelectHeader = (record, selected, selectedRows, nativeEvent) => {
    let requestHeader = {};
    for (let index in selectedRows) {
      let key = selectedRows[index].requestKey as any;
      // @ts-ignore
      requestHeader[key] = selectedRows[index].requestValue;
    }
    setRequestHeaders(requestHeader);
  };
  // @ts-ignore
  const onSelectAllHeader = (selected, selectedRows, changeRow) => {
    onSelectHeader(null, selected, selectedRows, null);
  };
  const headerRowSelection = {
    selections: false,
    selectedHeaderRowKeys,
    onSelect: onSelectHeader,
    onSelectAll: onSelectAllHeader,
  };
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

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

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
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];



  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      requestKey: `Edward King ${count}`,
      requestValue: '32',
      description: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
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

  interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
  }

  const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
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
  const onTabChange = (key:any) => {
    alert(key)
  }
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

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

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <Row>
        <Col span={4}>
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
              <TabInterface/>
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
                    { value: 'https://q.qlogo.cn/g?b=qq&nk=750321038&s=640'},
                    { value: 'http://q.qlogo.cn/headimg_dl?dst_uin=750321038&spec=640&img_type=jpg'},
                    { value: 'http://localhost:9527/sys/invoke/qq?qq=750321038'},
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
                children: (
                  <>
                    <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                      Add a row
                    </Button>
                    <Table
                      size="small"
                      rowSelection={paramRowSelection}
                      components={components}
                      rowClassName={() => 'editable-row'}
                      bordered
                      dataSource={dataSource}
                      columns={paramsColumn as ColumnTypes}
                      pagination={false}
                    />
                  </>
                ),
              },
              {
                label: (
                  <span>
                <AndroidOutlined />
                Headers
              </span>
                ),
                key: 'headers',
                children: (
                  <>
                    <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                      Add a row
                    </Button>
                    <Table
                      size="small"
                      rowSelection={headerRowSelection}
                      components={components}
                      rowClassName={() => 'editable-row'}
                      bordered
                      dataSource={dataSource}
                      columns={paramsColumn as ColumnTypes}
                      pagination={false}
                    />
                  </>
                ),
              },
              {
                label: (
                  <span>
                <AndroidOutlined />
                Body
              </span>
                ),
                key: 'body',
                children: 'BODY',
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
