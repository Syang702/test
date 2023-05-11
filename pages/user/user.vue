<template>
    <view class="user">
        <view class="user-info" @tap="toUser()">
            <view class="user-info-left">
                <image src="https://cdn.uviewui.com/uview/swiper/2.jpg"></image>
            </view>
            <view class="user-info-center">{{ userName }}</view>
            <view class="user-info-right">
                <u-icon name="arrow-right"></u-icon>
            </view>
        </view>
        <view class="user-tools">
            <!-- <view class="user-tools-title">个性服务</view> -->
            <!-- <view class="user-tools-content">
                <view class="user-tools-item" v-for="(item, index) in serviceList" :key="index" @tap="toService(item)">
                    <u-icon class="user-tools-item-icon" :name="item.icon" color="#333" size="28"></u-icon>
                    <view class="user-tools-item-text">{{ item.title }}</view>
                </view>
            </view> -->
            <u-cell-group>
                <u-cell-item
                    class="user-tools-item"
                    v-for="(item, index) in serviceList"
                    :key="index"
                    :icon="item.icon"
                    :title="item.title"
                    :isLink="true"
                    :url="item.url"
                    arrow-direction="right"
                ></u-cell-item>
            </u-cell-group>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                userList: {},
                userName: "",
                serviceList: [
                    {
                        icon: "rmb-circle",
                        title: "大鹏充值",
                        url: "/pages/user/coupon",
                    },
                    {
                        icon: "setting",
                        title: "审核管理",
                        url: "/pages/user/rebate",
                    },
                    {
                        icon: "rmb",
                        title: "充值记录",
                        url: "/pages/user/report",
                    },
                    {
                        icon: "edit-pen",
                        title: "问题反馈",
                        url: "/pages/user/notice",
                    },
                    {
                        icon: "file-text",
                        title: "操作日志",
                        url: "/pages/user/address",
                    },
                    {
                        icon: "list-dot",
                        title: "自动控制日志",
                        url: "/pages/user/service",
                    },
                    {
                        icon: "attach",
                        title: "自动批量开关",
                        url: "/pages/user/service",
                    },
                    {
                        icon: "man-add",
                        title: "管棚人管理",
                        url: "/pages/user/service",
                    },
                    {
                        icon: "star",
                        title: "气象站管理",
                        url: "/pages/user/service",
                    },
                    {
                        icon: "clock",
                        title: "水肥机管理",
                        url: "/pages/user/service",
                    },
                    {
                        icon: "order",
                        title: "设备自动功能",
                        url: "/pages/user/service",
                    },
                    {
                        icon: "info-circle",
                        title: "关于我们",
                        url: "/pages/user/service",
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
            // this.userName = uni.getStorageSync("userName");
        },
        onShow() {},
        methods: {
            toService(params) {
                uni.navigateTo({
                    url: "/pages/user/info",
                    animationType: "pop-in",
                    animationDuration: 200,
                });
            },
            // toService(id) {
            //     uni.navigateTo({
            //         url: "/pages/user/order?id=" + id,
            //     });
            // },
        },
    };
</script>

<style lang="scss" scoped>
    .user {
        width: 100%;
        .user-info {
            width: 100%;
            height: 188rpx;
            padding-bottom: 88rpx;
            background: #f1e7e7;
            display: flex;
            padding-left: 50rpx;
            .user-info-left {
                width: 100rpx;
                height: 100rpx;
                image {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .user-info-center {
                display: flex;
                flex: 1;
                align-items: center;
                padding-left: 50rpx;
            }
            .user-info-right {
                width: 80rpx;
                text-align: center;
                line-height: 100rpx;
            }
        }
        .user-tools {
            margin: 20rpx;
            border-radius: 20rpx;
            background: #ffffff;
            // .user-tools-title {
            //     padding: 0 20rpx;
            //     height: 95rpx;
            //     line-height: 94rpx;
            //     border-bottom: 1px solid #ebebeb;
            //     color: #0f0f0f;
            //     font-size: 32rpx;
            //     font-weight: 700;
            // }
            .user-tools-content {
                padding: 20rpx;
                // display: flex;
                // flex-wrap: wrap;
                .user-tools-item {
                    // &-icon {
                    // }
                    // &-text {
                    //     width: 100%;
                    //     height: 60rpx;
                    //     line-height: 60rpx;
                    //     color: #131313;
                    // }
                }
            }
            ::v-deep .u-cell {
                color: #0f0f0f;
                font-size: 32rpx;
                font-weight: 700;
            }
        }
    }
</style>
