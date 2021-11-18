<template>
  <div class="goods-item">
    <img :src="showImage" alt="" @load="imgLoad" @click="itemClick">
    <div class="goods-info">
      <p>{{products.title}}</p>
      <span class="price">{{products.price}}</span>
      <span class="collect">{{products.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'GoodsListItem',
    props:{
      products:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.products.image || this.products.show.img
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
        this.$router.push('./detail/'+this.products.iid)
      }
    }
  }
</script>

<style scoped="scoped">
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    overflow: hidden;
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
    .goods-info .collect::before {
      content: '';
      position: absolute;
      left: -15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>
