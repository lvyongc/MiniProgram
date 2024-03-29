import App from './App'
import myIcon from './components/myIcon.vue';
import store from 'store'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
// 顶部占位符
Vue.prototype.$statusBarHeight=uni.getSystemInfoSync().statusBarHeight
Vue.component('myIcon',myIcon)
Vue.prototype.$store = store
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif