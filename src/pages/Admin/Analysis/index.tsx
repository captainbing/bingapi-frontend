import React, {useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import EChartsReact from "echarts-for-react";
import {listTopInterfaceInfo} from "@/services/api/interface";

const InterfaceAnalysis: React.FC = () => {

  const [data,setData] = useState([])

  useEffect(()=>{
    listTopInterfaceInfo().then(res=>{
      const items = res?.data.map(item=>{
        return {
          value:item.totalNum,
          name:item.name
        }
      }) as any
      setData(items)
    })
  },[])

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data
      }
    ]
  };


  return (
    <PageContainer>
      <EChartsReact option={option}/>
    </PageContainer>
  )

}

export default InterfaceAnalysis
