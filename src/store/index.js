import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    //mutations唯一的目标就是修改state中状态
    //mutation中的每个方法尽可能完成的事件比较单一一点
     //数量+1
     addCount(state,payload){
       payload.count++;
     },
     //添加新商品
     addToCart(state,payload){
       payload.checked = true; //是否选中
       state.cartList.push(payload)
     }
  },
  actions:{
    //有判断逻辑判断建议放actions里面
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        //payload新添加的商品
        let oldProduct = context.state.cartList.find(
          item=>item.iid === payload.iid
        )
        //2.判断oldProduct +1或者新添加 ，做了两件事，放actions里面比较号
        if(oldProduct){
          context.commit('addCount',oldProduct);
          resolve('当前的商品数量+1')
        }else{
          payload.count = 1;
          context.commit('addToCart',payload);
          resolve('添加了新的商品');
        }
      })
    },
  },
  getters:{
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  }
})
