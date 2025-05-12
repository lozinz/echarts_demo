<template>
  <div ref="chartRef" style="width: 700px; height: 500px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  Arr:{
    type: Array,
    default: () => []
  }
});
// 按需注册组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

const chartRef = ref(null);
let myChart = null;

const initChart = () => {
  if (!chartRef.value) return;

  // 初始化图表
  myChart = echarts.init(chartRef.value);

  const option = {
    title: {
      text: '当日用电情况',
      subtext: '瓦'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} W'
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: 'green'
        },
        {
          gt: 6,
          lte: 8,
          color: 'red'
        },
        {
          gt: 8,
          lte: 14,
          color: 'green'
        },
        {
          gt: 14,
          lte: 17,
          color: 'red'
        },
        {
          gt: 17,
          color: 'green'
        }
      ]
    },
    series: [
      {
        name: 'Electricity',
        type: 'line',
        smooth: true,
        data:props.Arr,
        markArea: {
          itemStyle: {
            color: 'rgba(255, 173, 177, 0.4)'
          },
          data: [
            [
              {
                name: 'Morning Peak',
                xAxis: '07:30'
              },
              {
                xAxis: '10:00'
              }
            ],
            [
              {
                name: 'Evening Peak',
                xAxis: '17:30'
              },
              {
                xAxis: '21:15'
              }
            ]
          ]
        }
      }
    ]
  };

  myChart.setOption(option);
};

// 响应式调整图表大小
const resizeChart = () => {
  myChart?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  myChart?.dispose();
});
</script>