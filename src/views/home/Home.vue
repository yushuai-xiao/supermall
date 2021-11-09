<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <Scroll class="content" ref="scroll" :probe-type="3"
    @scroll="contentScroll"  :pull-up-load="true"
    @pullingUp="loadMore">
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners"></HomeSwiper>
      <!-- 推荐 -->
      <RecommendView :recommends="recommends"></RecommendView>
      <!-- 本周流行 -->
      <FeatureView></FeatureView>
      <!-- 选项卡 -->
      <TabControl :titles="['流行','新款','精选']" class="tab-control"
      @tabClick="tabControl"
      ></TabControl>
      <!-- 商品区 -->
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </Scroll>
    <!-- backTop不需要一起滚 -->
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/recommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import { getHomeMultidata,getHomeGoods } from 'network/home'
  import {debounce} from 'common/untils.js'
  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView,

    },
    data(){
      return {
        //接收banner的数据
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    created(){
      //利用封装的axios获取数据
      this.getHomeMultidata(),
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
      // //监听item中的图片加载完成
      // this.$bus.$on('itemImgLoad',()=>{
      //   this.$refs.scroll.refresh();
      // })
    },
    mounted(){
      //监听item中的图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImgLoad',()=>{
        refresh()
      })
    },
    methods:{
      /* 网络请求方法*/
      getHomeMultidata(){
        getHomeMultidata().then((res)=>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      //请求商品数据
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          //完成上拉加载更多，不然只能加载一次
          this.$refs.scroll.finishPullUp()
        })
      },
      //tabControl切换之间的数据请求类型
      tabControl(index){
        switch(index){
          case 0:
            this.currentType = "pop"
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell';
        }
      },
      //点击backTop回到顶部
      backClick(){
        //这样写有点臃肿，可以在Scroll.vue中进行封装
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollTo(0,0)
        // console.log(this.$refs.scroll.finishPullUp);
      },
      //滚动到某个位置显示和隐藏回到顶部按钮
      contentScroll(position){
        this.isShowBackTop = -position.y > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #FFFFFF;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .tab-control{
    /* position: sticky; */
    top: 44px;
    z-index: 9;
  }
  .content{
   overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 51px;
    right: 0;
    left: 0;
/*    height: 500px;
    overflow: hidden; */
  }
</style>
