import {debounce} from "./utils.js"
export const imgListenerMixin = {
  data(){
    return{
      imgListener:null,
      refresh:null
    }
  },
  mounted(){
    // 给防抖函数赋值一个新的函数
    this.refresh = debounce(this.$refs.scroll.refresh, 50);

    // 接收发射的事件总线,并用监听图片变量保存
    this.imgListener = () => {
      this.refresh();
    };
    this.$bus.$on("itemImgLoad", this.imgListener);
  }
}
