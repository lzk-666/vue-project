import VueRouter from 'vue-router';
import login from './components/login.vue'
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:login}
    ]
})
export default router