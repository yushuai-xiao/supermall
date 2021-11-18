<template>
  <div>
    <Swiper>
      <SwiperItem v-for="(item,index) in banners" :key="index" >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </SwiperItem>
    </Swiper>
  </div>

</template>

<script>
  import { Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name:'HomeSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods:{
      imageLoad(){
        if (!this.isLoad){
          this.$emit("itemImgLoad")
          this.isLoad = true
        }
      }
    }
  }
</script>

<style>
</style>
