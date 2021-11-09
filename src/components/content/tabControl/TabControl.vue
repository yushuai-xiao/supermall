<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
    class="tab-control-item"
    :class="{active:index === currentIndex}"
    @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name:'TabControl',
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0,
      }
    },
    methods:{
      itemClick(index){
        console.log("1111");
        this.currentIndex = index;
        //把index传给外面的home，以做到点击切换
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style>
  .tab-control{
    display: flex;
    justify-content: space-around;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    background-color: #fff;
    z-index: 10;
  }
  .tab-control span{
    padding: 5px 4px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);

  }
</style>
