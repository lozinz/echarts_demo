<script setup>

</script>

<template>
  <el-col :span="25">
      <h5 class="mb-5 text-xl text-center leading-20 bg-sky-600 text-white">水电管理系统</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" @click="$router.push('/visualization')">
          <el-icon><icon-menu /></el-icon>
          <span>用水用电情况</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><setting /></el-icon>
          <span>管理员管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</template>

<style scoped>

</style>
