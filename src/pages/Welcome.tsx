import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Badge, Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import {listCurrentUserInterfaceInfo, searchInterfacesByName} from "@/services/api/interface";

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1');
  const action = useRef<ActionType>();
  const [currentUserInterfaces, setCurrentUserInterfaces] = useState<any>([]);
  useEffect(() => {
    listCurrentUserInterfaceInfo({
      id: initialState?.currentUser?.id
    }).then((res) => {
      console.log(res);
      setCurrentUserInterfaces(res.data);
    });
  }, []);
  /**
   * 预览接口
   */
  const previewInterface = (text:any,row:any) => {
    history.push('/invoke',{
      interfaceId:row?.id
    });
  };
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <ProList<any>
        rowKey={record => record.id}
        actionRef={action}
        pagination={{
          defaultPageSize: 7,
          showSizeChanger: true,
        }}
        dataSource={currentUserInterfaces}
        editable={{}}
        metas={{
          title: {
            dataIndex: 'name',
            valueType: 'select',
            fieldProps: {
              showSearch: true,
              placement: 'bottomRight',
              options: [
                {
                  label: '实验名称1',
                  value: '实验名称1',
                },
              ],
            },
          },
          description: {
            dataIndex: 'desc',
          },
          content: {
            dataIndex: 'content',
            render: (text) => (
              <div key="label" style={{ display: 'flex', justifyContent: 'space-around' }}>
                {(text as any[]).map((t) => (
                  <div key={t.label}>
                    <div style={{ color: '#00000073' }}>{t.label}</div>
                    <div style={{ color: '#000000D9' }}>
                      {t.status === '可用' ? (
                        <span
                          style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#52c41a',
                            marginInlineEnd: 8,
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#fc5531',
                            marginInlineEnd: 8,
                          }}
                        />
                      )}
                      {t.value}
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          actions: {
            render: (text, row) => [
              <Button type="primary" onClick={()=>previewInterface(text,row)}>
                预览
              </Button>,
            ],
          },
        }}
        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: 'tab1',
                label: (
                  <span>
                    全部接口{renderBadge(currentUserInterfaces?.length ?? 0, activeKey === 'tab1')}
                  </span>
                ),
              },
              {
                key: 'tab2',
                label: <span>我创建的实验室{renderBadge(32, activeKey === 'tab2')}</span>,
              },
            ],
            onChange(key) {
              setActiveKey(key);
            },
          },
          search: {
            onSearch: async (value: string) => {
              const res = (await searchInterfacesByName({
                userId: initialState?.currentUser?.id,
                name: value,
              })) as any;
              if (res?.code === 200) {
                setCurrentUserInterfaces(res?.data);
                return;
              }
              message.error(res?.message);
            },
          },
          actions: [
            <Button type="primary" key="primary">
              新建接口
            </Button>,
          ],
        }}
      />
      {/*<ReactJson src={currentUserInterfaces}/>*/}
      <JSONPretty id="json-pretty" json={currentUserInterfaces}></JSONPretty>
    </PageContainer>
  );
};

export default Welcome;
