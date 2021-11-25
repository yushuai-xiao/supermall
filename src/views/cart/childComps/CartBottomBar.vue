<template>
	<div class="cart-bottom-bar">
	  <div class="cart-bottom-check">
      <CheckButton :is-checked="isSelectAll"
      @click.native="checkClick"
      class="check-button">
      </CheckButton>
      <span>全选</span>
	  </div>
	  <div class="cart-bottom-price">
	    合计：
	    <span>{{totalPrice}}</span>
	    元
	  </div>
	  <div class="cart-bottom-btn">
	    <button>提交订单({{checkLength}})</button>
	  </div>
	</div>
</template>

<script>
  import CheckButton from './CheckButton.vue';
  import { mapGetters } from "vuex";
	export default {
		name: 'CartBottomBar',
    components:{
      CheckButton
    },
		data(){
			return {

			}
		},
    computed:{
      //取得全局的cartList
      ...mapGetters(['cartList']),
      //购物车为空时
      isSelectAll(){
        // console.log(this.cartList.length);
        if(this.cartList.length ===0) return false;
        //1.使用filter
        return !(this.cartList.filter((item)=>
          !item.checked
        ).length)
        //2.使用find
        // return !this.cartList.find(item=>!item.checked)
        //3.普通遍历
        // for(let item of this.cartList){
        //   if(!item.checked){
        //     return false
        //   }
        // }
      },
      totalPrice(){
        return(
        '￥'+
        this.cartList.filter((item)=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
        )
      },
      checkLength(){
        return this.cartList.filter((item)=>
          item.checked
        ).length
      }
    },
		methods:{
      //全选按钮的点击效果
      checkClick(){
        if(this.isSelectAll){
          this.cartList.forEach((item)=>{
            item.checked = false;
          })
        }else{
          this.cartList.forEach((item)=>{
            item.checked = true
          })
        }
      }
		}
	}
</script>

<style scoped>
  .cart-bottom-bar {
    font-size: 15px;
    position: fixed;
    right: 0;
    bottom: 50px;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-top: 1px solid #cccccc;
  }
  .cart-bottom-check{
    display: flex;
  }
 .check-button{
   width: 20px;
   height: 20px;
 }
 .cart-bottom-check span{
   margin-left: 5px;
   margin-top: 2px;
   vertical-align: middle;
 }
  .cart-bottom-price {
    margin-left: 50px;
  }

  .cart-bottom-price span {
    color: red;
  }

  .cart-bottom-btn button {
    line-height: 50px;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    height: 50px;
    padding: 0 15px;
    color: white;
    border: 0;
    outline: none;
    background: linear-gradient(to right, #ff6034, #ee0a24);
  }

  .cart-bottom-btn button:active {
    opacity: 0.8;
  }
</style>
