import Vue from 'vue'
import App from './App'
import request from './utils/request.js'

//挂载封住好的请求框架
Vue.prototype.request = request;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
