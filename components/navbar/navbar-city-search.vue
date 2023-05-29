<template>
    <view class="slot">
        <view class="navbar" :style="[{ minHeight: navBarHeight + 'px' }]">
            <view
                class="inner"
                :style="[
                    { minHeight: menuHeight + 'px' },
                    { lineHeight: menuHeight + 'px' },
                    { paddingLeft: menuRight * 2 + 'px' },
                    { paddingRight: menuRight * 2 + 'px' },
                    { paddingTop: navBarHeight - menuHeight - menuTop + 'px' },
                    { paddingBottom: '20rpx' },
                ]"
            >
                <view class="loaction-slot">
                    <view class="loaction-title" v-if="locationStatus == 1"><text>正在获取地理位置...</text></view>
                    <!-- <view class="loaction-title" v-if="locationStatus == 2" @click="goCitySelectPage"> -->
                    <view class="loaction-title" v-if="locationStatus == 2" @click="showSelectArea = true">
                        <text>{{ cityListSelected ? cityListSelected : locationCity }}</text>
                        <u-icon style="margin-left: 8rpx" :size="18" color="#171717" name="arrow-down-fill"></u-icon>
                    </view>
                    <view class="loaction-title" v-if="locationStatus == 3" @click="getLocation(true)"><text>地理位置获取失败，点击重试</text></view>
                </view>
                <!-- <view class="search-slot" :style="{ paddingTop: menuTop + 'px' }" v-if="false">
                    <u-search
                        @click="goSearchPage"
                        disabled
                        :placeholder="placeholder"
                        :showAction="false"
                        shape="square"
                        borderRadius="0rpx"
                        bg-color="#F4F5F8"
                    ></u-search>
                </view> -->
            </view>
        </view>
        <view class="slot-height" :style="[{ height: menuHeight + navBarHeight - menuHeight - menuTop + 11 + 'px' }]"></view>
        <!-- <view class="slot-height" :style="[{ height: navBarHeight + menuHeight + menuTop + 11 + 'px' }]"></view> -->
        <u-picker mode="region" ref="uPicker" v-model="showSelectArea" :area-code="['41', '4101', '410102']" @confirm="confirmArea" />
    </view>
</template>

<script>
    import { getLocation, getLocationAgain } from "@/utils/location.js";
    //高德SDKjs
    import amap from "@/utils/amap-wx.js"; //自己js的所在的位置
    const app = getApp();
    export default {
        name: "navbar-city-search",
        props: {
            // 标题
            title: {
                type: String,
                default: "标题",
            },
            // 占位内容
            placeholder: {
                type: String,
                default: "请输入",
            },
            // 已经选择的城市
            // cityListSelected: {
            //     type: String,
            //     default: "",
            // },
        },
        data() {
            return {
                // 导航栏高度
                menuTop: app.globalData.menuTop,
                navBarHeight: app.globalData.navBarHeight,
                menuRight: app.globalData.menuRight,
                menuBotton: app.globalData.menuBotton,
                menuHeight: app.globalData.menuHeight,
                statusBarHeight: app.globalData.statusBarHeight,
                // 定位数据
                locationData: {},
                // 当前城市
                locationCity: "",
                // 获取地理位置状态，1正在获取，2获取成功，3失败
                locationStatus: 1,
                showSelectArea: false,
                cityListSelected: "",
                amapPlugin: "",
            };
        },
        mounted() {
            if (this.cityListSelected) {
                this.locationStatus = 2;
            } else {
                this.getLocation();
            }
            // console.log("menuTop", this.menuTop);
            // console.log("navBarHeight", this.navBarHeight);
            // console.log("menuRight", this.menuRight);
            // console.log("menuBotton", this.menuBotton);
            // console.log("menuHeight", this.menuHeight);
            // console.log("statusBarHeight", this.statusBarHeight);
        },
        onLoad() {
            // this.amapPlugin = new amap.AMapWX({
            //     key: "7cf1b0e5033710b3226a2d32dec22d6b",
            // });
        },
        methods: {
            // 跳转城市选择页面
            // goCitySelectPage() {
            //     uni.navigateTo({
            //         url: "/pages/home/city-list?nowCity=" + this.locationCity,
            //     });
            // },
            // 去搜索页面
            // goSearchPage() {
            //     uni.navigateTo({
            //         url: "/pages/search",
            //     });
            // },
            // 获取地理位置
            async getLocation(isAgain = false) {
                this.locationStatus = 1;
                if (!isAgain) {
                    getLocation((res) => {
                        this.setLocationData(res);
                    });
                } else {
                    getLocationAgain((res) => {
                        this.setLocationData(res);
                    });
                }
            },
            // 设置定位数据
            setLocationData(res) {
                //'adcode'
                if (res.status) {
                    this.locationStatus = 2;
                    this.locationData = res.data;
                    this.locationCity = res.data.ad_info.province + "-" + res.data.ad_info.city + "-" + res.data.ad_info.district;
                    this.$store.commit("user/COMMIT_LOACTION_INFO", res.data);
                } else {
                    this.locationStatus = 3;
                    uni.showToast({
                        title: "获取地理位置失败",
                        duration: 3000,
                        icon: "none",
                    });
                }
            },
            confirmArea(result) {
                this.cityListSelected = result.province.label + "-" + result.city.label + "-" + result.area.label;
                uni.setStorageSync("NOW_SELECTED_CITY", result);
            },
            getRegeo() {
                const that = this;
                uni.showLoading({
                    title: "获取信息中",
                });
                this.amapPlugin.getRegeo({
                    success(data) {
                        that.loc = data[0].name;
                        uni.hideLoading();
                    },
                    fail(err) {
                        //不加此字段控制台会报错
                        console.log("fail");
                    },
                });
                this.amapPlugin.getWeather({
                    success(res) {
                        console.log("liubbc weather: ", res);
                        that.imgList[4].name = res.humidity.data;
                        that.temperature = res.temperature.data;
                        that.weather = res.weather.data;
                        that.imgList[1].name = res.windpower.data;
                        that.time = res.liveData.reporttime;
                    },
                    fail(err) {
                        console.log("fail");
                    },
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .slot {
        width: 100vw;
    }
    .navbar {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 899;
        overflow: hidden;
    }

    .inner {
        width: 100%;
        height: 100%;
        background-color: $app-theme-bg-color;
    }

    .loaction-slot {
        display: flex;
        align-items: center;
        .loaction-title {
            display: flex;
            align-items: center;
            text {
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: $app-theme-text-black-color;
            }
        }
    }
    .search-slot {
    }
</style>
