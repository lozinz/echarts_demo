<template>
  <div ref="chartRef" style="width: 50vw; height:30vw;">
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'


const props = defineProps({
  Woter: {
    type: Array,
    default: () => [
      { time: '08:00', usage: 0.2 },
      { time: '12:00', usage: 0.1 },
      {time: '18:00', usage: 100 },
      // ...其他数据
    ]
  },
  threshold: {
    type: Number,
    default: 30 // 用水量警戒线
  }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    title: {
      text: '当日用水情况监测',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        return `${params[0].axisValue}<br/>用水量: ${params[0].value} m³`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.Woter.map(item => item.time),
      axisLabel: {
        interval:0 // 智能间隔显示
      }
    },
    yAxis: {
      type: 'value',
      name: '用水量 (m³)',
      axisLine: { show: true },
      splitLine: { show: true }
    },
    series: [
      {
        name: '用水量',
        type: 'line',
        smooth: true,
        data: props.Woter.map(item => item.usage),
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#1890FF'
        },
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 8
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24, 144, 255, 0.6)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
          ])
        },
        markLine: {
          silent: true,
          data: [
            {
              yAxis: props.threshold,
              name: '警戒线',
              lineStyle: {
                color: '#F5222D',
                type: 'dashed'
              },
              label: {
                position: 'end',
                formatter: '警戒线: {c} m³'
              }
            }
          ]
        }
      }
    ],
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     show: true,
    //     start: 0,
    //     end: 100,
    //     height: 20,
    //     bottom: 10
    //   },
    //   {
    //     type: 'inside',
    //     start: 0,
    //     end: 100
    //   }
    // ]
  }

  chartInstance.setOption(option)
  window.addEventListener('resize', handleResize)
}

const handleResize = () => {
  chartInstance?.resize()
}

const updateChart = () => {
  if (chartInstance) {
    chartInstance.setOption({
      xAxis: { data: props.data.map(item => item.time) },
      series: [{ data: props.data.map(item => item.usage) }]
    })
  }
}

onMounted(initChart)
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})

watch(() => props.data, updateChart, { deep: true })
watch(() => props.threshold, () => {
  chartInstance?.setOption({
    markLine: {
      data: [{ yAxis: props.threshold }]
    }
  })
})
</script>