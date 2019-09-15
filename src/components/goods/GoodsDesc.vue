<template>
    <div>
        <h4 class="goodsDescTitle">{{desc.title}}</h4>
        <hr>
        <div v-html="desc.content" class="goodsDescContent"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            //商品的图文描述
            desc:''
        }
    },
    methods: {
        getDesc() {
            this.axios.get('/api/getGoodsDesc.json').then(res=>{
                if(res.data.status==0) {
                    let newData = res.data.message.find(val=>{
                        return val.id==this.id
                    })
                    this.desc = newData;
                }
            })
        }
    },
    created() {
        this.getDesc()
    }
}
</script>
<style lang="less">
.goodsDescTitle{
    font-size: 14px;
    padding:12px;
    color:rgb(35, 153, 199);
    text-align: center;
}
.goodsDescContent{
    p{  //清除图片之间的间距。因为有的图片是2张拼一张，放在了p标签里面连接处有空白间距
        margin:0;
    }
    img{
        // height:100%;
        width:100%;
        vertical-align:middle;
    }
}
</style>