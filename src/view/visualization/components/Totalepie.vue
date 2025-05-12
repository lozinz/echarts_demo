<template>
  <div ref="chartRef" style="width: 50vw; height: 30vw;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  used: { type: Number, default: 50 },     // 已用电量
  total: { type: Number, default: 80 }  // 总电量
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
})

const initChart = () => {
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    title: {
      text: '当日用电量',
      subtext: `${props.used}kWh `,
      left: 'center',
      top: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '用电量',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: props.used, 
            name: '已用电量',
            itemStyle: { color: '#5470C6' }
          },
          {
            value: props.total- props.used, 
            name: '剩余电量',
            itemStyle: { color: '#91CC75' }
          }
        ],
        nimationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 200;
        }
      }
    ]
  }

  chartInstance.setOption(option)
  
  // 响应窗口大小变化
  window.addEventListener('resize', handleResize)
}

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}
</script>