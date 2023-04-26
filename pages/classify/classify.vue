/* 分类 */
<template>
    <view class="commen-index">
        <view class="commen-search">
            <u-search placeholder="搜索商品名称/品牌" v-model="keyword" shape="round"></u-search>
        </view>
        <view class="commen-content">
            <scroll-view scroll-y style="height: 100%" class="classify-scroll-left">
                <view
                    class="classify-scroll-left-list"
                    :class="{ current: currentIn == index }"
                    v-for="(item, index) in classAll"
                    :key="item.CAT_ID"
                    @tap="infoClassify(item.CAT_ID, index)"
                >
                    {{ item.CAT_NAME }}
                </view>
            </scroll-view>
            <scroll-view scroll-y style="height: 100%" class="classify-scroll-right">
                <view
                    class="classify-scroll-right-list"
                    v-for="(every, index) in goodsAll"
                    :key="every.CAT_ID"
                    @click="toDetail(every.PARENT_CAT_ID, every.CAT_ID)"
                >
                    <view class="right-list-top">{{ every.CAT_NAME }}</view>
                    <view class="right-list-bottom">{{ every.goodsCount }}款</view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import { getCategoryList, getRightSideCategoryList } from "../../config/api.js";
    export default {
        data() {
            return {
                keyword: "",
                classAll: [],
                currentIn: 0, //定义变量动态改变左侧style
                goodsAll: [],
            };
        },
        onLoad() {
            this.allClass();
        },
        onShow() {
            this.$store.dispatch("setCarBadge");
        },
        methods: {
            allClass() {
                //左侧所有分类
                getCategoryList().then((res) => {
                    this.classAll = res.data.cateInfo.cateList;
                    this.goodsAll = [];
                    res.data.cateInfo.subCateList.forEach((item) => {
                        if (item.goodsCount != 0) {
                            this.goodsAll.push(item);
                        }
                    });
                });
            },
            classGoods(id) {
                //分类下所有商品
                getRightSideCategoryList({ parentCategoryId: id }).then((res) => {
                    this.goodsAll = [];
                    res.data.cateInfo.forEach((item) => {
                        if (item.goodsCount != 0) {
                            this.goodsAll.push(item);
                        }
                    });
                });
            },
            infoClassify(id, index) {
                this.currentIn = index;
                this.classGoods(id);
            },
            toDetail(pId, id) {
                //去商品列表
                let params = {
                    pId,
                    id,
                };
                uni.navigateTo({
                    url: "/pages/goods/goods-list?params=" + JSON.stringify(params),
                    animationType: "pop-in",
                    animationDuration: 200,
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .commen-content {
        padding: 0 !important;
        display: flex;
        .classify-scroll-left {
            width: 22%;
            .classify-scroll-left-list {
                font-size: 28rpx;
                text-align: center;
                line-height: 110rpx;
                height: 110rpx;
                font-weight: 700;
            }
            .current {
                position: relative;
                background-color: #ffffff;
            }
            .current::before {
                position: absolute;
                content: "";
                width: 8rpx;
                height: 30rpx;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                background-color: #33acfb;
            }
        }
        .classify-scroll-right {
            width: 78%;
            padding-left: 20rpx;
            background: #ffffff;
            display: flex;
            flex-wrap: wrap;
            .classify-scroll-right-list {
                display: inline-block;
                padding: 20rpx;
                text-align: center;
                .right-list-top {
                    font-weight: 700;
                }
                .right-list-bottom {
                    color: #9c9c9c;
                }
            }
        }
    }
</style>
