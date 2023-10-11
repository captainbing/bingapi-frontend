import {addMenu, selectMenu} from "@/services/api/invoke";
import {Dropdown, Form, Input, MenuProps, Modal, TreeSelect} from "antd";
import React, {useEffect, useState} from "react";
import {useModel} from "@umijs/max";



const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
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

  const [menuName,setMenuName] = useState("")
  const [treeMenu,setTreeMenu] = useState([])

  const { initialState } = useModel('@@initialState');

  useEffect(()=>{
    selectMenu({
      id:initialState?.currentUser?.id
    }).then(res=>{
      setTreeMenu(res?.data)
    })
  },[])

  const handelCancelMenuModal = () => {
    form.resetFields()
    form.setFieldValue("title","")
    cancelMenuModal()
  }



  return (
    <>
      <Modal title="新建接口分组" open={isModalOpen} onOk={handleOk} onCancel={handelCancelMenuModal}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          style={{ maxWidth: 600 }}
          initialValues={{ title: '', parentId: '0' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<any>
            label="名称"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="父级菜单" name="parentId">
            <TreeSelect
              treeData={treeMenu}
            />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );

}

export default MenuModal
