import {useState} from "react";
import EChartsReact from "echarts-for-react";

const Analysis = () => {
  const [option, setOption] = useState({                //设置初始值
    grid: {
      left: 0,
      right: 0,
    },
    xAxis: {
      axisTick: {alignWithLabel: false},
      data: ['1', '2', '3']
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        symbolSize: 10,
        data: ['1', '2', '3'],
        type: 'line',
        smooth:true
      }
    ],
    tooltip: {show: true}
  })

  return (
    <>
      <EChartsReact option={option}/>
    </>
  );
};

export default Analysis;
