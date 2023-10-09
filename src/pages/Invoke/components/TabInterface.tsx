import {Button, message, Tabs} from "antd";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";

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
  return (
    <>
      {/*<div style={{ marginBottom: 16 }}>*/}
      {/*  <Button onClick={add}>ADD</Button>*/}
      {/*</div>*/}
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        tabBarExtraContent={<Button>Extra Action</Button>}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </>
  );
});

export default TabInterface;
