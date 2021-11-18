<template>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
        :key="index"
        class="title-item"
        :class="{active:index=== currentIndex}"
        @click="itemClick(index)">
            {{item}}
        </div>
      </div>
    </NavBar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default{
    name:'DetailNavbar',
    components:{
      NavBar,
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      backClick(){
        this.$router.back();
      },
      itemClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index)
      }
    }
  }
</script>

<style scoped="scoped">
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
