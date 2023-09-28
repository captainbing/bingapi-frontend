import { getConfigById, updateConfig } from '@/services/api/sysconfig';
import { SizeType } from '@ant-design/pro-form/es/BaseForm';
import { Col, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import {getDictDataById, updateDictData} from "@/services/api/dictdata";

/**
 * 编辑接口
 */
const UpdateDictData = ({ id, editDictDataModalVisible, handleEditDictDataCancel }: any) => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  useEffect(() => {
    getDictDataById({
      id,
    }).then((res) => {
      form.setFieldsValue(res?.data);
    });
  }, [id]);

  const handleEditOk = async () => {
    console.log(form.getFieldsValue());
    const res = await updateDictData(form.getFieldsValue(true));
    if (res?.code === 200) {
      message.success('修改成功');
      handleEditDictDataCancel();
      return;
    }
    message.error(res?.message);
  };

  return (
    <Modal
      title="编辑"
      width={1000}
      open={editDictDataModalVisible}
      onOk={handleEditOk}
      onCancel={handleEditDictDataCancel}
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
            <Form.Item label="字典标签" name="dictLabel">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="字典键值" name="dictValue">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="字典排序" name="dictSort">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="状态" name="status">
              <Select>
                <Select.Option value={'0'}>正常</Select.Option>
                <Select.Option value={'1'}>停用</Select.Option>
              </Select>
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
            <Form.Item label="是否默认" name="defaultFlag">
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

export default UpdateDictData;
