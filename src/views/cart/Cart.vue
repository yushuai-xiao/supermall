<template>
  <div id="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </NavBar>
    <CartList></CartList>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      // cartLength(){
        //第一种：直接获取store中state中的数据
        // return this.$store.state.cartList.length
        //第二种，getter中的数据
        // return this.$store.getters.cartLength
        //第三种：mapGetters辅助函数
        ...mapGetters({
          length:'cartLength',
          list:'cartList'
        })
      // }
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
  }
</style>
