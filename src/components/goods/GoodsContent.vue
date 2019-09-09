<template>
  <div class="goodsContent">
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunboList="lunbotu"></swiper>
        </div>
      </div>
    </div>

    <!-- 点击加入购物车后执行的小球动画 -->
    <transition
    @before-enter='beforeEnter'
    @enter='enter'
    @after-enter='afterEnter'
    >
        <div class="ball" v-if="flag"></div>
    </transition>

    <!-- mint-ui卡片视图 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价：
            <del>￥{{goodsInfo.market_price}}</del> &nbsp;&nbsp;销售价：
            <span class="nowPrice">￥{{goodsInfo.sell_price}}</span>
          </p>

          <!-- 商品数量 -->
          <goods-number></goods-number>

          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="flag=!flag">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner goodsInfo">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>

      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="toDec(id)">图文介绍</mt-button>
        <p></p>
        <mt-button type="danger" size="large" plain @click="toCom(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import goodsNumber from "../subcomponents/goodsNumber.vue";
export default {
  data() {
    return {
      // 获取地址栏的传递的参数
      id: this.$route.params.id,
      //轮播图数据
      lunbotu: [],
      //商品信息数据
      goodsInfo: "",
      //控制小球的显示
      flag:false,
    };
  },
  methods: {
    getLunbotu() {
      this.axios.get("/api/getGoodsLunbo.json").then(res => {
        if (res.data.status === 0) {
          let data = res.data.message;
          let newData = data.find(val => {
            return val.id == this.id;
          });
          this.lunbotu = newData.src;
        }
      });
    },
    getGoodsInfo() {
      this.axios.get("/api/getGoodsList.json").then(res => {
        if (res.data.status == 0) {
          let newArr = res.data.message.find(val => {
            return val.id == this.id;
          });
          this.goodsInfo = newArr;
        }
      });
    },

    // 编程式切换路由
    toDec(id) {
      this.$router.push("/home/goods/content/desc/" + this.id);
    },
    toCom(id) {
      this.$router.push("/home/goods/content/comment/" + this.id);
    },

    // 执行动画的钩子函数
    beforeEnter(el) {
        el.style.transform = "translate(0,0)"
    },
    enter(el,done) {
        el.offsetWidth;
        el.style.transform = "translate(96px,384px)";
        el.style.transition = "transform 1s cubic-bezier(0.25,0.1,0.25,1)";
        done()
    },
    afterEnter(el) {
      this.flag=false;
    }

  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  components: {
    swiper,
    goodsNumber
  }
};
</script>
<style lang='less' scoped>
.goodsContent {
  background-color: #ddd;
  overflow: hidden;
  .mui-card-content-inner {
    p {
      color: #000;
      .nowPrice {
        color: red;
        font-size: 18px;
      }
    }
    &.goodsInfo {
      p {
        color: rgb(131, 131, 131);
      }
    }
  }
  .mui-card-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    mt-button {
      margin-bottom: 30px;
    }
  }

  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 66;
    left: 142px;
    top: 510px;
  }
}
</style>