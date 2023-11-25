import React, {useRef, useState} from "react";
import {copyInvokeRecordById, deleteMenu} from "@/services/api/invoke";
import {Button, Dropdown, MenuProps, message, Popconfirm, Tooltip} from "antd";
import {EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import MenuModal from "@/pages/Invoke/components/MenuModal";

const SelfDropDown = ({currentFloor,isMenu,listMenuTree,treeMenu,sourceRecordTree}:any) => {
  const confirm = async (e: React.MouseEvent<HTMLElement>) => {
    if (currentFloor?.key){
      const res = await deleteMenu({id:currentFloor?.key})
      if (res?.code === 200){
        message.success("删除成功")
        listMenuTree()
        return
      }
      message.error("删除失败")
    }
    console.log(e);
    message.success('Click on Yes');
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
  const cancelMenuModal = () => {
    setIsModalOpen(false);
  };
  const menuModal = useRef()
  const handleEditMenu = (event:React.MouseEvent) => {
    event.stopPropagation()
    menuModal.current?.editSetting()
    setIsModalOpen(true)
  };

  /**
   * 复制记录
   * @param event
   */
  const copyInvokeRecord = async (event:React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const res = await copyInvokeRecordById({id:currentFloor?.key})
    if (res?.code === 200){
      listMenuTree()
      message.success("复制成功")
      return
    }
    message.error(res?.message)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <PlusOutlined/>
          <a
            type='link'
            onClick={(event)=>handleEditMenu(event)}
          >
            编辑
          </a>
        </>

      ),
    },
    {
      key: '2',
      label: (
        <a
          onClick={(event) => event.preventDefault()}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          迁移
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          onClick={(event) => copyInvokeRecord(event)}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          复制
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <Popconfirm
          title={'Delete the' + currentFloor?.title}
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a
            onClick={(event) => event.preventDefault()}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            删除
          </a>
        </Popconfirm>
      ),
    },
    isMenu && {
      key: '5',
      label: (
        <a
          onClick={(event) => event.preventDefault()}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          新建接口
        </a>
      ),
    },
    isMenu && {
      key: '6',
      label: (
        <a
          onClick={(event) => event.preventDefault()}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          新建子分组
        </a>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };



  return (
    <>
      {currentFloor?.title}
      <div style={{float:"right"}}>
        {
          isMenu &&
          <Tooltip title="新增接口">
            <Button
              type="link"
              shape="circle"
              size={'small'}
              onClick={(event) => event.stopPropagation()}
              icon={<PlusOutlined />}
            />
          </Tooltip>
        }
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
        >
          <Button
            onClick={(e) => e.stopPropagation()}
            type={'link'}
            size="small"
            shape="circle"
            icon={<EllipsisOutlined />}
          />
        </Dropdown>
        <MenuModal
          isModalOpen={isModalOpen}
          onRef={menuModal}
          isEdit={true}
          treeMenu={treeMenu}
          currentFloor={currentFloor}
          cancelMenuModal={cancelMenuModal}
          listMenuTree={listMenuTree}
        />
      </div>
    </>
  );
}

export default SelfDropDown
