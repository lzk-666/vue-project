<template>
  <!-- 商品数量box子组件 -->
  <div class="goodsNumber">
    <div class="mui-numbox" data-numbox-min="1" style="height:24px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        :value="initCount"
        readonly
        @change="numberChange"
        ref="numberBox"
      />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from '../../lib/mui-master/dist/js/mui.min.js'
export default {
    mounted() {
        // mui-numbox失效。因为要等页面渲染好才能执行相应的代码。所以要等页面渲染完成后再执行nui-numbox里的动画
        mui(".mui-numbox").numbox();//初始化
    },
    methods: {
        numberChange() {
            // 把父组件传过来的商品id和商品数量作为一个对象,传给vuex中的updataNumber来修改全局数据shopCar的值
            let number = this.$refs.numberBox.value
            let goodsInfo = {id:this.goodsID,number:number}
            this.$store.commit("updataNumber",goodsInfo)
        }
    },
    props:['initCount','goodsID']
}
</script>
<style lang="less" scoped>
</style>