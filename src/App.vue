<template>
    <div>
        <!-- 主组件 -->
        <div class="app-content">
        
            <transition>
                <router-view></router-view>
            </transition>

            <!-- tabbar路由渲染坑 -->
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item" to='/home'>
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item" to="/member">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item" to="/shopcar">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item" to="/search">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="mui-tab-label">搜索</span>
                </router-link>
            </nav>

            <!-- mui -->
            <mt-header fixed title="淘淘小店"></mt-header>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
    .app-content {
        padding-top:40px;
        overflow-x: hidden;
    }
    /* 组件切换动画 */
    .v-enter,
    .v-leave-to{
        opacity: 0;
        transform: translateX(100%)
    }
    .v-enter-active,
    .v-leave-actiev{
        transition: all 0.3s ease
    }
</style>