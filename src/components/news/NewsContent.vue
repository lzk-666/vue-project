<template>
  <!-- 新闻详细内容 -->
  <div class="news-content">
    <!-- 大标题 -->
    <h4 class="newsTitle">{{newsContent.title}}</h4>
    <!-- 子标题 -->
    <p class="newsSubTitle">
      <span>发表时间:{{newsContent.add_time | dateFormat}}</span>
      <span>点击{{newsContent.click}}次</span>
    </p>
    <hr />
    <!-- 新闻内容 -->
    <div v-html="newsContent.content"></div>
    <!-- 评论组件 -->
    <commentBox :fatherID="id"></commentBox>
  </div>
</template>
<script>
import comment from '../subcomponents/comment.vue';
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      newsContent: "",
      //将路由中的请求参数记录下来
      id: this.$route.params.id
    };
  },
  created() {
    this.getNewsContent();
  },
  methods: {
    getNewsContent() {
      // 根据请求参数id的值获得对应的新闻数据
      this.axios.get("api/getNewsContent.json").then(res => {
        if (res.data.status === 0) {
          let arr = res.data.message;
          let newsData = arr.find(val => {
            return val.id == this.id;
          });
          this.newsContent = newsData;
        } 
      },err=>{
        Toast('加载新闻详情失败...')
      });
    }
  },
  components:{
    commentBox:comment,
  }
};
</script>
<style lang="less">
.news-content {
  padding: 16px;
  .newsTitle {
    text-align: center;
    font-size: 16px;
    color: rgb(241, 14, 14);
    padding: 16px 0;
  }
  .newsSubTitle {
    color: rgb(87, 185, 224);
    display: flex;
    justify-content: space-between;
  }
  img {
    width:100%;
    height:100%
  }
}
</style>