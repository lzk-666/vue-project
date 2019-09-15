<template>
    <div>
        <!-- 主组件 -->
        <div class="app-content">
        
            <transition>
                <router-view></router-view>
            </transition>

            <!-- tabbar路由渲染坑 -->
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item-lzk" to='/home'>
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item-lzk" to="/member">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item-lzk" to="/shopcar">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.badge}}</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item-lzk" to="/search">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="mui-tab-label">搜索</span>
                </router-link>
            </nav>

            <!-- mui顶部标题栏 -->
            <mt-header fixed title="我的项目">
                <div slot="left" @click="goBack()" ref="back">
                  <mt-button icon="back">返回</mt-button>
                </div>
            </mt-header>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{}
    },
    methods:{
        goBack() {
            this.$router.go(-1);
        }
    },
    watch: {
        "$route.path":function(newValue,oldValue) {
            if(newValue=="/home") {
                this.$refs.back.style.display= "none"
            }else {
                this.$refs.back.style.display = "block"
            }
        }
    },
}
</script>
<style lang='less' scoped>
    .app-content {
        padding-top:40px;
        overflow-x: hidden;
        padding-bottom:50px;
    }
    /* 组件切换动画 */
    .v-enter,
    .v-leave-to{
        opacity: 0;
        transform: translateX(100%)
    }
    .v-enter-active
    {
        transition: all 0.3s ease
    }

    /* 由于引进mui里的js代码和tabbar样式中的mui-tab-item类名有冲突所以重新换类名 */
    .mui-bar-tab .mui-tab-item-lzk {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-lzk .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-lzk .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mui-bar-tab .mui-tab-item-lzk.mui-active {
        color: #007aff;
    }
</style>