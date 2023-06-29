<template>
  <div id="app">
    <!-- 路由占位符,渲染作用 -->
    <keep-alive exclude="Home">
      <router-view></router-view></keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>

</style>