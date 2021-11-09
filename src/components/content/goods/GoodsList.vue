<template>
  <div class="good">
    <GoodsListItem v-for="(item,index) in goods" :key="index" :goods-item="item"></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default{
    name:'GoodList',
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .good{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
