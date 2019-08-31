<template>
    <div>
        <h4>发表评论</h4>
        <hr>
        <textarea maxlength="120" placeholder="我有话要说...(120个字以内)" v-model="postMsg"></textarea>
        <mt-button type="primary" size="large" class="postButton" @click="postComment">发表评论</mt-button>

        <div class="userComment" v-for="(item,index) in commentdata" :key="index">
            <div class="userComment-title">
                第{{index+1}}楼用户：<span>{{item.user_name}}</span>{{item.add_time | dateFormat}}
            </div>
            <div class="userComment-content">
                {{item.content==''||item.content=='undefine'?"该用户很懒啥都没说":item.content}}
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="addPage" v-if="flag">加载更多</mt-button>
    </div>
</template>
<script>
import {Button} from "mint-ui"
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageindex : 0,  // 评论页数
            commentdata:[], // 评论内容
            flag : true,    // 控制加载更多按钮显示/隐藏
            postMsg : '',   // 要添加的评论信息
        }
    },
    created(){
        this.getCommentData();
    },
    props:['fatherID'],// 获得父组件传过来的id
    methods: {
        // 获取评论信息
        getCommentData() {
            this.axios.get('api/getCommentData.json').then(res=>{
                this.pageindex++;
                let arr = res.data;
                let data = arr.find(val=>{
                     return val.id == this.fatherID
                })
                // 判断数据总数有没有超过一页没有的话隐藏加载更多按钮
                if(data.message.length<=10){
                    this.flag = false;
                }
                let newData = data.message.filter((val,index)=>{

                    return index<this.pageindex*10
                })
                this.commentdata = newData
            },err=>{
                Toast('加载评论失败...')
            })
        },
        //点击加载更多按钮,渲染下一页的评论
        addPage() {
            this.getCommentData()
        },
        // 提交评论
        postComment() {
            this.commentdata.unshift({add_time:new Date(),content:this.postMsg,user_name:"匿名用户"})
            this.postMsg = ''
        }
    }
}
</script>
<style lang="less" scoped>
    h4{
        padding-top: 20px;
        color:#FA536F;
    }
    textarea{
        height: 80px;
        font-size: 12px;
    }
    .userComment{
        .userComment-title {
            span {
                font-weight: bold;
                color:#FA536F;
                padding-right: 6rem;
            }
            background-color:rgb(199, 194, 194);
            font-size: 12px;
            padding: 2px;
        }
        .userComment-content {
            font-size: 12px;
            text-indent: 2em;
            padding: 10px 2px
        }
    }
    .postButton {
        margin-bottom:30px;
    }
    
</style>