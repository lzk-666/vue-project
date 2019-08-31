<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in lunboList" :key="index">
        <img :src="item" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <routerLink to="/home/news">
          <img src="../../img/menu1.png" />
          <div class="mui-media-body">新闻资讯</div>
        </routerLink>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/picturelist">
          <img src="../../img/menu2.png" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <img src="../../img/menu3.png" />
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <img src="../../img/menu4.png" />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <img src="../../img/menu5.png" />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <img src="../../img/menu6.png" />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
// 导入Toast弹框
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunboList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.axios.get("api/getLunbo.json").then(res => {
        if (res.data.status === 0) {
          this.lunboList = res.data.message;
        } else {
          Toast("轮播图加载失败...");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mint-swipe {
  height: 300px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: purple;
    }
    &:nth-child(3) {
      background-color: skyblue;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-table-view.mui-grid-view {
  border: 0;
  background-color:white;
  img {
    height: 60px;
    width: 60px;
  }
  .mui-table-view-cell{
      border:0;
      .mui-media-body{
        font-size:14px;
      }
  }
}
</style>