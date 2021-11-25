import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import Toast from 'components/common/toast';

import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
} from 'vant';
Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Toast);
Vue.config.productionTip = false

//初始化 EventBus 事件总线
Vue.prototype.$bus = new Vue();

//安装Toast插件，会去执行toast里面的index.js的install函数
Vue.use(Toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
