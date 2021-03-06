import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

// 阻止启动生产消息
Vue.config.productionTip = false

// 添加事件总线 用于监听Goodsitem图片加载完成
Vue.prototype.$bus = new Vue()

// 安装自定义toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
