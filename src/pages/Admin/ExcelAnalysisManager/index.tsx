import { listChartByPage } from "@/services/api/chart";
import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import {Avatar, Button, Card, Col, Divider, Input, List, message, Popover, Row, Space} from "antd";
import EChartsReact from "echarts-for-react";
import React,{ useEffect,useState } from "react";
const {Search} = Input



/**
 * Excel分析管理
 * @constructor
 */
const ExcelAnalysisManager = () => {

  const {initialState} = useModel("@@initialState")

  const [chartList,setChartList] = useState<API.Chart[]>([])
  const defaultSearchParam = {
    current:1,
    size:6
  }

  const [searchLoading,setSearchLoading] = useState(false)

  const loadData = async (searchParam:any) => {
    setSearchLoading(true)
    const res = await listChartByPage(searchParam)
    setSearchLoading(false)
    if (res?.code === 200){
      setChartList(res?.data?.records)
      return;
    }
    message.error(res?.message)
  }
  useEffect(()=>{
    loadData(defaultSearchParam)

  },[])


  const onSearchExcelAnalysis = async (name:string) => {
    await loadData({
      ...defaultSearchParam,
      name
    })
  }

  return (
    <>
      <PageContainer
        header={{
          title: '',
          breadcrumb: {},
        }}
        // loading={searchLoading}
      >
        <Row>
          <Col span={10} offset={8}>
            <Search
              onSearch={onSearchExcelAnalysis}
              placeholder="input search text"
              enterButton="Search"
              size="large"
              loading={searchLoading}
            />
          </Col>
        </Row>
        <Divider/>
        <List
          grid={{ gutter: 16, column: 2 }}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              loadData({ current: page });
            },
            pageSize: 6,
          }}
          dataSource={chartList}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item?.id}
            >
              <List.Item.Meta
                avatar={<Avatar src={initialState?.currentUser?.userAvatar} />}
                title={
                  <Popover content={
                    <Card
                      style={{width:"500px"}}
                      title={item?.name}
                      extra={<Button>删除</Button>}
                    >
                      {item?.genResult}
                    </Card>}
                            trigger="hover">
                    <Button>{item?.name}</Button>
                  </Popover>
                }
                description={<p>{item?.goal}</p>}
              />
              {item?.genChart ? (
                <EChartsReact option={JSON.parse(item?.genChart)}></EChartsReact>
              ) : null}
            </List.Item>
          )}
        />
      </PageContainer>
    </>
  );

}


export default ExcelAnalysisManager
