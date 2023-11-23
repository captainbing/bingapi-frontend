import {addMenu, editMenu} from '@/services/api/invoke';
import { Form, Input, message, Modal, TreeSelect } from 'antd';
import { useImperativeHandle } from 'react';
import {withRouter} from "@umijs/renderer-react";

const MenuModal = (props: any) => {
  const { isModalOpen, cancelMenuModal, listMenuTree, isEdit, currentFloor, treeMenu } = props;
  //用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(props.onRef, () => {
    return {
      editSetting: editSetting,
    };
  });

  const [form] = Form.useForm();
  const handleOk = async () => {
    if (!isEdit) {
      // 添加
      const res = await addMenu({
        ...form.getFieldsValue(true),
        type: '0',
      });
      if (res?.code === 200) {
        listMenuTree();
        handelCancelMenuModal();
      }
    } else {
      //修改
      const res = await editMenu({
        id: currentFloor?.key,
        title: form.getFieldValue('title'),
        parentId: form.getFieldValue('id'),
      });
      if (res?.code === 200) {
        message.success('修改成功');
        listMenuTree();
        handelCancelMenuModal();
        return;
      }
      message.error(res?.message);
    }
  };

  const editSetting = () => {
    console.log('treeMenu', treeMenu);
    const parentKey = recursionGetParent(treeMenu, currentFloor?.parentId);
    const title = recursionGetTitle(treeMenu, currentFloor?.key);
    form.setFieldValue('title', title);
    if (parentKey) {
      form.setFieldValue('id', parentKey);
    } else {
      form.setFieldValue('id', '0');
    }
  };

  /**
   * 递归查找父级菜单Id
   * @param treeMenu
   * @param parentId
   */
  const recursionGetParent = (treeMenu, parentId): any => {
    for (let i = 0; i < treeMenu.length; i++) {
      if (treeMenu[i]?.key === parentId) {
        return treeMenu[i]?.key;
      }
      if (treeMenu[i]?.children) {
        const res = recursionGetParent(treeMenu[i]?.children, parentId);
        if (res) {
          return res;
        }
      }
    }
  };
  /**
   * 递归查找当前菜单名称
   * @param treeMenu
   * @param key
   */
  const recursionGetTitle = (treeMenu, key): any => {
    for (let i = 0; i < treeMenu.length; i++) {
      if (treeMenu[i]?.key === key) {
        return treeMenu[i]?.title;
      }
      if (treeMenu[i]?.children) {
        let res = recursionGetTitle(treeMenu[i]?.children, key);
        if (res) {
          return res;
        }
      }
    }
  };

  const handelCancelMenuModal = () => {
    form.resetFields();
    cancelMenuModal();
    // getSelectTree()
  };

  return (
    <>
      <Modal
        title={isEdit ? '编辑' : '新建接口分组'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handelCancelMenuModal}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          style={{ maxWidth: 600 }}
          initialValues={{ title: '', id: '0' }}
          autoComplete="off"
        >
          <Form.Item<any>
            label="名称"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="父级菜单" name="id">
            <TreeSelect treeData={treeMenu} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default withRouter(MenuModal)
