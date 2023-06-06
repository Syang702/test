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
                    { paddingBottom: menuBotton + 'px' },
                ]"
            >
                <view class="loaction-slot">
                    <view class="loaction-title" v-if="locationStatus == 1"><text>正在获取地理位置</text></view>
                    <view class="loaction-title" v-if="locationStatus == 2">
                        <text>{{ cityListSelected ? cityListSelected : locationCity }}</text>
                        <u-icon style="margin-left: 8rpx" :size="18" color="#171717" name="arrow-down-fill"></u-icon>
                    </view>
                    <view class="loaction-title" v-if="locationStatus == 3" @click="getLocationAngin"><text>地理位置获取失败，点击重试</text></view>
                </view>
            </view>
        </view>
        <view class="slot-height" :style="{ height: navBarHeight + menuBotton + 'px' }"></view>
        <!-- <u-picker mode="region" ref="uPicker" v-model="showSelectArea" :area-code="['41', '4101', '410102']" @confirm="confirmArea" /> -->
    </view>
</template>

<script>
    import amap from "../utils/amap-wx.js";
    const app = getApp().globalData;
    export default {
        name: "navbar-city",
        data() {
            return {
                // 导航栏高度
                menuTop: app.menuTop,
                navBarHeight: app.navBarHeight,
                menuRight: app.menuRight,
                menuBotton: app.menuBotton,
                menuHeight: app.menuHeight,
                statusBarHeight: app.statusBarHeight,
                // 当前城市
                locationCity: "",
                // 获取地理位置状态，1正在获取，2获取成功，3失败
                locationStatus: 1,
                // showSelectArea: false,
                cityListSelected: "",
                amapPlugin: "",
            };
        },
        mounted() {
            // 组件没有 onLoad 函数
            this.amapPlugin = new amap.AMapWX({
                key: "7cf1b0e5033710b3226a2d32dec22d6b",
            });
            this.getLocation();
        },
        methods: {
            getLocation() {
                uni.getSetting({
                    success: (res) => {
                        if (res.authSetting["scope.userLocation"]) {
                            this.locationInfo();
                        } else {
                            uni.authorize({
                                scope: "scope.userLocation",
                                success: () => {
                                    this.locationInfo();
                                },
                                fail: () => {
                                    this.locationStatus = 3;
                                    uni.showToast({
                                        title: "位置权限获取失败",
                                        icon: "none",
                                    });
                                },
                            });
                        }
                    },
                });
            },
            locationInfo() {
                this.locationStatus = 1;
                this.amapPlugin.getRegeo({
                    success: (res) => {
                        this.locationStatus = 2;
                        let addressComponent = res[0].regeocodeData.addressComponent;
                        this.locationCity = addressComponent.province + "-" + addressComponent.city + "-" + addressComponent.district;
                        console.log("位置获取成功回调", res);
                    },
                    fail: (error) => {
                        this.locationStatus = 3;
                        uni.showToast({
                            title: "位置获取失败",
                            duration: 3000,
                            icon: "none",
                        });
                    },
                });
                this.amapPlugin.getWeather({
                    success(res) {
                        console.log("天气: ", res);
                    },
                    fail(error) {},
                });
            },
            // 获取地理位置
            getLocationAngin() {
                uni.openSetting({
                    success: (res) => {
                        if (res.authSetting["scope.userLocation"]) {
                            this.locationInfo();
                        }
                    },
                    fail: (error) => {
                        uni.showToast({
                            title: "位置权限获取失败",
                            duration: 3000,
                            icon: "none",
                        });
                    },
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .slot {
        width: 100vw;
        .navbar {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 888;
            overflow: hidden;
            .inner {
                width: 100%;
                height: 100%;
                background-color: $app-theme-bg-color;
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
            }
        }
    }
</style>
