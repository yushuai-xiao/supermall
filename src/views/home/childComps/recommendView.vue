<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="recommend">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name:'RecommendView',
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 0px 20px;
    font-size: 12px;
    text-align: center;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    /* flex: 1; */
  }
  .recommend-item img{
    width: 60px;
    height: 60px;
    margin-bottom: 7px;
  }
</style>
