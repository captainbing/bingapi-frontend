import React, {useEffect, useState} from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  message
} from "antd";
import JSONPretty from "react-json-pretty";
import {SizeType} from "@ant-design/pro-form/es/BaseForm";
import {editInterface, getInterfaceById} from "@/services/api/interface";
/**
 * 编辑接口
 */
const UpdateInterface = ({id,editModalVisible,handleEditCancel}:any) => {

  const [form] = Form.useForm()
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  useEffect(()=>{
    getInterfaceById({
      id
    }).then(res=>{
      form.setFieldsValue(res?.data)
    })
  },[id])

  const handleEditOk = async () => {
    console.log(form.getFieldsValue())
    const res = await editInterface(form.getFieldsValue(true))
    if (res?.code === 200){
      message.success("修改成功")
      handleEditCancel()
      return
    }
    message.error("修改失败，请重试")
  }

  return (
    <Modal
      title="编辑"
      width={1000}
      open={editModalVisible}
      onOk={handleEditOk}
      onCancel={handleEditCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 1000 }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="接口名称" name='name'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="描述" name='description'>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="URL" name='url'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="状态" name='status'>
              <Select>
                <Select.Option value={0}>开启</Select.Option>
                <Select.Option value={1}>关闭</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="请求头" name='requestHeader'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="响应头" name='responseHeader'>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Method" name='method'>
              <Select>
                <Select.Option value="GET">GET</Select.Option>
                <Select.Option value="POST">POST</Select.Option>
                <Select.Option value="PUT">PUT</Select.Option>
                <Select.Option value="DELETE">DELETE</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="创建人" name='userId'>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="总调用次数" name='invokeTotal'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="是否删除" name='deleted'>
              <Select>
                <Select.Option value={0}>否</Select.Option>
                <Select.Option value={1}>是</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <JSONPretty json={form.getFieldsValue(true)}></JSONPretty>
    </Modal>
  )
}

export default UpdateInterface
