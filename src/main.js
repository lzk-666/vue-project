import Vue from 'vue';
import App from './App.vue'
// import VueRouter from 'vue-router';
// Vue.use(VueRouter)
// import router from './router.js';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import './lib/mui-master/dist/css/mui.css'

const vm = new Vue({
    el: '#app',
    render: c => c(App),
    // router
})