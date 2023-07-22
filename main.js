import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
Vue.use(uView)
import store from './store'
Vue.config.productionTip = false

Vue.prototype.$store = store
console.log(uni.$u.config.v);
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
