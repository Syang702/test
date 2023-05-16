/* 首页 */
<template>
    <view class="page">
        <!-- 这里是状态栏 -->
        <!-- <view class="status_bar"> </view> -->
        <!-- 带城市、搜索框的导航栏 -->
        <navbar-city-search :cityListSelected="nowSelectedCity"></navbar-city-search>
        <view class="flex justifyEnd">
            <u-button type="primary" size="mini" class="mr-20" @click="scanCode">扫码添加</u-button>
            <u-button type="primary" size="mini" class="mr-20" @click="batchControl">添加批量控制</u-button>
        </view>
        <view class="content">
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
    </view>
</template>

<script>
    import NavbarCitySearch from "@/components/navbar/navbar-city-search.vue";

    export default {
        components: { NavbarCitySearch },
        data() {
            return {
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
                ],
            };
        },
        onLoad() {
            // let Authorization = uni.getStorageSync("Authorization");
            // console.log("Authorization   " + Authorization);
            // if ((Authorization = "")) {
            //     uni.navigateTo({
            //         url: "/pages/login/login",
            //     });
            // }
            // this.getIndexInfos();
        },
        methods: {
            toItem() {
                // uni.navigateTo({
                //     url: "/pages/user/info",
                //     animationType: "pop-in",
                //     animationDuration: 200,
                // });
            },
            scanCode() {
                uni.scanCode({
                    success: function (res) {
                        console.log("返回值：", res);
                    },
                });
            },
            batchControl() {},
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
                    font-size: 30rpx;
                }
                &-text {
                    color: $app-theme-points-yellow-color;
                    margin-left: 10rpx;
                }
            }
        }
    }
</style>
