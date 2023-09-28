import { getJobById, updateJob } from '@/services/api/job';
import { SizeType } from '@ant-design/pro-form/es/BaseForm';
import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useEffect, useState } from 'react';

/**
 * 编辑接口
 */
const UpdateJob = ({ id, editModalVisible, handleEditCancel }: any) => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  useEffect(() => {
    getJobById({
      id,
    }).then((res) => {
      form.setFieldsValue(res?.data);
    });
  }, [id]);

  const handleEditOk = async () => {
    const res = await updateJob(form.getFieldsValue(true));
    if (res?.code === 200) {
      message.success('修改成功');
      handleEditCancel();
      return;
    }
    message.error(res?.message);
  };

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
            <Form.Item label="任务名称" name="jobName">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="任务分组" name="jobGroup">
              <Select>
                <Select.Option value={'DEFAULT'}>DEFAULT</Select.Option>
                <Select.Option value={'SYSTEM'}>SYSTEM</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="调用方法" name="invokeTarget">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="状态" name="status">
              <Select>
                <Select.Option value={0}>开启</Select.Option>
                <Select.Option value={1}>关闭</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Cron表达式" name="cronExpression">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="并发执行" name="concurrent">
              <Select>
                <Select.Option value={0}>允许</Select.Option>
                <Select.Option value={1}>禁止</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="创建人" name="createBy">
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
            <Form.Item label="备注" name="remark">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Form>
      {/*<JSONPretty json={form.getFieldsValue(true)}></JSONPretty>*/}
    </Modal>
  );
};

export default UpdateJob;
