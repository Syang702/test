/* 优惠券 */
<template>
    <view class="commen-index ">
        <u-tabs :list="tabList" :is-scroll="false" :current="current" @change="changeTab"></u-tabs>
        <view class="commen-content">
            <scroll-view scroll-y style="height: 100%;width: 100%;">
                <view class="commen-coupon-card-item" :style="{backgroundImage: current==0?'url('+bgImg+')':'url('+bgDisImg+')'}">
                    <view class="card-item-left">
                        <view class="card-price">
                            <span>￥</span><span class="card-price-off">50</span>
                        </view>
                        <view class="card-limit">满300可用</view>
                    </view>
                    <view class="card-item-right">
                        <view class="card-info">
                            <view class="card-name overflow-ellipsis">平台优惠专享券</view>
                            <view class="card-express">2020.01.01 - 2020.06.06</view>
                        </view>
                        <!-- <button class="btn btn-user bg-primary">去使用</button> -->
                        <i v-if="current==1" class="icon iconfont icon-yishiyong"></i>
                        <i v-if="current==2" class="icon iconfont icon-yiguoqi"></i>
                        <view class="card-bottom">仅限某某商家可用</view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            tabList: [
                {
                    name: '待使用',
                    count: 101,
                },
                {
                    name: '未使用',
                    count: 10,
                },
                {
                    name: '已过期',
                    count: 20,
                }
            ],
            cardList: [],
            current: 0,
            bgImg: 'http://10086b2b.com/h5/static/images/card/bg.png',
            bgDisImg: 'http://10086b2b.com/h5/static/images/card/bg-disabled.png',
        }
    },
    onLoad() {
    },
    methods: {
        // tab栏切换
        changeTab(index) {
            this.current = index;
        },
    },

};
</script>

<style lang="scss" scoped>
</style>
