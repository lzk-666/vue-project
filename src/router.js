import VueRouter from 'vue-router';

import HomeContent from './components/tabBar/HomeContent.vue';
import MemberContent from './components/tabBar/MemberContent.vue';
import ShopCarContent from './components/tabBar/ShopCarContent.vue';
import SearchContent from './components/tabBar/SearchContent.vue';

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContent },
        { path: '/member', component: MemberContent },
        { path: '/shopcar', component: ShopCarContent },
        { path: '/search', component: SearchContent },
    ],
    linkActiveClass: 'mui-active'
})
export default router