<template>
    <view class="commen-index ">
        <view class="commen-search">
            <u-search placeholder="搜索供应商/联系人" v-model="keyword" shape="round"></u-search>
        </view>
        <view class="commen-content">
            <scroll-view scroll-y style="height: 100%;width: 100%;">
                <view class="card-item" v-for="(item,index) in 3" :key="index">
                    <view class="card-item-title">河南中鑫通信有限公司</view>
                    <view class="card-item-topic">
                        <view class="topic-left">
                            <view class="topic-left-name">王小二</view>
                            <view class="topic-left-mail">outlook@163.com</view>
                        </view>
                        <view class="topic-right">16696660066</view>
                    </view>
                    <view class="card-item-content">
                        <view class="content-every">
                            <view class="content-every-left">在线客服总机</view>
                            <view class="content-every-right">0371-10101010</view>
                        </view>
                        <view class="content-every">
                            <view class="content-every-left">在线客服售前电话</view>
                            <view class="content-every-right">010-10101010</view>
                        </view>
                        <view class="content-every">
                            <view class="content-every-left">在线客服售前QQ</view>
                            <view class="content-every-right">10101010</view>
                        </view>
                        <view class="content-every">
                            <view class="content-every-left">在线客服售后电话</view>
                            <view class="content-every-right">2020-03-31</view>
                        </view>
                        <view class="content-every">
                            <view class="content-every-left">在线客服售后QQ</view>
                            <view class="content-every-right">20201212</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            keyword: ''

        };
    },
    components: {

    },
    watch: {

    },
    methods: {

    }
};
</script>

<style scoped lang="scss">
.card-item {
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    .card-item-title {
        line-height: 80rpx;
        padding: 0 30rpx;
        font-weight: 700;
        font-size: 30rpx;
        border-bottom: 2rpx solid #f3f4f6;
    }
    .card-item-topic {
        height: 100rpx;
        padding: 0 30rpx;
        border-bottom: 2rpx solid #f3f4f6;
        display: flex;
        .topic-left {
            width: 50%;
            padding-top: 10rpx;
            .topic-left-name {
                font-weight: 700;
                font-size: 30rpx;
            }
            .topic-left-mail {
                color: #9c9c9c;
            }
        }
        .topic-right {
            width: 50%;
            line-height: 100rpx;
            font-size: 30rpx;
            font-weight: 700;
            text-align: right;
        }
    }
    .card-item-content {
        padding: 20rpx 30rpx;
        .content-every {
            display: flex;
            view {
                width: 50%;
                line-height: 46rpx;
            }
            .content-every-left {
                color: #9c9c9c;
            }
            .content-every-right {
                text-align: right;
            }
        }
    }
}
</style>
