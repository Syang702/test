/* 首页 */
<template>
    <view class="page">
        <Navbar title="大棚控制"></Navbar>
        <view class="flex justifyBeteen alignCenter header">
            <view class="title">{{ "王小二6号大棚" }}</view>
            <view class="signal">
                <u-icon name="wifi" color="#42b983"></u-icon>
                {{ "信号好" }}</view
            >
        </view>
        <view class="flex justifyEnd">
            <u-button type="primary" size="default" class="mr-20" @click="toSet">大棚设置</u-button>
            <u-button type="primary" size="default" class="mr-20" @click="toSet">卷帘设置</u-button>
            <u-button type="primary" size="default" class="mr-20" @click="toSet">风帘设置</u-button>
        </view>
        <view class="card-shadow">
            <view class="card-shadow-header">{{ "第一组温湿光" }}</view>
            <view class="flex justifyBeteen card-shadow-content">
                <view
                    >温度(℃) <text class="card-shadow-text">{{ "32.6" }}</text>
                </view>
                <view
                    >湿度(%) <text class="card-shadow-text">{{ "64.5" }}</text></view
                >
                <view
                    >光照(Lux) <text class="card-shadow-text">{{ "9151" }}</text></view
                >
            </view>
        </view>
        <view class="content">
            <scroll-view scroll-y style="height: 100%; width: 100%">
                <view class="list">
                    <view class="list-item" v-for="(item, index) in classifyList" :key="index" @click="toItem(item)">
                        <view class="list-item-header flex">
                            <view class="list-item-name">{{ item.name }}</view>
                            <view> <view class="list-item-text"></view>上限位 <view class="list-item-text"></view>下限位 </view>
                            <view> <view class="list-item-text"></view>修正位置 </view>
                        </view>
                        <view> 状态 </view>
                        <view> 进度 </view>
                        <view class="flex justifyBeteen">
                            <view class="list-item-status"
                                >全部卷起{{ item.status }}
                                <u-icon name="checkmark-circle" color="#42b983"></u-icon>
                            </view>
                            <view class="list-item-time">全部铺开</view>
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
                        name: "1#卷帘机",
                        type: "卷帘机",
                    },
                    {
                        name: "2#卷帘机",
                        type: "卷帘机",
                    },
                    {
                        name: "1#风帘",
                        type: "风帘",
                    },
                    {
                        name: "2#风帘",
                        type: "风帘",
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
            toSet() {
                // uni.navigateTo({
                //     url: "/pages/home/houseControl",
                //     animationType: "pop-in",
                //     animationDuration: 200,
                // });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .page {
        padding: 20rpx;
        .header {
            height: 80rpx;
            background-color: #ffffff;
            .title {
                font-weight: 700;
                font-size: 32rpx;
            }
            .signal {
            }
        }
    }
    .card-shadow {
        > view {
            height: 80rpx;
            line-height: 80rpx;
        }
        .card-shadow-header {
            font-size: 32rpx;
            font-weight: 700;
        }
        .card-shadow-text {
            color: $app-theme-points-yellow-color;
            margin-left: 10rpx;
            font-size: 32rpx;
        }
    }
    .content {
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
