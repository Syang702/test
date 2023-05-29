/* 首页 */
<template>
    <view class="page">
        <!-- 这里是状态栏 -->
        <!-- <view class="status_bar"> </view> -->
        <!-- 带城市、搜索框的导航栏 -->
        <navbar-city-search :cityListSelected="nowSelectedCity"></navbar-city-search>
        <view class="flex justifyEnd">
            <u-button type="primary" size="medium" class="mr-20" @click="scanCode">扫码添加</u-button>
            <u-button type="primary" size="medium" class="mr-20" @click="batchControl">添加批量控制</u-button>
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
    import amap from "@/utils/amap-wx.js"; //自己js的所在的位置
    export default {
        components: { NavbarCitySearch },
        data() {
            return {
                amapPlugin: "",
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
            const amapPlugin = new amap.AMapWX({
                key: "7cf1b0e5033710b3226a2d32dec22d6b",
            });
            var that = this;
            // var myAmapFun = new amap.AMapWX({ key: "你申请的高德key" });
            amapPlugin.getWeather({
                type: "forecast", //表示获取的是预报信息 默认live（实时天气）
                success: function (data) {
                    console.log(data);
                    //成功回调
                    var weatherarr = new Array(3);
                    for (var i = 0; i < 3; i++) {
                        weatherarr[i] = data.forecast.casts[i + 1]; //获取后三天预报信息 今日的不保存
                    }
                },
                fail: function (info) {
                    //失败回调
                    console.log(info);
                },
            });
        },
        methods: {
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
</style>
