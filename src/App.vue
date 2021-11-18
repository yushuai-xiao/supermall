<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tabBar v-if="isDetail"></main-tabBar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  },
  computed:{
    isDetail(){
      return this.$route.path.indexOf('/detail')
    }
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
