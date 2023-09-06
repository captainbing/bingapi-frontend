import { searchPicture } from '@/services/customapi';
import { AppleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Image, Input, List, message, Row, Space, Tabs } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import {useLocation, useMatch, useParams} from 'react-router';
import { useSearchParams } from 'react-router-dom';

interface Picture {
  title?: string;
  url?: string;
}

const Index: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [pictureList, setPictureList] = useState<Picture[]>([]);
  const location = useLocation();
  const match = useMatch('/search/:category');
  const params = useParams();
  const searchParams = useSearchParams();
  const onSearch = async () => {
    console.log('location=', location);
    console.log('match=', match);
    console.log('params=', params);
    console.log('searchParams=', searchParams);
    const res = await searchPicture({
      searchText,
      current: 1,
      pageSize: 10,
    });
    if (res?.code === 200) {
      setPictureList(res?.data);
      return;
    }
    message.error('服务器正在忙，清稍后重试');
  };
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <Row>
        <Col offset={6} span={12}>
          <Space.Compact block={true}>
            <Input
              value={searchText}
              onPressEnter={onSearch}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus={true}
            />
            <Button type="primary" onClick={onSearch}>
              搜索
            </Button>
          </Space.Compact>
        </Col>
      </Row>
      <Tabs
        size="large"
        centered={true}
        defaultActiveKey="picture"
        items={[
          {
            label: (
              <span>
                <AppleOutlined />
                文章
              </span>
            ),
            key: 'post',
            children: 'I am Post',
          },
          {
            label: (
              <span>
                <AppleOutlined />
                图片
              </span>
            ),
            key: 'picture',
            children: (
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={pictureList}
                renderItem={(picture) => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<Image width={200} src={picture?.url} />}
                    >
                      <Meta title={picture?.title} description={picture?.title} />
                    </Card>
                  </List.Item>
                )}
              />
            ),
          },
          {
            label: (
              <span>
                <AppleOutlined />
                视频
              </span>
            ),
            key: 'video',
            children: 'I am Video',
          },
        ]}
      />
    </PageContainer>
  );
};

export default Index;
