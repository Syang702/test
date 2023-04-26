<template>
    <view class="my">
        <view class="my-info" @tap="toUser()">
            <view class="my-info-left">
                <image src="https://cdn.uviewui.com/uview/swiper/2.jpg"></image>
            </view>
            <view class="my-info-center">{{userName}}</view>
            <view class="my-info-right">
                <u-icon name="arrow-right"></u-icon>
            </view>
        </view>
        <view class="my-order">
            <view class="my-order-title">
                <view class="my-order-title-box" @tap="toOrder(0)">
                    <view class="my-order-title-box-left">
                        <text>我的订单</text>
                    </view>
                    <view class="my-order-title-box-right">
                        <text>全部订单</text>
                        <u-icon name="arrow-right" color="#c6c6c6" size="26"></u-icon>
                    </view>
                </view>
            </view>
            <view class="my-order-box">
                <view class="my-order-box-list" @tap="toOrder(1)">
                    <view class="my-order-box-list-top">
                        <i class="icon iconfont icon-daifukuan"></i>
                        <view class="order-num" v-show="orderState1.length > 0">{{
                            orderState1.length
                        }}</view>
                    </view>
                    <view class="my-order-box-list-bottom">待支付</view>
                </view>
                <view class="my-order-box-list" @tap="toOrder(2)">
                    <view class="my-order-box-list-top">
                        <i class="icon iconfont icon-daifahuo"></i>
                        <view class="order-num" v-show="orderState2.length > 0">{{
                            orderState2.length
                        }}</view>
                    </view>
                    <view class="my-order-box-list-bottom">待发货</view>
                </view>
                <view class="my-order-box-list" @tap="toOrder(3)">
                    <view class="my-order-box-list-top">
                        <i class="icon iconfont icon-daishouhuo"></i>
                        <view class="order-num" v-show="orderState3.length > 0">{{
                            orderState3.length
                        }}</view>
                    </view>
                    <view class="my-order-box-list-bottom">待收货</view>
                </view>
                <view class="my-order-box-list" @tap="toOrder(4)">
                    <view class="my-order-box-list-top">
                        <i class="icon iconfont icon-minus"></i>
                        <view class="order-num" v-show="orderState4.length > 0">{{
                            orderState4.length
                        }}</view>
                    </view>
                    <view class="my-order-box-list-bottom">已取消</view>
                </view>
                <view class="my-order-box-list">
                    <view class="my-order-box-list-top">
                        <i class="icon iconfont icon-tuikuantuihuo"></i>
                        <view class="order-num" v-show="orderState5.length > 0">{{
                            orderState5.length
                        }}</view>
                    </view>
                    <view class="my-order-box-list-bottom">退款/售后</view>
                </view>
            </view>
        </view>
        <view class="my-service" v-if="false">
            <view class="my-order-title">
                <view class="my-order-title-box">
                    <view class="my-order-title-box-left">
                        <text>个性服务</text>
                    </view>
                </view>
            </view>
            <view class="my-order-box">
                <view class="my-order-box-list" v-for="(item, index) in serviceList" :key="index" @tap="toService(item.url)">
                    <view class="my-order-box-list-top">
                        <image :src="item.img" mode="" />
                    </view>
                    <view class="my-order-box-list-bottom">{{ item.text }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            userList: {},
			userName:'',
            orderState1: 0,
            orderState2: 0,
            orderState3: 0,
            orderState4: 0,
            orderState5: 0,
            serviceList: [
                {
                    img: "http://10086b2b.com/h5/static/images/mine/card.png",
                    text: "我的卡券",
                    url: "/pages/my/coupon",
                },
                {
                    img: "http://10086b2b.com/h5/static/images/mine/fanli.png",
                    text: "我的返利",
                    url: "/pages/my/rebate",
                },
                {
                    img: "http://10086b2b.com/h5/static/images/report/report.png",
                    text: "进销存报表",
                    url: "/pages/my/report",
                },
                {
                    img: "http://10086b2b.com/h5/static/images/mine/message.png",
                    text: "消息中心",
                    url: "/pages/my/notice",
                },
                {
                    img: "http://10086b2b.com/h5/static/images/mine/address.png",
                    text: "地址管理",
                    url: "/pages/my/address",
                },
                {
                    img: "http://10086b2b.com/h5/static/images/mine/kefu.png",
                    text: "联系客服",
                    url: "/pages/my/service",
                },
            ],
        };
    },
    onLoad() {
        // let Authorization = uni.getStorageSync('Authorization')
        // console.log(Authorization)
        // if (Authorization == '') {
        //     uni.navigateTo({
        //         url: '/pages/login/login'
        //     })
        // }
		this.userName = uni.getStorageSync("userName");
    },
    onShow() {
        this.$store.dispatch("setCarBadge");
    },
    methods: {
        toUser() {
            uni.navigateTo({
                url: "/pages/my/info",
                animationType: "pop-in",
                animationDuration: 200,
            });
        },
        toOrder(id) {
            uni.navigateTo({
                url: "/pages/my/order?id=" + id,
            });
        },
        toService(url) {
            uni.navigateTo({
                url: url,
                animationType: "pop-in",
                animationDuration: 200,
            });
        },
    },
    onShow() {
        return;
        this.requestByToken("index/getHome", "get", {}).then((res) => {
            this.userList = res.data.data.userList;
            uni.setStorageSync("userInfo", res.data.data.userList);
            let orderState = res.data.data.orderNumber;
            this.orderState1 = orderState.filter((item) => {
                return item.order_states == 1;
            });
            this.orderState2 = orderState.filter((item) => {
                return item.order_states == 2;
            });
            this.orderState3 = orderState.filter((item) => {
                return item.order_states == 3;
            });
            this.orderState4 = orderState.filter((item) => {
                return item.order_states == 4;
            });
            this.orderState5 = orderState.filter((item) => {
                return item.order_states === 5 || item.order_states === 6;
            });
        });
    },
};
</script>

<style lang="scss" scoped>
.my {
    width: 100%;
    .my-info {
        width: 100%;
        height: 188rpx;
        padding-bottom: 88rpx;
        background: #f1e7e7;
        display: flex;
        padding-left: 50rpx;
        .my-info-left {
            width: 100rpx;
            height: 100rpx;
            image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .my-info-center {
            display: flex;
            flex: 1;
            align-items: center;
            padding-left: 50rpx;
        }
        .my-info-right {
            width: 80rpx;
            text-align: center;
            line-height: 100rpx;
        }
    }
    .my-order,
    .my-service {
        margin: 20rpx;
        border-radius: 20rpx;
        background: #ffffff;
        .my-order-title {
            padding: 0 20rpx;
            .my-order-title-box {
                height: 95rpx;
                line-height: 94rpx;
                border-bottom: 1px solid #ebebeb;
                display: flex;
                justify-content: space-between;
                .my-order-title-box-left text {
                    color: #0f0f0f;
                    font-size: 32rpx;
                    font-weight: 700;
                }
                .my-order-title-box-right text {
                    color: #c6c6c6;
                    font-size: 30rpx;
                }
            }
        }
        .my-order-box {
            padding: 20rpx;
            display: flex;
            flex-wrap: wrap;
            .my-order-box-list {
                width: 20%;
                text-align: center;
                .my-order-box-list-top {
                    width: 100%;
                    height: 60rpx;
                    position: relative;
                    i {
                        font-size: 56rpx;
                        font-weight: 700;
                    }
                    .order-num {
                        position: absolute;
                        right: 30rpx;
                        top: -20rpx;
                        width: 40rpx;
                        height: 40rpx;
                        line-height: 40rpx;
                        color: #fff;
                        font-size: 28rpx;
                        font-weight: 600;
                        border-radius: 50%;
                        background-color: red;
                    }
                }
                .my-order-box-list-bottom {
                    width: 100%;
                    height: 60rpx;
                    line-height: 60rpx;
                    color: #131313;
                    font-size: 26rpx;
                }
            }
        }
    }
    .my-service {
        .my-order-box {
            padding-bottom: 0;
            .my-order-box-list {
                width: 25%;
                height: 140rpx;
                image {
                    width: 60rpx;
                    height: 60rpx;
                }
            }
        }
    }
}
</style>
