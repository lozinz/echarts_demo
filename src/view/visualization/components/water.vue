<template>
  <div class="water-wrapper" :style="{ width: size+'px', height: size+'px' }">
    <canvas 
      ref="canvasRef" 
      :width="size * dpr" 
      :height="size * dpr"
      :style="{ transform: `scale(${1/dpr})` }"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  size: { type: Number, default: 100 },   // 直径
  color: { type: String, default: '#1890FF' },
  progress: { type: Number, default: 0.5 } // 0-1
})

const canvasRef = ref(null)
const dpr = window.devicePixelRatio || 1
let animationId = null
let phase = 0

const drawWave = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  const centerY = height * (1 - props.progress)
  
  ctx.clearRect(0, 0, width, height)
  
  // 绘制渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, `${props.color}80`)
  gradient.addColorStop(1, props.color)
  ctx.fillStyle = gradient
  
  // 绘制水波路径
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  
  const waveWidth = width * 0.8
  const waveHeight = height * 0.02
  
  for (let x = 0; x <= width; x++) {
    const angle = (x / waveWidth) * Math.PI * 2 + phase
    const y = Math.sin(angle) * waveHeight + centerY
    ctx.lineTo(x, y)
  }
  
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.closePath()
  ctx.fill()
  
  // 更新相位产生动画
  phase += 0.05
  animationId = requestAnimationFrame(drawWave)
}

onMounted(() => {
  drawWave()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})

watch(() => props.progress, drawWave)
</script>

<style scoped>
.water-wrapper {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}
.water-wrapper canvas {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
}
</style>