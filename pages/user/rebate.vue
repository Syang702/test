<template>
    <view class="commen-index">
        <u-tabs :list="tabList" :is-scroll="false" :current="current" @change="changeTab"></u-tabs>
        <view class="commen-content">
            <view class="choose-time">
                <view class="current-time" @click="chooseDate">
                    <text class="number">3</text>
                    <text class="month">月</text>
                    <text class="icon iconfont icon-test2"></text>
                </view>
                <view class="bill">
                    <view>收入：￥1500.00</view>
                    <view class="bill-pay">支出：￥1500.00</view>
                </view>
            </view>
            <view class="rebate-list" v-if="current==0">
                <scroll-view scroll-y style="height: 100%;width: 100%;">
                    <view v-for="(item,index) in 3" :key="index" class="card-item">
                        <view class="card-item-title">
                            中国移动集团有限公司河南分公司
                        </view>
                        <view class="card-item-content">
                            <view class="content-every">
                                <view class="content-every-left">返利金额</view>
                                <view class="content-every-right">￥1500.00</view>
                            </view>
                            <view class="content-every">
                                <view class="content-every-left">已用金额</view>
                                <view class="content-every-right used">
                                    ￥1500.00
                                </view>
                            </view>
                            <view class="content-every">
                                <view class="content-every-left">发放日期</view>
                                <view class="content-every-right">2020-03-01</view>
                            </view>
                            <view class="content-every">
                                <view class="content-every-left">有效日期</view>
                                <view class="content-every-right">
                                    2020-03-01至2020-03-31
                                </view>
                            </view>
                            <view class="content-every">
                                <view class="content-every-left">来源订单</view>
                                <view class="content-every-right">
                                    PO-132-20201212-1112020
                                </view>
                            </view>
                            <view class="content-every">
                                <view class="content-every-left">返利备注</view>
                                <view class="content-every-right">
                                    退款订单自动生成返利：【PO-132-20201212-1112020】
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            tabList: [
                {
                    name: '全部',
                },
                {
                    name: '未使用'
                },
                {
                    name: '已使用'
                },
                {
                    name: '已过期',
                }
            ],
            current: 0,
            showTime: false,
        };
    },
    onLoad() {
    },
    computed: {
    },
    methods: {
        // tab栏切换
        changeTab(index) {
            this.current = index;
        },
        chooseDate() {
            uni.navigateTo({
                url: '/pages/my/choose-date',
                animationType: 'pop-in',
                animationDuration: 200
            });
        }
    }
};
</script>


<style lang="scss" scoped>
.choose-time {
    .current-time {
        // display: flex;
        .number {
            font-size: 40rpx;
            font-weight: 700;
            margin-right: 10rpx;
        }
        .icon {
            font-size: 26rpx;
            font-weight: 700;
        }
    }
    .bill {
        padding: 10rpx 10rpx;
        display: flex;
        // font-size: 24rpx;
        .bill-pay {
            margin-left: 30rpx;
        }
    }
}
.rebate-list {
    height: calc(100% - 110rpx);
    .card-item {
        background: #fff;
        border-radius: 20rpx;
        margin-bottom: 30rpx;
        .card-item-title {
            height: 80rpx;
            line-height: 80rpx;
            padding: 0 30rpx;
            font-weight: 700;
            font-size: 30rpx;
            border-bottom: 2rpx solid #f3f4f6;
        }
        .card-item-content {
            .content-every {
                display: flex;
                padding: 0 30rpx;
                .content-every-left {
                    width: 165rpx;
                    height: 50rpx;
                    line-height: 50rpx;
                    text-align: left;
                    color: #9c9c9c;
                }
                .content-every-right {
                    width: 485rpx;
                    line-height: 50rpx;
                    text-align: left;
                }
                .used {
                    color: #fb042c;
                }
            }
        }
    }
}
</style>
