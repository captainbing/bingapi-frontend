import React, {useEffect, useState} from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  Radio,
  Row,
  Col,
  message
} from "antd";
import {editInterface, editUserInfo, getInterfaceById, getUserById} from "@/services/customapi";
import JSONPretty from "react-json-pretty";
import {SizeType} from "@ant-design/pro-form/es/BaseForm";
/**
 * 编辑接口
 */
const UpdateUser = ({id,editModalVisible,handleEditCancel}:any) => {

  const [form] = Form.useForm()
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  useEffect(()=>{
    getUserById({
      id
    }).then(res=>{
      form.setFieldsValue(res?.data)
    })
  },[id])

  const handleEditOk = async () => {
    console.log(form.getFieldsValue())
    const res = await editUserInfo(form.getFieldsValue(true))
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
            <Form.Item label="ID" name='id'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="昵称" name='username'>
              <Input />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="邮箱" name='userAccount'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="角色" name='userRole'>
              <Select>
                <Select.Option value={'admin'}>管理员</Select.Option>
                <Select.Option value={'user'}>普通用户</Select.Option>
              </Select>
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="简介" name='userProfile'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="状态" name='userStatus'>
              <Select>
                <Select.Option value={0}>正常</Select.Option>
                <Select.Option value={1}>BAN</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="头像" name='userAvatar'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/*<Form.Item label="是否删除" name='deleted'>*/}
            {/*  <Select>*/}
            {/*    <Select.Option value={0}>否</Select.Option>*/}
            {/*    <Select.Option value={1}>是</Select.Option>*/}
            {/*  </Select>*/}
            {/*</Form.Item>*/}
          </Col>
        </Row>
      </Form>
      <JSONPretty json={form.getFieldsValue(true)}></JSONPretty>
    </Modal>
  )

}

export default UpdateUser
