import { addConfig, getConfigById, updateConfig } from '@/services/api/sysconfig';
import { SizeType } from '@ant-design/pro-form/es/BaseForm';
import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';

/**
 * 编辑接口
 */
const UpdateConfig = ({ id, editModalVisible, handleEditCancel, isEdit }: any) => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  useEffect(() => {
    if (id === '') {
      form.resetFields();
      return;
    }
    getConfigById({
      id,
    }).then((res) => {
      form.setFieldsValue(res?.data);
    });
  }, [id]);

  const handleEditOk = async () => {
    // form.setFieldValue(
    //   'createTime',
    //   dayjs(form.getFieldValue('createTime')).format('YYYY-MM-DD HH:mm:ss'),
    // ),
    //   form.setFieldValue(
    //     'updateTime',
    //     dayjs(form.getFieldValue('updateTime')).format('YYYY-MM-DD HH:mm:ss'),
    //   );
    if (isEdit) {
      // 编辑
      const res = await updateConfig(form.getFieldsValue(true));
      if (res?.code === 200) {
        message.success('修改成功');
        handleEditCancel();
        return;
      }
      message.error(res?.message);
    } else {
      // 新建
      const res = await addConfig(form.getFieldsValue());
      if (res?.code === 200) {
        message.success('新增成功');
        form.resetFields();
        handleEditCancel();
        return;
      }
      message.error(res?.message);
    }
  };

  return (
    <Modal
      title={isEdit ? '编辑' : '新建'}
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
            <Form.Item label="参数键名" name="configKey">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="参数键值" name="configValue">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="创建者" name="createBy">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="更新人" name="updateBy">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="是否内置" name="configType">
              <Select>
                <Select.Option value={'Y'}>是</Select.Option>
                <Select.Option value={'N'}>否</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="备注" name="remark">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <JSONPretty json={form.getFieldsValue(true)}></JSONPretty>
    </Modal>
  );
};

export default UpdateConfig;
