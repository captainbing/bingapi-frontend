import ProCard from '@ant-design/pro-card';
import { useModel } from '@umijs/max';
import {Avatar, Button, Card, Col, Divider, Image, Input, Row, Space, Tag} from 'antd';
import {AntDesignOutlined, PlusOutlined} from "@ant-design/icons";

const UserCenter = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <>
      <ProCard split="vertical">
        <ProCard title="" colSpan="30%" layout={'center'} direction="column">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
            src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'}
          />
          <h2> {initialState?.currentUser?.username}</h2>
          <h3> {initialState?.currentUser?.userProfile}</h3>
          <Divider/>
          <Space align={'start'} direction={'vertical'}>
            标签
            <Tag>哈哈</Tag>
          </Space>
          <Button size={'small'}><PlusOutlined/></Button>
          <Input size={'small'} style={{ width: '20%' }}></Input>
        </ProCard>
        <ProCard title="左右分栏子卡片带标题" headerBordered>
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
      </ProCard>
    </>
  );
};
export default UserCenter;
