import Vue from 'vue'
import App from './App'
import store from '@/store'

Vue.config.productionTip = false

import https from './api/request.js'
Vue.prototype.request = https.request //无token
Vue.prototype.requestByToken = https.requests //有token


App.mpType = 'app'
import uView from 'uview-ui'
Vue.use(uView)

const app = new Vue({
	store,
	...App
})
app.$mount()
