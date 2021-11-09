<template>
  <div id="app">
<<<<<<< HEAD
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
=======
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tabBar></main-tabBar>
>>>>>>> d0b7ac7... vue
  </div>
</template>

<script>
<<<<<<< HEAD
import HelloWorld from './components/HelloWorld.vue'
=======
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
>>>>>>> d0b7ac7... vue

export default {
  name: 'App',
  components: {
<<<<<<< HEAD
    HelloWorld
=======
    MainTabBar
>>>>>>> d0b7ac7... vue
  }
}
</script>

<style>
<<<<<<< HEAD
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
=======
  @import "assets/css/base.css";
>>>>>>> d0b7ac7... vue
</style>
