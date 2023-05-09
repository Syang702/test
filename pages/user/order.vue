<template>
    <view class="content">
        <view class="wrap">
            <view class="u-tabs-box">
<!--                <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="tabChange" :is-scroll="false" swiperWidth="750">
                </u-tabs-swiper> -->
            </view>
            <swiper class="swiper-box" :current="swiperCurrent" @animationfinish="animationfinish">
                <swiper-item class="swiper-item" v-for="(j,_index) in list.length" :key="_index">
                    <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
                        <view class="commen-order-goods-box">
                            <view class="order" v-for="(res, index) in  orderList[_index]" :key="res.poHeaderId">
                                <view @click="orderDetail(res.poHeaderId)">
                                    <view class="top">
                                        <view class="left">
                                            <!-- <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon> -->
                                            <view class="store overflow-ellipsis">订单编号：{{ res.segment1 }}</view>
                                            <!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
                                        </view>
                                        <view class="right text-color-red">{{ res.authorizationStatusName }}</view>
                                    </view>
                                    <view class="item" v-for="(item, index) in res.goodsList" :key="index">
                                        <view class="item-left">
                                            <view class="left">
                                                <image :src="BASE_IMG_URL + item.imgUrl" mode="aspectFill"></image>
                                            </view>
                                            <view class="content">
                                                <view class="title u-line-2">{{ item.itemDescription }}</view>
                                                <view class="type">尺码/规格：{{ item.color }}</view>
                                                <view class="delivery-time">备注 {{ item.remark }}</view>
                                            </view>
                                        </view>
                                        <view class="right">
                                            <view class="price">
                                                ￥{{ item.unitPrice }}
                                            </view>
                                            <view class="number">x{{ item.quantity }}</view>
                                        </view>
                                    </view>
                                    <view class="total">
                                        共{{ res.quantitySum }}件商品 合计:
                                        <text class="total-price">
                                            ￥{{ res.realityPayAmount }}
                                        </text>
                                    </view>
                                </view>
                                <view class="bottom">
                                    <!-- <view class="more">
                                        <u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
                                    </view> -->
                                    <view class="evaluate btn" v-if="res.canCancle == 'Y'">取消订单</view>
                                    <view class="evaluate btn" v-if="res.canPay == 'Y'">去支付</view>
                                    <view class="evaluate btn" v-if="res.canConfirm == 'Y'">确认收货</view>
                                </view>
                            </view>
                            <!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
import { getOrderListByStatus } from '../../config/api.js'
export default {
    data() {
        return {
            BASE_IMG_URL: getApp().globalData.$BASE_IMG_URL,
            orderList: [[], [], [], [], [], []],
            queryList: {
                currPage: 0,
            },
            list: [
                {
                    name: '全部'
                },
                {
                    name: '待支付'
                },
                {
                    name: '待发货'
                },
                {
                    name: '待收货'
                },
                {
                    name: '已完成'
                },
                {
                    name: '已取消'
                }
            ],
            current: 0,
            swiperCurrent: 0,
            canLoadMore: true, // 判断下拉是否返回数据
        };
    },
    onLoad(e) {
        this.current = Number(e.id)
        this.filterHeaderStatus(Number(e.id))
        this.getOrderList();
        this.swiperCurrent = Number(e.id);
    },
    methods: {
        orderDetail(poHeaderId) {
            //订单详情页
            uni.navigateTo({
                url: "/pages/my/order-detail?poHeaderId=" + poHeaderId,
                animationType: 'pop-in',
                animationDuration: 200
            });
        },
        reachBottom() {
            // 下拉
            if (this.canLoadMore) {
                this.queryList.currPage = this.queryList.currPage + 1;
                this.getOrderList();
            }
        },
        // 页面数据
        getOrderList() {
            getOrderListByStatus(this.queryList).then(res => {
                var orderListTemp = [];
                this.canLoadMore = res.data.orderHeaderList.length > 0 ? true : false;
                res.data.orderHeaderList.forEach(header => {
                    let tempOrderJson = {};
                    tempOrderJson.poHeaderId = header.poHeaderId;
                    tempOrderJson.authorizationStatusName = header.authorizationStatusName;
                    tempOrderJson.segment1 = header.segment1;
                    tempOrderJson.quantitySum = header.quantitySum;
                    tempOrderJson.realityPayAmount = header.realityPayAmount;
                    tempOrderJson.canCancle = 'N';//是否可以取消订单
                    if (header.createdBy = header.currUserId && header.authorizationStatus == "INCOMPLETE") {
                        tempOrderJson.canCancle = 'Y';
                    }

                    let goodsListTemp = [];
                    header.orderLines.forEach(goodDetail => {
                        let goodJsonTemp = {};
                        goodJsonTemp.imgUrl = goodDetail.imgUrl;
                        goodJsonTemp.itemDescription = goodDetail.itemDescription;
                        goodJsonTemp.unitPrice = goodDetail.unitPrice;
                        goodJsonTemp.color = goodDetail.color;
                        goodJsonTemp.quantity = goodDetail.quantity;
                        goodJsonTemp.remark = goodDetail.remark;
                        goodsListTemp.push(goodJsonTemp);
                    })
                    let isBuyPhone = (header.createType == "2" || header.createType == "3" || header.createType == "4" || header.createType == "5"
                        || header.createType == "6" || header.createType == "7" || header.createType == "8" || header.createType == "9" ||
                        header.createType == "12" || header.createType == "13" || header.createType == "21" || header.createType == "22"
                        || header.createType == "23" || header.createType == "24" || header.createType == "25" || header.createType == "26"
                        || header.createType == "27" || header.createType == "28");

                    let canReceiveAndRefund = !(header.createType == "36" || header.createType == "37" || header.createType == "38"
                        || header.createType == "39" || header.createType == "40" || header.createType == "41" || header.createType == "42"
                        || header.createType == "43");
                    tempOrderJson.canPay = 'N';
                    if (header.authorizationStatus != "INCOMPLETE" && header.authorizationStatus != "CANCELLED"
                        && header.authorizationStatus != "RETURNED"
                        && header.realityPayAmount != "" && (header.onlinePayStatus != "交易成功")
                        && (header.bnakRemitNumber == "" || header.bnakRemitNumber == null) && header.offlinePay == "N"
                        && header.showPayBtn != "N"
                        && header.createdBy == header.currUserId) {
                        if ((canReceiveAndRefund && header.realityPayAmount != "0") || header.createType == "36") {
                            tempOrderJson.canPay = 'Y';//去支付
                        }
                    }
                    tempOrderJson.canConfirm = 'N';
                    if (header.authorizationStatus == "CONFIRM_PAYMENTED" && header.stockUpQtySum > 0 && header.quantityReceivedSum == 0
                        && canReceiveAndRefund && header.createdBy == header.currUserId) {
                        tempOrderJson.canConfirm = 'Y';//确认收货
                    }
                    if (header.authorizationStatus == "CONFIRM_PAYMENTED" && header.stockUpQtySum > 0
                        && header.quantityReceivedSum > 0 && header.quantityReceivedSum != header.quantitySum
                        && canReceiveAndRefund && header.createdBy == header.currUserId) {
                        tempOrderJson.canConfirm = 'Y';//确认收货
                    }
                    
                    tempOrderJson.goodsList = goodsListTemp;
                    orderListTemp.push(tempOrderJson);
                })
                let newArr = this.orderList[this.current].concat(orderListTemp)
                this.orderList.splice(this.current, 1, newArr)
            })
        },
        tabChange(index) {
            // tab栏切换   使swiper跟着切换
            this.swiperCurrent = index;
            this.queryList.currPage = 0;
            this.filterHeaderStatus(index)
            this.getOrderList();
        },
        animationfinish({ detail: { current } }) {
            // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
            // swiper滑动结束，分别设置tabs和swiper的状态
            this.$refs.tabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
            this.filterHeaderStatus(current)
            this.getOrderList();
        },
        filterHeaderStatus(a) {
            // 判断参数
            switch (a) {
                case 0:
                    this.queryList.headerStatus = 0
                    break;
                case 1:
                    this.queryList.headerStatus = 1
                    break;
                case 2:
                    this.queryList.headerStatus = 5
                    break;
                case 3:
                    this.queryList.headerStatus = 3
                    break;
                case 4:
                    this.queryList.headerStatus = 7
                    break;
                default:
                    this.queryList.headerStatus = 6
                    break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.commen-order-goods-box {
    padding: 20rpx;
    .order {
        margin-bottom: 20rpx;
        .top {
            .left {
                width: calc(100% - 100rpx);
                .store {
                    width: 100%;
                    font-size: 28rpx;
                    font-weight: normal;
                }
            }
        }
        .bottom {
            margin-top: 40rpx;
            padding: 0 10rpx;
            @include flex-center(flex-end, center);
            .evaluate {
                line-height: 52rpx;
                width: 160rpx;
                border-radius: 26rpx;
                font-size: 28rpx;
                text-align: center;
                color: #fff;
                background: linear-gradient(to right, #0084cf, #33acfb);
            }
        }
    }
}
.centre {
    text-align: center;
    margin: 200rpx auto;
    font-size: 32rpx;
    image {
        width: 164rpx;
        height: 164rpx;
        border-radius: 50%;
        margin-bottom: 20rpx;
    }
    .tips {
        font-size: 24rpx;
        color: #999999;
        margin-top: 20rpx;
    }
    .btn {
        margin: 80rpx auto;
        width: 200rpx;
        border-radius: 32rpx;
        line-height: 64rpx;
        color: #ffffff;
        font-size: 26rpx;
        background: linear-gradient(
            270deg,
            rgba(249, 116, 90, 1) 0%,
            rgba(255, 158, 1, 1) 100%
        );
    }
}
.wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--window-top));
    width: 100%;
}
.swiper-box {
    flex: 1;
}
.swiper-item {
    height: 100%;
}
</style>
