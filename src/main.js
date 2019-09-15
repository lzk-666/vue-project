import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//导入vuex
import Vuex from 'vuex';
Vue.use(Vuex);

let shopCar = JSON.parse(localStorage.getItem("shopCar")) || [];

const store = new Vuex.Store({
    state: {
        // 购物车模块所需要的数据=>{price,number,id,selected}
        shopCar:shopCar
    },
    mutations: {
        // 点击添加购物车按钮时执行
        addShopCar(state,goodsInfo) {
            let temp = state.shopCar.some(val=>{
                if(val.id == goodsInfo.id) {
                    val.number += parseInt(goodsInfo.number);
                    return true;
                }
            })
            if(!temp) {
                state.shopCar.push(goodsInfo)
            }
            // 用本地存储把shopCar存起来，防止刷新页面购物车清零的清空
            localStorage.setItem("shopCar",JSON.stringify(state.shopCar))
        },

        // 购物车页面中点击+或-按钮时执行
        updataNumber(state,goodsInfo) {
            console.log(goodsInfo)
            state.shopCar.some(val=>{
                if(val.id==goodsInfo.id){
                    val.number = parseInt(goodsInfo.number)
                }
            })
        },

        // 购物车页面点击删除时执行
        deleGoods(state,id) {
            state.shopCar.some((val,index)=>{
                if(val.id==id){
                    state.shopCar.splice(index,1)
                    // 最新数据同步到本地存储
                    localStorage.setItem("shopCar",JSON.stringify(state.shopCar))
                }
            })
        },

        // switch开关切换时，改变shopCar里的selected的状态
        changeSelected(state,obj) {
            state.shopCar.some(val=>{
                if(val.id==obj.id) {
                    val.selected = obj.selected;
                    localStorage.setItem("shopCar",JSON.stringify(state.shopCar))
                }
            })
        }

    },
    getters: {
        // 购物车上的数字标识（即全部商品数量）
        badge(state) {
            let number = 0;
            state.shopCar.forEach(val=>{
                number += parseInt(val.number)
            })
            return number   //所有商品的数量
        },

        // 获取购物车页面中所有已勾选的商品的价格之和以及勾选商品数量
        allNumberAndPrice(state) {
            let obj = {
                number:0,
                amount:0
            };
            state.shopCar.forEach(val=>{
                if(val.selected==true) {
                    obj.number += parseInt(val.number)
                    obj.amount += parseInt(val.number*val.price)
                }
            })
            return obj
        },

        // 获取

        //  {"88":"true","89":"true"}的方式来判断购物车是否被选择
        isSelected(state) {
            let obj = {};
            state.shopCar.forEach(val=>{
                obj[val.id] = val.selected;
            })
            return obj;
        },

    }
})

// 导入router前端路由模块
import router from './router.js';

// 导入moment日期处理库
import moment from 'moment';

// 定义全局时间过滤器
Vue.filter('dateFormat', data => {
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

//导入mui
import './lib/mui-master/dist/css/mui.css'
import './lib/mui-master/dist/css/icons-extra.css'

// 导入图片懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

// 导入vue-preview缩略图插件
import VuePreview from 'vue-preview';
// Vue.use(VuePreview);
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: { top: 0, bottom: 0 },
    captionEl: false,
    fullscreenEl: true,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})

const vm = new Vue({
    el: '#app',
    render: c => c(App),
    router,
    store
})