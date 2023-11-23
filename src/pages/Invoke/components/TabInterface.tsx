import {Button, Dropdown, MenuProps, message, Tabs} from "antd";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {UserOutlined} from "@ant-design/icons";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 100);
  return { label: `Tab ${id}`, children: '', key: id };
});

const TabInterface = forwardRef(({}, ref: any) => {
  const test = (key: string, title: string, isLeaf: boolean) => {
    if (!isLeaf) {
      // 类型为目录
      return;
    }
    if (items.find((item) => item.key === key)) {
      setActiveKey(key);
      return;
    }
    setItems([...items, { label: title, children: '', key: key }]);
    setActiveKey(key);
  };

  useImperativeHandle(ref, () => ({ test }));

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([...items, { label: 'New Tab', children: '', key: newActiveKey }]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    if (items.length === 1) {
      message.warning('至少存在一个tab');
      return;
    }
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const items1: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const menuProps = {
    items:items1,
    onClick: handleMenuClick,
  };
  return (
    <>
      {/*<div style={{ marginBottom: 16 }}>*/}
      {/*  <Button onClick={add}>ADD</Button>*/}
      {/*</div>*/}
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        tabBarExtraContent={
        <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
          接口文档
        </Dropdown.Button>}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </>
  );
});

export default TabInterface;
