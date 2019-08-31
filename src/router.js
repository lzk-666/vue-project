import VueRouter from 'vue-router';

import HomeContent from './components/tabBar/HomeContent.vue';
import MemberContent from './components/tabBar/MemberContent.vue';
import ShopCarContent from './components/tabBar/ShopCarContent.vue';
import SearchContent from './components/tabBar/SearchContent.vue';
import NewsList from './components/news/NewsList.vue';
import NewsContent from './components/news/NewsContent.vue';
import PictureList from './components/pictures/PictureList.vue'
import PictureContent from './components/pictures/PictureContent.vue'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContent },
        { path: '/member', component: MemberContent },
        { path: '/shopcar', component: ShopCarContent },
        { path: '/search', component: SearchContent },
        { path: '/home/news', component: NewsList },
        { path: '/home/news/content/:id', component: NewsContent },
        { path: '/home/picturelist', component: PictureList },
        { path: '/home/picturelist/content/:id', component: PictureContent }
    ],
    linkActiveClass: 'mui-active'
})
export default router