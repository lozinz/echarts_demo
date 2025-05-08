<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';

</script>

<template>
  <!-- header -->
  <div class="common-layout h-screen">
    <el-container>
      <el-aside width="200px" class="h-screen"> 
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header class="mb-7"> <Header></Header></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- banner -->
   <!-- 侧边栏 -->
    <!-- main -->
    

  <!-- follow -->
</template>

<style scoped>

</style>