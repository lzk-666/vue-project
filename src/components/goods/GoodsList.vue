<template>
    <div class="goodsBox">
        <div class="goodsItem" v-for="item in goodsList" :key="item.id" @click='toContent(item.id)'>
            <div class="goodsPicAndHead">
                <img :src=item.img_url alt="">
                <h4>{{item.title}}</h4>
            </div>

            <div class="goodsInfo">
                <div class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="before">￥{{item.market_price}}</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="addPage">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            goodsList:[],
            pageIndex:0
        }
    },
    methods:{
        //获取所有商品
        getGoodsList() {
            this.axios.get('api/getGoodsList.json').then(res=>{
                this.pageIndex++;
                let data = res.data.message;
                let newData = data.filter((val,index)=>{
                    return index<this.pageIndex*10
                })
                this.goodsList = newData;
            })
        },
        addPage() {
            this.pageIndex++,
            this.getGoodsList();
        },
        //点击商品跳转,根据相应id商品详情
        toContent(id) {
            this.$router.push('/home/goods/content/'+id);
        }
    },
    created() {
        this.getGoodsList();
    },
}
</script>
<style lang="less" scoped>
    .goodsBox {
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
        padding: 0 2%;
        .goodsItem {
            padding:1%;
            width:49%;
            margin-top: 2%;
            border: 1px solid #ccc;
            box-shadow:0px 0px 3px 0px #ccc;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            .goodsPicAndHead {
                display: flex;
                flex-direction: column;
                justify-content:space-between;
            }
            h4 {
                font-size:15px;
                overflow: hidden;
            }
            img {
                width:100%;
            }
            .goodsInfo{
                color:rgb(133, 132, 132);
                background-color:rgb(228, 224, 224);
                padding: 4%;
                .now {
                    color:red;
                    font-size: 22px;
                    padding-right: 4%
                }
                .before {
                    text-decoration: line-through;
                    font-size: 12px
                }
                .sell {
                    font-size:14px;
                    display:flex;
                    justify-content: space-between;
                    margin-top:4%;
                }
            }

        }

    }
</style>