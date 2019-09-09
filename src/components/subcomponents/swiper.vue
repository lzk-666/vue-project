<template>
  <div>
    <!-- 轮播图子组件 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in lunboList" :key="index">
        <img :src="item" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:['lunboList']
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
</style>