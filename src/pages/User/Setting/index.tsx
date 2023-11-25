import { useModel } from '@umijs/max';
import { Button, Form, Input, message, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import {editUserInfo, getUserById, resetEncryptKey, updateUserPassword} from "@/services/api/user";

type LayoutType = Parameters<typeof Form>[0]['layout'];

const UserSetting = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [basicInfoForm] = Form.useForm();
  const [passwordInfoForm] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const fetchLoginUser = async () => {
    const { id } = JSON.parse(localStorage.getItem('token') as any);
    const res = await getUserById({
      id,
    });
    if (res?.code === 200) {
      basicInfoForm.setFieldsValue(res?.data);
      setInitialState({
        ...initialState,
        currentUser: res?.data,
      });
    }
  };
  useEffect(() => {
    fetchLoginUser();
  }, []);
  /**
   * 修改用户信息
   */
  const onSubmitUserInfo = async () => {
    const res = await editUserInfo(basicInfoForm.getFieldsValue(true));
    if (res?.code === 200) {
      message.success('修改成功');
      await fetchLoginUser();
      return;
    }
    message.error('修改失败，请稍后再试');
  };

  /**
   * 修改用户密码
   */
  const modifyUserPassword = async (data: object) => {
    const res = await updateUserPassword(data);
    if (res?.code === 200) {
      message.success('修改成功');
      // passwordInfoForm.setFieldsValue({ oldPassword: '', newPassword: '', checkNewPassword: '' });
      return;
    }
    message.error(res?.message);
  };

  const onFinish = async (values: any) => {
    await modifyUserPassword(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  /**
   * 重置密钥
   */
  const resetEncryptKeyOnce = async () => {
    console.log("resetEncryptKey=>",basicInfoForm.getFieldsValue(true))
    const res = await resetEncryptKey()
    if (res?.code === 200){
      setInitialState({
        ...initialState,
        currentUser:res?.data
      })
      basicInfoForm.setFieldValue("accessKey",res?.data.accessKey)
      basicInfoForm.setFieldValue("secretKey",res?.data.secretKey)
      return
    }
    message.error(res?.message)
  }

  return (
    <>
      <Tabs
        tabPosition={'left'}
        items={[
          {
            label: `基本设置`,
            key: 'basic',
            children: (
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout={'horizontal'}
                form={basicInfoForm}
                initialValues={{ layout: formLayout }}
                onValuesChange={onFormLayoutChange}
                style={{ maxWidth: 600 }}
              >
                <Form.Item label="邮箱" name={'userAccount'}>
                  <Input placeholder="邮箱" allowClear />
                </Form.Item>
                <Form.Item label="昵称" name={'userName'}>
                  <Input placeholder="昵称" allowClear />
                </Form.Item>
                <Form.Item label="简介" name={'userProfile'}>
                  <Input.TextArea placeholder="简介" allowClear />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                  <Button type={'dashed'} onClick={onSubmitUserInfo}>
                    提交
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            label: '安全设置',
            key: 'safe',
            children: (
              <>
                <Form
                  name="passwordInfoForm"
                  initialValues={{ oldPassword: '', newPassword: '', checkNewPassword: '' }}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  style={{ maxWidth: 600 }}
                  form={passwordInfoForm}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item<any>
                    label="原密码"
                    name="oldPassword"
                    rules={[{ required: true, message: '原密码必填' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item<any>
                    label="新密码"
                    name="newPassword"
                    rules={[{ required: true, message: '新密码必填' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item<any>
                    label="确认密码"
                    name="checkNewPassword"
                    rules={[{ required: true, message: '确认密码必填!' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      修改
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ),
          },{
            label: `密钥设置`,
            key: 'secret',
            children: (
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout={'horizontal'}
                form={basicInfoForm}
                initialValues={{ layout: formLayout }}
                onValuesChange={onFormLayoutChange}
                style={{ maxWidth: 600 }}
              >
                <Form.Item label="accessKey" name={'accessKey'}>
                  <Input.Password placeholder="accessKey" allowClear />
                </Form.Item>
                <Form.Item label="secretKey" name={'secretKey'}>
                  <Input.Password placeholder="secretKey" allowClear />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                  <Button type={'dashed'} onClick={resetEncryptKeyOnce}>
                    重置
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </>
  );
};
export default UserSetting;
