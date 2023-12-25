import { listCurrentUserInterfaceInfo } from '@/services/api/interface';
import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Card, List, Skeleton, Tag } from 'antd';

import Meta from 'antd/es/card/Meta';
import Tooltip from 'antd/lib/tooltip';
import { useEffect, useState } from 'react';

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [currentUserInterfaces, setCurrentUserInterfaces] = useState<any>([]);
  useEffect(() => {
    listCurrentUserInterfaceInfo({
      id: initialState?.currentUser?.id,
    }).then((res) => {
      console.log(res);
      setCurrentUserInterfaces(res.data);
    });
  }, []);
  /**
   * 预览接口
   */
  const previewInterface = (text: any, row: any) => {
    history.push('/invoke', {
      interfaceId: row?.id,
    });
  };
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <List
        grid={{
          gutter: 60,
        }}
        dataSource={currentUserInterfaces}
        renderItem={(item) => (
          <List.Item>
            <Card
              key={item?.id}
              style={{ width: 310, marginTop: 16 }}
              actions={[
                <Tooltip placement="top" title={'状态'}>
                  {/*<SettingOutlined key="setting" />,*/}
                  {item?.status === 0 ? (
                    <Tag color="#87d068">可用</Tag>
                  ) : (
                    <Tag color="#f50">关闭</Tag>
                  )}
                </Tooltip>,
                // <EditOutlined key="edit" />,
                <Tooltip placement="top" title={'总调用次数'}>
                  <span>{item?.totalNum}</span>
                </Tooltip>,

                <Tooltip placement="top" title="预览">
                  <Button
                    onClick={() => previewInterface(item?.id)}
                    type={'link'}
                    icon={<EllipsisOutlined key="ellipsis" />}
                  >
                    预览
                  </Button>
                </Tooltip>,
              ]}
            >
              <Skeleton loading={false} avatar active>
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
                  title={item?.name}
                  description={item?.description}
                />
              </Skeleton>
            </Card>
          </List.Item>
        )}
      />
    </PageContainer>
  );
};

export default Welcome;
