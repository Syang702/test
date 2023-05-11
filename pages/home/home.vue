/* 首页 */
<template>
    <view class="page">
        <!-- 这里是状态栏 -->
        <!-- <view class="status_bar"> </view> -->
        <!-- 带城市、搜索框的导航栏 -->
        <navbar-city-search :cityListSelected="nowSelectedCity"></navbar-city-search>
        <view class="flex justifyEnd">
            <u-button type="primary" class="mr-10 scan-code" @click="scanCode">扫码</u-button>
            <u-button type="primary" class="mr-10" @click="batchControl">添加批量控制</u-button>
        </view>
        <view class="commen-content">
            <scroll-view scroll-y style="height: 100%; width: 100%">
                <view class="swiper">
                    <u-swiper :list="swiperList" name="IMAGE_URL" height="300" @click="ADtoHDZQ()"></u-swiper>
                </view>
                <view class="notice" @tap="toNotice">
                    <u-notice-bar mode="horizontal" :is-circular="true" :speed="100" :more-icon="true" :list="noticelist"></u-notice-bar>
                </view>
                <view class="list">
                    <view class="list-item" v-for="(value, key, index) in activityList" :key="index" @click="toHDZQ(key)">
                        <view class="list-item-header">
                            <view class="list-item-title">
                                <span>{{ key }}</span>
                                <text class="icon iconfont icon-test3"></text>
                            </view>
                        </view>
                        <view class="list-item-body">
                            <view class="list-item-body-evely" v-for="item in value" :key="item.LINE_ID">
                                <p>{{ item.CURRENT_PRICE }}</p>
                            </view>
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
                nowSelectedCity: "",
                // /////////////////////////
                keyword: "",
                urlValue: "",
                swiperList: [],
                noticelist: [],
                classifyList: [
                    {
                        image: "images/index/1.png",
                        name: "5G手机",
                        id: "3",
                    },
                    {
                        image: "images/index/2.png",
                        name: "个人智能",
                        id: "4",
                    },
                    {
                        image: "images/index/3.png",
                        name: "数字家庭",
                        id: "5",
                    },
                    {
                        image: "images/index/4.png",
                        name: "行业物联",
                        id: "6",
                    },
                    {
                        image: "images/index/5.png",
                        name: "生态合作",
                        id: "STHZ",
                    },
                    {
                        image: "images/index/6.png",
                        name: "活动专区",
                        id: "HDZQ",
                    },
                    {
                        image: "images/index/7.png",
                        name: "众筹预售",
                        id: "ZC",
                    },
                    {
                        image: "images/index/8.png",
                        name: "信用购",
                        id: "XYG",
                    },
                ],
                activityList: {},
                // BASE_IMG_URL: getApp().globalData.$BASE_IMG_URL,
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
        onShow() {
            // 处理是否手动选择了城市
            let nowSelectedCity = uni.getStorageSync("NOW_SELECTED_CITY");
            if (nowSelectedCity) {
                this.nowSelectedCity = nowSelectedCity;
                uni.clearStorageSync("NOW_SELECTED_CITY");
            }
            // this.$store.dispatch("setCarBadge");
        },
        methods: {
            getIndexInfos() {
                getIndexInfos().then((res) => {
                    //轮播
                    res.data.ADs.forEach((item) => {
                        item.IMAGE_URL = this.BASE_IMG_URL + item.IMAGE_URL;
                        let hrefStr = item.HREF;
                        if (hrefStr.indexOf("FLASHSALE_LIST_INIT") != -1 || hrefStr.indexOf("PROMOT_LIST_INIT") != -1) {
                            let paramStr = hrefStr.substr(hrefStr.indexOf("?") + 1);
                            let paramsArry = decodeURI(paramStr).split("&");
                            let paramsJson = {};
                            for (let i = 0; i < paramsArry.length; i++) {
                                let keyValue = paramsArry[i].split("=");
                                paramsJson[keyValue[0]] = keyValue[1];
                            }
                            item.blockName = paramsJson.blockName;
                            item.brandName = paramsJson.lineBlockName;
                            item.orderType = paramsJson.orderType;
                        } else {
                            item.blockName = "OTHERAD";
                            item.brandName = "OTHERAD";
                            item.orderType = "OTHERAD";
                        }
                        this.swiperList.push(item);
                    });
                    //公告
                    res.data.notifications.forEach((item) => {
                        this.noticelist.push(item.TITLE);
                    });
                    //活动
                    this.activityList = res.data.promotions.promotionGoods;
                    console.log(this.activityList);
                    Object.keys(this.activityList).forEach((key) => {
                        if (this.activityList[key].length == 0) {
                            this.$delete(this.activityList, key);
                        }
                    });
                });
            },
            toSearchPage() {
                uni.navigateTo({
                    url: "/pages/goods/goods-list-search?keyword=" + this.keyword,
                });
            },
            toHDZQ(key) {
                //商品列表到活动专区

                let arrayTemp = this.activityList[key];
                let blockName = key;
                let orderType = arrayTemp[0].ORDER_TYPE;
                var urlParam = "?blockName=" + blockName + "&brandName=all&fromAD=Y&orderType=" + orderType;
                uni.navigateTo({
                    url: "/pages/goods/goods-list-HDZQ" + urlParam,
                });
            },
            ADtoHDZQ(index) {
                //广告到活动专区
                let arrayTemp = this.swiperList[index];
                let blockName = arrayTemp.blockName;
                let brandName = arrayTemp.brandName;
                let orderType = arrayTemp.orderType;
                if ("OTHERAD" == blockName) {
                    return;
                }
                var urlParam = "?blockName=" + blockName + "&brandName=" + brandName + "&fromAD=Y&orderType=" + orderType;
                uni.navigateTo({
                    url: "/pages/goods/goods-list-HDZQ" + urlParam,
                });
            },
            // 商品列表&活动页
            toClassify(id) {
                if (id == "STHZ") {
                    //生态合作
                    this.urlValue = "/pages/goods/goods-list-ECO";
                } else if (id == "HDZQ") {
                    //活动专区
                    this.urlValue = "/pages/goods/goods-list-HDZQ?blockName=firstBlock";
                } else if (id == "ZC") {
                    //众筹预售
                    this.urlValue = "/pages/goods/goods-list-ZC";
                } else if (id == "XYG") {
                    //信用购
                    this.urlValue = "/pages/goods/goods-list-XYG";
                } else {
                    //手机 个人智能 数字家庭 行业物联
                    this.urlValue = "/pages/goods/goods-list-common?classify=" + id;
                }
                uni.navigateTo({
                    url: this.urlValue,
                    animationType: "pop-in",
                    animationDuration: 200,
                });
            },
            toNotice() {
                uni.navigateTo({
                    url: "/pages/my/notice",
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
    // .login {
    //     height: 100rpx;
    //     padding: 10rpx 20rpx;
    //     @include flex-center(flex-start, center);
    // }
    .commen-content {
        padding: 0 !important;
        .swiper {
            padding: 0 20rpx;
        }
        .notice {
            padding: 20rpx 20rpx;
        }
        .classify {
            display: flex;
            flex-wrap: wrap;
            .classify-every {
                width: 20%;
                height: 160rpx;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                image {
                    width: 100rpx;
                    height: 100rpx;
                }
                .classify-every-text {
                    width: 100%;
                    height: 60rpx;
                    line-height: 60rpx;
                    text-align: center;
                }
            }
        }
        .list {
            background-color: #f3f4f6;
            padding: 20rpx;
            .list-item {
                background: #ffffff;
                border-radius: 20rpx;
                margin-bottom: 20rpx;
                .list-item-header {
                    height: 70rpx;
                    line-height: 70rpx;
                    padding-left: 26rpx;
                    font-size: 34rpx;
                    font-weight: bold;
                    .iconfont {
                        font-size: 38rpx;
                    }
                }
                .list-item-body {
                    display: flex;
                    justify-content: space-between;
                    padding: 20rpx;
                    .list-item-body-evely {
                        width: calc(100% / 3);
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        image {
                            width: 220rpx;
                            height: 220rpx;
                        }
                        p {
                            font-size: 30rpx;
                            color: #f24444;
                            height: 80rpx;
                            line-height: 80rpx;
                        }
                    }
                }
            }
        }
    }
</style>
