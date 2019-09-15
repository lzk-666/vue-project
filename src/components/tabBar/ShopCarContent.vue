<template>
  <div class="shopCarContent">
    <!-- 购物车商品信息 -->
    <div class="mui-card" v-for="(item,index) in carInfo" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch v-model="$store.getters.isSelected[item.id]" 
          @change="selectedChange(item.id,$store.getters.isSelected[item.id])"
          ></mt-switch>
          <img :src="item.img_url"/>
          <div class="shopCar-info">
            <h4>{{item.title}}</h4>
            <div class="info">
              <div class="price">¥{{item.sell_price}}</div>
              <goods-number2 :initCount="item.count" :goodsID="item.id"></goods-number2>
              <div class="del" @click="delGoods(item.id,index)">删除</div> <!-- index删除这个页面的carInfo中的信息 item.id删除vuex全局数据中的信息 -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车商品数量及价格 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner price">
          <div class="priceBox">
            <p>总计(不含运费)</p>
            <p>已勾选商品<span>{{$store.getters.allNumberAndPrice.number}}</span>件，总价：¥<span>{{$store.getters.allNumberAndPrice.amount}}</span></p>
          </div>
          <mt-button size="normal" type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import goodsNumber2 from '../subcomponents/goodsNumber2.vue'
export default {
  data(){
    return {
      carInfo:[]
    }
  },
  methods:{
    // 获取购物车页面的渲染信息
    getShopCarInfo() {
      let shopCar = this.$store.state.shopCar;
      let arr = []
      shopCar.forEach(val=>{
        arr.push(val.id)  //将购物车中所有商品的id放进一个数组
      })
      // 从请求的所有商品信息中遍历出 购物车里面有的商品 媒介是id
      this.axios.get("/api/getGoodsList.json").then(res=>{
        let msg = res.data.message;
        for(var i = 0; i < msg.length; i++) {
          for(var j = 0; j < arr.length; j++){
            if(msg[i].id==arr[j]) {
              // 把购物车里面各商品的数量添加到最终数据
              msg[i].count = shopCar[j].number;
              this.carInfo.push(msg[i])
            }
          }
        }
              console.log(this.carInfo)
      })
    },
    delGoods(id,i) {
      // 根据索引删除本页中的商品
      this.carInfo.splice(i,1);
      // 根据id删除vuex中的商品
      this.$store.commit('deleGoods',id);
    },

    // 切换switch的时候根据把id和切换后的状态isSelected，改变全局数据中的isSelected
    selectedChange(id,isSelected) {
      let obj = {id,selected:isSelected}
      this.$store.commit('changeSelected',obj)
    }
  },
  created() {
    this.getShopCarInfo()
  },
  components:{
    goodsNumber2
  }
};
</script>
<style lang="less" scoped>
.shopCarContent {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner:first-child {
    display: flex;
    justify-content: space-evenly;
    .mint-switch+img {
      width: 80px;
      height: 80px;
    }
    .shopCar-info{
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      h4 {
        font-size:13px;
      }
      .info {
        display:flex;
        justify-content:space-around;
        .price{
          color:red;
          margin-right:2px
        }
        .del {
          margin-left:2px;
          color:deepskyblue;
        }
      }
    }
  }
  .mui-card-content-inner.price{
    display: flex;
    justify-content: space-around;
    align-items: center; 
    span {
      color:red;
      font-size: 16px;
      font-weight: 900;
      padding:4px;
    }
  }

}
</style>