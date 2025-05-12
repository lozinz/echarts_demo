<script setup>
import { ref } from 'vue'
import Totalelectricity from './components/Totalelectricity.vue'
import Totalepie from './components/Totalepie.vue'
import TotaleWater from './components/Totalewater.vue'
import { onBeforeMount } from 'vue'
import axios from 'axios'
const activeName = ref('first')
const List = ref({
})
const isDataLoaded = ref(false)
const handleClick = (tab, event) => {
  console.log(tab, event)
}
onBeforeMount( async  () => {
  const res = await axios.get('http://localhost:3001/data')
  List.value = res.data
  isDataLoaded.value = true
})
</script>

<template>
  <el-tabs v-if="isDataLoaded"  v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="校园大楼总用水用电" name="first" class="flex justify-around items-center flex-wrap" :style="{ width:'50vw'}">
      <Totalelectricity :Arr = "List.data"></Totalelectricity>
      <Totalepie></Totalepie>
      <TotaleWater :Woter = "List.Woter" ></TotaleWater>
    </el-tab-pane>
    <el-tab-pane label="忠孝大楼" name="second" class="flex justify-around items-center flex-wrap">
      <Totalelectricity  :Arr = "List.data1" ></Totalelectricity>
      <TotaleWater :Woter = "List.Woter1"></TotaleWater>
    </el-tab-pane>
    <el-tab-pane  label="仁爱大楼" name="third" class="flex justify-around items-center flex-wrap">
      <Totalelectricity  :Arr = "List.data2" class="flex justify-around items-center flex-wrap"></Totalelectricity>
      <TotaleWater  :Woter = "List.Woter2"></TotaleWater>
    </el-tab-pane>
    <el-tab-pane label="信义大楼" name="fourth" class="flex justify-around items-center flex-wrap">
      <Totalelectricity  :Arr = "List.data3" ></Totalelectricity>
      <TotaleWater  :Woter = "List.Woter3"></TotaleWater>
    </el-tab-pane>
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
