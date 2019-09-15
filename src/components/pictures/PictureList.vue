<template>
  <div>
    <!-- 图片标题列表 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in category"
            :key="item.id"
            @tap="getPicturesinfo(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- <div class="scrollbysb">
      <div class="contentbysb">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in category"
            :key="item.id"
            @click='getPicturesinfo(item.id)'
          >{{item.title}}</a>
      </div>    
    </div>-->

    <!-- 图片 -->
    <ul class="picture_list">
      <router-link
        v-for="(item, index) in pictureList"
        :key="index"
        :to="'/home/picturelist/content/'+item.id"
        tag="li"
      >
        <img v-lazy="item.img_url" />
        <!-- 图片文字内容 -->
        <div class="picture_content">
          <h4 class="picture_title">{{item.title}}</h4>
          <div class="picture_info">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
// 导入mui.js文件
import mui from "../../lib/mui-master/dist/js/mui.min.js";

export default {
  //要让模板渲染到页面上即类渲染完成后才初始化滑动功能
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      scrollX: true,
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // let viewport = document.querySelector('.scrollbysb')
    // let content = document.querySelector('.contentbysb')
    // let sb = new ScrollBooster({
    //   viewport: viewport,
    //   content: content,
    //   handle: document.querySelector('.viewport-scroller'),
    //   bounce: true,
    //   textSelection: false,
    //   emulateScroll: false,
    //   onUpdate: (data)=> {
    //     content.style.transform = `translate(
    //       ${-data.position.x}px,
    //       0px
    //     )`
    //     // and also metrics: data.viewport['width'|'height'] and data.cotent['width'|'height']
    //   }
    // })
  },

  data() {
    return {
      category: [], //导航栏分类信息
      pictureList: [] //根据图片分类id获取的相应的图片及信息
    };
  },
  methods: {
    getTitleList() {
      //获取图片分类列表
      this.axios.get("/api/getPictureCategory.json").then(res => {
        if (res.data.status === 0) {
          res.data.message.unshift({ title: "全部", id: 0 });
          this.category = res.data.message;
        }
      });
    },
    getPicturesinfo(categroyID) {
      //根据具体图片分类id获取相应的图片及图片详情
      this.axios.get("/api/getPicturesinfo.json").then(res => {
        let arr = res.data.find(val => {
          return val.id == categroyID;
        });
        this.pictureList = arr.message;
      });
    }
  },
  created() {
    this.getTitleList();

    this.getPicturesinfo(0); // 页面一加载就渲染首页
  }
};
</script>
<style lang="less" scoped>
// 去掉滑动时候的警告报错
* {
  touch-action: pan-y;
}
// #scrollbysb {
//   overflow: hidden;
//   width:200px;
// }

.picture_list {
  margin: 0;
  padding: 8px;
  padding-top: 0px;
  list-style-type: none;
  text-align: center;
  li {
    box-shadow: 0px 0px 6px rgb(116, 116, 116);
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    & ~ li {
      margin-top: 10px;
    }
    .picture_content {
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: left;
      padding-left: 4px;
      background-color: rgba(0, 0, 0, 0.3);
      .picture_title {
        font-size: 14px;
      }
      .picture_info {
        font-size: 9px;
      }
    }
  }
}
</style>