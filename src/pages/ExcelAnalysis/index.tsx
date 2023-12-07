import { genChartByAi } from '@/services/api/chart';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, message, Row, Select, Space, Upload } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';


const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

/**
 * Excel分析
 * @constructor
 */
const ExcelAnalysis: React.FC = () => {
  const [biResponse, setBiResponse] = useState({
    genChart: null,
    genResult: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('chartType', values?.chartType);
    formData.append('goal', values?.goal);
    formData.append('file', values?.file[0]?.originFileObj);
    setSubmitting(true);
    const res = await genChartByAi(formData);
    setSubmitting(false);
    try {
      if (res?.code === 200) {
        let { genChart, genResult }:any = res?.data;
        genChart = JSON.parse(genChart);
        if (!genChart) throw new Error('生成图表失败');
        setBiResponse({
          genChart,
          genResult,
        });
        return;
      }
      message.error(res?.message);
    } catch (e: any) {
      message.error(e?.message);
    }
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能分析">
            <Form
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                name="name"
                label="图表名称"
                hasFeedback
                rules={[{ required: true, message: '请输入你的图标名称!' }]}
              >
                <Input placeholder="请输入图表名称" />
              </Form.Item>

              <Form.Item
                name="chartType"
                label="图表类型"
                hasFeedback
                rules={[{ required: true, message: '请输入你的图表类型!' }]}
              >
                <Select
                  placeholder="请选择图表类型"
                  options={[
                    { value: 0, label: '雷达图' },
                    { value: 1, label: '饼图' },
                    { value: 2, label: '柱状图' },
                    { value: 3, label: '折线图' },
                    { value: 4, label: '散点图' },
                    { value: 5, label: 'K线图' },
                  ]}
                ></Select>
              </Form.Item>

              <Form.Item
                name="goal"
                label="分析需求"
                hasFeedback
                rules={[{ required: true, message: '请输入你的分析需求!' }]}
              >
                <TextArea placeholder="请输入你的需求" />
              </Form.Item>

              <Form.Item
                name="file"
                label="上传Excel"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: '请选择Excel表格!' }]}
                // extra="longgggggggggggggggggggggggggggggggggg"
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>点击上传</Button>
                </Upload>
              </Form.Item>
              {/*<Form.Item label="Dragger">*/}
              {/*  <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>*/}
              {/*    <Upload.Dragger name="files" action="/upload.do">*/}
              {/*      <p className="ant-upload-drag-icon">*/}
              {/*        <InboxOutlined />*/}
              {/*      </p>*/}
              {/*      <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
              {/*      <p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
              {/*    </Upload.Dragger>*/}
              {/*  </Form.Item>*/}
              {/*</Form.Item>*/}

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button htmlType="reset">reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="图表分析" loading={submitting}>
            {biResponse?.genChart ? (
              <EChartsReact option={biResponse?.genChart} />
            ) : (
              '请在左侧进行提交'
            )}
          </Card>
          <Divider />
          <Card title="分析结果" loading={submitting}>
            {biResponse?.genResult ? biResponse?.genResult : '请在左侧进行提交'}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ExcelAnalysis;
