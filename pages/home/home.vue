/* 首页 */
<template>
    <view class="page">
        <navbar-city></navbar-city>
        <view class="content" v-if="classifyList.length > 0">
            <scroll-view scroll-y style="height: 100%; width: 100%">
                <view class="list">
                    <view class="list-item" v-for="(item, index) in classifyList" :key="index" @click="toItem(item)">
                        <view class="list-item-header flex">
                            <view class="list-item-name">{{ item.name }}</view>
                        </view>
                        <view class="flex justifyBeteen">
                            <view class="list-item-status"
                                >当前设备正常{{ item.status }}
                                <u-icon name="checkmark-circle" color="#42b983"></u-icon>
                            </view>
                            <view class="list-item-time">剩余{{ item.time }}天</view>
                        </view>
                        <view class="flex justifyBeteen">
                            <view
                                >温度(℃) <text class="list-item-text">{{ item.wd }}</text>
                            </view>
                            <view
                                >湿度(%) <text class="list-item-text">{{ item.sd }}</text></view
                            >
                            <view
                                >光照(Lux) <text class="list-item-text">{{ item.gz }}</text></view
                            >
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <NoData :height="'50vh'" v-else />
        <u-icon class="add-btn" name="plus-circle-fill" color="#2979ff" size="100" @click="showActionSheet = true"></u-icon>
        <u-action-sheet :list="actionList" v-model="showActionSheet" @click="action"></u-action-sheet>
    </view>
</template>

<script>
    import NavbarCity from "../../components/navbar-city.vue";
    import { operaDevice } from "../../request/api.js";
    export default {
        components: { NavbarCity },
        data() {
            return {
                amapPlugin: "",
                showActionSheet: false,
                classifyList: [
                    {
                        wd: "32.6",
                        sd: "64.5",
                        gz: "9151",
                        number: "2551",
                        name: "王小二6号大棚",
                        time: "25",
                        status: "success",
                    },
                    {
                        wd: "32.6",
                        sd: "64.5",
                        gz: "9151",
                        number: "2551",
                        name: "王小二6号大棚",
                        time: "25",
                        status: "success",
                    },
                    {
                        wd: "32.6",
                        sd: "64.5",
                        gz: "9151",
                        number: "2551",
                        name: "王小二6号大棚",
                        time: "25",
                        status: "success",
                    },
                    {
                        wd: "32.6",
                        sd: "64.5",
                        gz: "9151",
                        number: "2551",
                        name: "王小二6号大棚",
                        time: "25",
                        status: "success",
                    },
                ],
                actionList: [
                    {
                        text: "扫码",
                        // color: "blue",
                        // fontSize: 28,
                        // subText: "感谢您的点赞",
                    },
                    {
                        text: "添加批量控制",
                    },
                ],
                show: false,
            };
        },
        onLoad() {
            // this.test();
            // let Authorization = uni.getStorageSync("Authorization");
            // console.log("Authorization   " + Authorization);
            // if ((Authorization = "")) {
            //     uni.navigateTo({
            //         url: "/pages/login/login",
            //     });
            // }
        },
        onPullDownRefresh() {
            console.log("refresh");
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        methods: {
            test() {
                let params = {
                    plcCode: 380,
                    open: 1,
                    deviceCode: 8,
                };
                operaDevice(params).then((res) => {
                    console.log(res);
                });
            },
            toItem() {
                uni.navigateTo({
                    url: "/pages/home/houseInfo",
                    animationType: "pop-in",
                    animationDuration: 200,
                });
            },
            scanCode() {
                uni.scanCode({
                    success: function (res) {
                        console.log("返回值：", res);
                    },
                });
            },
            action(index) {
                // this.actionList[index]
            },
        },
    };
</script>

<style lang="scss" scoped>
    .content {
        padding: 20rpx;
        .list {
            // background-color: #f3f4f6;
            .list-item {
                padding: 10rpx;
                background-color: #ffffff;
                border-radius: 20rpx;
                margin-bottom: 30rpx;
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
                border-color: #eee;
                > view {
                    height: 80rpx;
                    line-height: 80rpx;
                }
                .list-item-header {
                    // height: 80rpx;
                    // line-height: 80rpx;
                    border-bottom: 2rpx solid #eee;
                }
                &-name {
                    font-size: 32rpx;
                    font-weight: 700;
                }
                &-status {
                    font-size: 32rpx;
                }
                &-text {
                    color: $app-theme-points-yellow-color;
                    margin-left: 10rpx;
                    font-size: 32rpx;
                }
            }
        }
    }
    .add-btn {
        position: fixed;
        right: 50rpx;
        bottom: 160rpx;
        z-index: 99;
    }
    .add-btn::before {
        content: "";
        position: absolute;
        width: 80rpx;
        height: 80rpx;
        left: 10rpx;
        background-color: #ffffff;
        border-radius: 50%;
    }
</style>
