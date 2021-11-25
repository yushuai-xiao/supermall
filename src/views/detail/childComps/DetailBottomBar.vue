<template>
  <div class="bottom-bar">
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/cart')"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addToCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
      />
</van-goods-action>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "DetailBottomBar",
  data() {
    return {
      isShouCang: false
    };
  },
  computed: {
    // 对象写法可以自己命名
    // ...mapGetters({
    //   cartLength: "cartListLength"
    // })
  },
  created() {
    // 每次刷新页面获取本地存储购物车数据
    // let list = JSON.parse(localStorage.getItem("cartList")) || [];
    // if (list) {
    //   this.$store.commit("setCartList", list);
    // }
  },
  methods: {
    addToCart(){
      this.$emit('addCart')
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
}

/deep/ .van-goods-action {
  line-height: 50px;
  height: 50px;
  border-top: 1px solid #cccccc;
}

/deep/ .van-goods-action-icon {
  height: auto;
}
</style>
