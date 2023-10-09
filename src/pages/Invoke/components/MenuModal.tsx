import { Form,Input,Modal } from "antd";
import {addMenu} from "@/services/api/invoke";



const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  title?: string;
};
const MenuModal = ({isModalOpen,cancelMenuModal,listMenuTree}:any) => {

  const [form] = Form.useForm();
  const handleOk = async () => {
    const res = await addMenu(form.getFieldsValue(true))
    if (res?.code === 200){
      listMenuTree()
      cancelMenuModal()
    }
  }

  return (
    <>
      <Modal title="New Collection" open={isModalOpen} onOk={handleOk} onCancel={cancelMenuModal}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="根目录"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )

}

export default MenuModal
