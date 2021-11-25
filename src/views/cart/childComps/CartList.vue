<template>
  <div class="cart-list">
    <scroll class="scroll-height" ref="scroll">
      <CartListItem v-for="item in cartList"
      :key="item.iid" :item-info="item"></CartListItem>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from './CartListItem.vue'
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  data() {
    return {
      checkedAll: false
    };
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  methods: {

  },
  created() {

  },
  mounted() {
    // 刷新better-scroll
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  width: 100%;
  height: calc(100vh - 44px -99px)
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}



</style>
