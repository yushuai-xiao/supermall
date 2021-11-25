<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BetterScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  BetterScroll.use(Pullup)
  export default {
    name:'Scroll',
    data(){
      return{
        scroll:null //把scroll对象存在这个组件的数据中进行保留
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      //new Bscoll(指定挂载，对象要求)
      //需要使用ref获取
      this.scroll = new BetterScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true,
        // pullUpLoad: true
        observeDOM:true,
      })
     //监听scroll的位置，隐藏和显示，回到顶部按钮
     // console.log(this.probeType  === 3);
      if(this.probeType ===2 || (this.probeType === 3) ){
        this.scroll.on('scroll', position => {
          this.$emit('scroll',position);

        })
      }
      //监听scroll滚动到底部，上拉加载更多
      if(this.pullUpLoad === true){
        this.scroll.on("pullingUp",()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      //点击回到某个位置
      scrollTo(x,y,time=500){
        this.scroll && this.scroll.scrollTo(x,y,time);
         // this.scroll && this.scroll.scrollTo(0,-200,0)
      },
      //完成上拉加载更多
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      //刷新
      refresh(){
        this.scroll && this.scroll.refresh()
        // console.log('111');
      },
      //获取位置y 记录离开位置
      getScrollY(){
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style>
</style>
