<template>
    <div style="padding:16px">
        <!-- 加载子组件中的评论组件 -->
        <comment :fatherID='id'></comment>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="less" scoped>
    
</style>