import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)

// 导入router前端路由模块
import router from './router.js';

// 导入moment日期处理库
import moment from 'moment';

// 定义全局时间过滤器
Vue.filter('dateFormat',data=>{
    return moment(data).format('YYYY-MM-DD hh:mm:ss');
})

// 导入mint-ui组件
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)

//导入mui的样式文件
import './lib/mui-master/dist/css/mui.css'
import './lib/mui-master/dist/css/icons-extra.css'

const vm = new Vue({
    el: '#app',
    render: c => c(App),
    router
})