import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import router from './router.js';

// 导入mint-ui全部组件
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios)

//导入mui的样式文件
import './lib/mui-master/dist/css/mui.css'
import './lib/mui-master/dist/css/icons-extra.css'

const vm = new Vue({
    el: '#app',
    render: c => c(App),
    router
})