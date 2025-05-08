<script setup>
import { ref } from 'vue'
import Totalelectricity from './components/Totalelectricity.vue'
import Totalepie from './components/Totalepie.vue'
import TotaleWater from './components/Totalewater.vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="校园大楼总用水用电" name="first" class="flex justify-around items-center flex-wrap">
      <Totalelectricity></Totalelectricity>
      <Totalepie></Totalepie>
      <TotaleWater></TotaleWater>
    </el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
