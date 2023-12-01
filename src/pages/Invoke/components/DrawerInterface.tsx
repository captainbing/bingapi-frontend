import {Drawer, Table} from "antd";
import JSONPretty from "react-json-pretty";
import React from "react";
const requestParamsColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '必填',
    dataIndex: 'required',
    key: 'required',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
  },
];
const responseParamsColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
  },
];

const responseParamsDataSource = [
  {
    key: '1',
    name: 'code',
    type: 'string',
    description: '返回的状态码',
  },
  {
    key: '2',
    name: 'imgurl',
    type: 'string',
    description: '返回图片地址',
  },
  {
    key: '3',
    name: 'width',
    type: 'string',
    description: '返回图片宽度',
  },
  {
    key: '4',
    name: 'height',
    type: 'string',
    description: '返回图片高度',
  },
];
const requestParamsDataSource = [
  {
    key: '1',
    name: 'method',
    required: '是',
    type: 'string',
    description: '输出壁纸端[mobile(手机端),pc（电脑端）,zsy（手机电脑自动判断）]默认为pc',
  },
  {
    key: '2',
    name: 'lx',
    required: '否',
    type: 'string',
    description:
      '输出头像类型[a1（男头）|b1（女头）|c1（动漫头像）|c2（动漫女头）|c3（动漫男头）]默认为c1',
  },
  {
    key: '3',
    name: 'format',
    required: '否',
    type: 'string',
    description: '输出壁纸格式[json|images]默认为images',
  },
];
const DrawerInterface = (props:any) => {

  const {currentInterface,onCloseDrawer,drawerOpen} = props

  return (
    <Drawer width={640} placement="right" closable={false} onClose={onCloseDrawer} open={drawerOpen}>
      <p> 接口名称:{currentInterface?.name}</p>
      <p> 请求方式:{currentInterface?.method}</p>
      <p> 请求地址:{currentInterface?.url}</p>
      <p> 返回格式:"json/images"</p>
      <p> 请求示例:{currentInterface?.url}</p>
      <p> 请求参数:</p>
      <Table
        dataSource={currentInterface?.requestParam}
        columns={requestParamsColumns}
        pagination={false}
      />
      <p> 返回参数:</p>
      <Table
        dataSource={currentInterface?.responseParam}
        columns={responseParamsColumns}
        pagination={false}
      />
      <p> 返回示例:</p>
      <JSONPretty json={"{\"code\":\"200\",\"imgurl\":\"https:\\/\\/tva1.sinaimg.cn\\/large\\/9bd9b167ly1fzjxz375iwj20b40b4t9c.jpg\",\"width\":\"400\",\"height\":\"400\"}"}></JSONPretty>
    </Drawer>
  )

}


export default DrawerInterface
