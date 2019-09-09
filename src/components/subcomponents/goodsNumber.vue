<template>
        <!-- 商品数量子组件 -->
        <div class="goodsNumber">
            购买数量:
            <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
        </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.goodsNumber{
    margin-bottom:10px;

}
</style>