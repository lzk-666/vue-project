<template>
  <!-- 图片详细内容 -->
  <div class="picture-content">

    <!-- 大标题 -->
    <h4 class="pictureTitle">{{pictureContent.title}}</h4>

    <!-- 子标题 -->
    <p class="pictureSubTitle">
      <span>发表时间:{{pictureContent.add_time | dateFormat}}</span>
      <span>点击{{pictureContent.click}}次</span>
    </p>
    <hr />

    <!-- 图片缩略图 -->
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>

    <!-- 图片内容 -->
    <div class="pictureFont" v-html="pictureContent.content"></div>

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
      pictureContent: "",
      //将路由中的请求参数记录下来
      id: this.$route.params.id,
      // vue-preview的配置
      slide1: [],
    };
  },
  created() {
    this.getPictureContent();
    this.getPreviewPicture()
  },
  methods: {
    getPictureContent() {
      // 根据请求参数id的值获得对应的图片数据
      this.axios.get("api/getPictureContent.json").then(res => {
        if (res.data.status === 0) {
          let arr = res.data.message;
          let pictureData = arr.find(val => {
            return val.id == this.id;
          });
          this.pictureContent = pictureData;
        } 
      },err=>{
        Toast('加载图片详情失败...')
      });
    },

    getPreviewPicture() {
      this.axios.get('api/getPreviewPicture.json').then(res=>{
        let pictureInfo = res.data.find(val=>{
          return val.id == this.id;
        })
        this.slide1 = pictureInfo.message;
        this.slide1.forEach(function(val) {
          val.w = 1200;
          val.h=900;
          val.msrc = val.src;
        })
      })
    },

    // vue-preview的配置
    handleClose () {
        console.log('close preview')
    }
  },
  components:{
    commentBox:comment,
  }
};
</script>
<style lang="less">
.picture-content {
  padding: 16px;
  .pictureTitle {
    text-align: center;
    font-size: 16px;
    color:hotpink;
    padding: 16px 0;
  }
  .pictureSubTitle {
    color: rgb(87, 185, 224);
    display: flex;
    justify-content: space-between;
  }
  img {
    width:100%;
    height:100%
  }
  .pictureFont {
    font-size: 14px;
    margin-top:12px
  }
}
// 修改vue-preview的默认样式
.my-gallery{
  display: flex;
  flex-wrap:wrap;//默认换行
  figure{
      width: 30%;  
      margin: 5px; 
      img{
          width: 100%;
          box-shadow: 0 0 8px #999;  
          border-radius: 5px;
      }
  }
}
</style>