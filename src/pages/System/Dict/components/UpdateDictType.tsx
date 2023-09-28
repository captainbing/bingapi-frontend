import { addDictType } from "@/services/api/dicttype";
import { SizeType } from '@ant-design/pro-form/es/BaseForm';
import { Col,Form,Input,message,Modal,Row,Select } from 'antd';
import { useState } from 'react';

/**
 * 编辑接口
 */
const UpdateDictType = ({addModalVisible, handleAddCancel}: any) => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({size}: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleEditOk = async () => {
    const res = await addDictType(form.getFieldsValue(true));
    if (res?.code === 200) {
      message.success('修改成功');
      handleAddCancel();
      return;
    }
    message.error(res?.message);
  };

  return (
    <Modal
      title="新建"
      width={1000}
      open={addModalVisible}
      onOk={handleEditOk}
      onCancel={handleAddCancel}
    >
      <Form
        form={form}
        labelCol={{span: 4}}
        wrapperCol={{span: 14}}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{maxWidth: 1000}}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="字典名称" name="dictName">
              <Input/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="字典类型" name="dictType">
              <Input/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="创建者" name="createBy">
              <Input/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="更新者" name="updateBy">
              <Input/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="状态" name="status">
              <Select placeholder={'请选择'}>
                <Select.Option value={'0'}>正常</Select.Option>
                <Select.Option value={'1'}>停用</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="备注" name="remark">
              <Input.TextArea/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateDictType;
