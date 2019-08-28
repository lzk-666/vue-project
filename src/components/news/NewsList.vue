<template>
  <div>
    <!-- 新闻列表 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <!--  -->
        <router-link :to="'/home/newscontent/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <!-- 用过滤器格式化时间戳 -->
              <span>{{item.add_time | dateFormat}}</span>
              <span>点击 {{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
      this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.axios.get("api/getNewsList.json").then(res => {
        if (res.data.status === 0) {
          this.newsList = res.data.message;
        }
      },err=>{
        Toast('新闻列表获取失败...')
      });
    }
  },

};
</script>
<style lang="less" scoped>
.mui-table-view {
  .mui-ellipsis {
    font-size: 14px;
    color: rgb(87, 185, 224);
    display: flex;
    justify-content: space-between;
  }
}
</style>