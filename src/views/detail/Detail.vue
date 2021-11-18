<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick"></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <!-- 详情页轮播图 -->
      <DetailSwiper :topImages="topImage"></DetailSwiper>
      <!-- 商品信息 -->
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <!-- 商店信息 -->
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <!-- 商品详情信息 -->
      <detail-goods-info :detail-info="detailInfo" @ImgLoad="imageLoad"/>
      <!-- 商品参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <!-- 商品评论区 -->
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <!-- 推荐区域数据 -->
      <GoodsList :goods="recommends" ref="recommend"></GoodsList>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'

  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

  import GoodsList from 'components/content/goods/GoodsList.vue'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'

  import {imgListenerMixin} from 'common/mixins.js'
  import {debounce} from 'common/utils.js'
  export default{
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,

      GoodsList,

      Scroll,
    },
    data(){
      return{
        iid:null,
        topImage:[] ,//轮播图
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopys:[],
        getThemeTopy:null
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;
      //2.根据iid请求详情数据
      this.getDetail();
      //3.获取推荐区域数据
      this.getRecommend();
      this.getThemeTopy = debounce(()=>{
        this.themeTopys = [];
        this.themeTopys.push(0);
        // console.log(this.$refs.params.$el.offsetTop-44);
        this.themeTopys.push(this.$refs.params.$el.offsetTop-44);
        this.themeTopys.push(this.$refs.comment.$el.offsetTop-44);
        this.themeTopys.push(this.$refs.recommend.$el.offsetTop-44);
      })
    },
    mixins:[imgListenerMixin],
    mounted(){
      // 获取失败，值不对,图片没有渲染完
      // this.themeTopys.push(0)
      // this.themeTopys.push(this.$refs.params.$el.offsetTop)
      // this.themeTopys.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopys.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopys);
    },
    methods:{
      //1.根据iid请求详情数据
      getDetail(){
        getDetail(this.iid).then(res=>{
          // console.log(res);
          const data = res.result;
          //1.获取顶部的图片轮播数据
          this.topImage = data.itemInfo.topImages
          //2.获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //3.获取店铺信息
          this.shop = new Shop(data.shopInfo)
          // 4.保存商品的详情数据
          this.detailInfo = data.detailInfo;
          // 5.获取商品参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule || {})
          // 6.获取商品评论区内容
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0] || {}
          }
          // 获取失败，值也不对
          // 值不对的原因：this.$refs.params.$el压根没有渲染
          // this.themeTopys = [];
          // this.themeTopys.push(0);
          // this.themeTopys.push(this.$refs.params.$el.offsetTop);
          // this.themeTopys.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopys.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopys);
          // this.$nextTick(()=>{
            //获取失败，值不对,
            //虽然dom已经渲染完了，但图片没有渲染完
            // this.themeTopys = [];
            // this.themeTopys.push(0);
            // this.themeTopys.push(this.$refs.params.$el.offsetTop);
            // this.themeTopys.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopys.push(this.$refs.recommend.$el.offsetTop);
            // console.log(this.themeTopys);
          // })
        })
      },
      //2.获取推荐区域数据
      getRecommend(){
        getRecommend().then(res=>{
          this.recommends = res.data.list
        })
      },
      imageLoad(){
        // this.$refs.scroll.refresh()
        this.refresh();
        this.getThemeTopy();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopys[index],500)
      }
    }
  }
</script>

<style scoped="scoped">
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
