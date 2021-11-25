<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 详情页轮播图 -->
      <DetailSwiper :topImages="topImage"></DetailSwiper>
      <!-- 商品信息 -->
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <!-- 商店信息 -->
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <!-- 商品详情信息 -->
      <detail-goods-info :detail-info="detailInfo" @ImgLoad="imageLoad" />
      <!-- 商品参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="params" />
      <!-- 商品评论区 -->
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <!-- 推荐区域数据 -->
      <GoodsList :goods="recommends" ref="recommend"></GoodsList>
    </Scroll>
    <!-- backTop不需要一起滚 -->
    <!-- <Toast :message="message" v-show="show" class="toast"></Toast> -->
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addCart="addToCart"></DetailBottomBar>


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
  import DetailBottomBar from './childComps/DetailBottomBar.vue';

  import GoodsList from 'components/content/goods/GoodsList.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {mapActions } from 'vuex'

  // import Toast from 'components/common/toast/Toast.vue'
  import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    GoodsParam,
  } from 'network/detail'

  import {
    imgListenerMixin
  } from 'common/mixins.js'
  import {
    debounce
  } from 'common/utils.js'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList,
      BackTop,

      Scroll,
    },
    data() {
      return {
        iid: null,
        topImage: [], //轮播图
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopys: [],
        getThemeTopy: null,
        currentIndex: 0,
        isShowBackTop:false,

        //toast相关
        // message:'',
        // show:false
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;
      //2.根据iid请求详情数据
      this.getDetail();
      //3.获取推荐区域数据
      this.getRecommend();
      this.getThemeTopy = debounce(() => {
        this.themeTopys = []
        this.themeTopys.push(0);
        this.themeTopys.push(this.$refs.params.$el.offsetTop-44);
        this.themeTopys.push(this.$refs.comment.$el.offsetTop-44);
        this.themeTopys.push(this.$refs.recommend.$el.offsetTop-44);
        this.themeTopys.push(Number.MAX_VALUE);
        console.log(this.themeTopys);
      }, 50)
    },
    mixins: [imgListenerMixin],
    mounted() {

      // 获取失败，值不对,图片没有渲染完
      // this.themeTopys.push(0)
      // this.themeTopys.push(this.$refs.params.$el.offsetTop)
      // this.themeTopys.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopys.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopys);
    },
    methods: {
      ...mapActions(['addCart']),
      //1.根据iid请求详情数据
      getDetail() {
        getDetail(this.iid).then(res => {
          // console.log(res);
          const data = res.result;
          //1.获取顶部的图片轮播数据
          this.topImage = data.itemInfo.topImages
          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //3.获取店铺信息
          this.shop = new Shop(data.shopInfo)
          // 4.保存商品的详情数据
          this.detailInfo = data.detailInfo;
          // 5.获取商品参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule || {})
          // 6.获取商品评论区内容
          if (data.rate.cRate !== 0) {
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
      getRecommend() {
        getRecommend().then(res => {
          this.recommends = res.data.list
        })
      },
      //当图片加载完，重新刷新，以及获取topScroll
      imageLoad() {
        // this.$refs.scroll.refresh()
        this.refresh();
        this.getThemeTopy();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopys[index], 500)
      },
      // 滚动内容显示对应的标题
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
        // 1.获取y的值
        const positionY = -position.y;
        //2.positionY和主题中值进行对比
        // [0, 11130, 11890, 12086]在此数组中进行比较
        let length = this.themeTopys.length;
        for (let i = 0; i < length; i++) {
          if (
            //第一种简单的做法
            // this.currentIndex != i &&
            // (
            //   (i < length - 1 &&
            //     positionY >= this.themeTopys[i] &&
            //     positionY < this.themeTopys[i + 1]
            //   )
            //   ||
            //   (i === length - 1 && positionY >= this.themeTopys[i]))
          //   // 下面的是复杂条件的优化
            this.currentIndex !=i && (positionY >= this.themeTopys[i] &&
            positionY <= this.themeTopys[i+1])
          ) {
            // console.log(i,length-1);
            // console.log('topa:', this.themeTopys[i])
            this.currentIndex = i;
            // console.log(this.currentIndex);
            try {
              this.$refs.nav.currentIndex = this.currentIndex;
            } catch (e) {
              console.log(e)
            }
          }
        }
      },
      //点击backTop回到顶部
      backClick(){
        //这样写有点臃肿，可以在Scroll.vue中进行封装
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollTo(0,0)
        // console.log(this.$refs.scroll.finishPullUp);
      },
      //加入购物车
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImage[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        //2.将商品到购物车里面
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })
        this.addCart(product).then(res=>{
          // console.log(res);
          // this.show = true;
          // this.message = res;
          // setTimeout(()=>{
          //   this.show = false;
          //   this.message = ''
          // },1500)
          console.log(this.$toast);
          this.$toast.show(res);
        })
      }
    }
  }
</script>

<style scoped="scoped">
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 50px);
  }
  .toast{
    z-index: 99;
  }
</style>
