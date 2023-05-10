/* 商品列表页 */
<template>
    <view class="commen-index">
        <view class="top">
            <u-dropdown class="dropdown" ref="dropDown">
                <u-dropdown-item :title="item.title" v-model="item.value" v-for="(item,index) in dropList" :key="item.id">
                    <view class="slot-content">
                        <view class="item-box">
                            <view class="every" :class="[every.active ? 'active' : '']" v-for="(every, j) in item.arr" @click="dropTagClick(index,j)" :key="j">
                                {{every.label}}
                            </view>
                        </view>
                    </view>
                </u-dropdown-item>
            </u-dropdown>
            <view class="sort-nav">
                <view v-for="(item,index) in navList" :key="index" class="sort-nav-item" :class="[currentTag == index?'active':'']"
                      @click="navClick(item,index)">
                    <text :style="{color:item.title=='仅看有货'&&item.showicon==true?'#303133':'transparent'}" class="icon iconfont icon-benefits"></text>
                    {{item.title}}
                    <text class="icon-sort-type">
                        <text v-if="item.title=='价格'" class="icon iconfont icon-test" :class="{'is-active':item.priceSort,'not-active':!item.priceSort}"></text>
                        <text v-if="item.title=='价格'" class="icon iconfont icon-test2"
                              :class="{'is-active':!item.priceSort&&currentTag == index,'not-active':item.priceSort}"></text>
                    </text>
                    <u-icon v-if="item.title==''" :name="showSingle == true?'list':'grid'" style="padding-right:20rpx"></u-icon>
                </view>
            </view>
        </view>
        <view class="commen-content">
            <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="lower">
                <view :class="[showSingle==true?'product-list-single':'product-list-double']">
                    <view class="product-item" v-for="(item,index) in goodsList" :key="index" @click="toDetail(item)">
                        <view class="item-left">
                            <image :src="BASE_IMG_URL+item.IMAGE_URL" />
                            <view class="sell-out" v-if="item.sale_control_content != ''">
                                <view class="sell-out-tip">{{item.sale_control_content}}</view>
                            </view>
                        </view>
                        <view class="item-right">
                            <view class="title">{{item.ITEM_NAME}}</view>
                            <view class="topic" v-if="showSingle==true">{{}}</view>
                            <view class="price">
                                <text class="symbol">￥</text>
                                <text class="price">{{item.CURRENT_PRICE}}</text>
                                <text class="old">￥{{item.MIN_PRICE}}</text>
                            </view>
                            <view class="activity-area" v-if="item.DISPLAY_NAME !=''">
                                <u-tag :text="item.DISPLAY_NAME" type="error" shape="circle" />
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import { getCommonGoodsList } from '../../config/api.js'
export default {
    data() {
        return {
            // BASE_IMG_URL: getApp().globalData.$BASE_IMG_URL,
            keyword: '',
			refreshBrand: true,
            queryList: { //请求接口传的参数
            },
            dropList: [
                {
                    title: '专区',
                    id: 1,
                    value: '',
                    arr: [
                        { label: '智能家居', active: true },
                        { label: '智教影音', active: false },
                        { label: '智能穿戴', active: false },
                        { label: '科技潮品', active: false },
                        { label: '生活健康', active: false },
                        { label: '手机周边', active: false },
                    ],
                },
                {
                    title: '品牌',
                    id: 2,
                    value: '',
                    arr: [
                    ],
                }
            ],
            navList: [
                { title: '综合', sortType: 'default' },
                { title: '最新', sortType: 'lastest' },
                { title: '价格', priceSort: false, priceDown: false, sortType1: 'priceAsc', sortType2: 'priceDesc' },
                { title: '' },
            ],
            currentTag: 0,
            showSingle: false,//单行显示
            goodsList: [],
			canLoadMore:true,//是否可以继续下拉加载，如果已经展示所有的则不能继续下来加载
        };
    },
    components: {},
    onLoad(e) {
        this.queryList.cateType2 = '7';
        this.queryList.brandName = 'all';
        this.queryList.sortType = 'default';  // 排序类型
        this.queryList.orderTypes = '5';
        this.queryList.pageNum = 0;
        this.queryList.lastIndex = 0;
		this.dropList[0].title = '智能家居';
        this.getGoodsList()
    },
    watch: {

    },
    methods: {
        getGoodsList() {
            getCommonGoodsList(this.queryList).then(res => {
				this.fillBrand( res.data.goodsInfo.brandList);
                var tempGoodsList = []
				this.queryList.lastIndex = res.data.goodsInfo.lastIndex
				if(parseInt(this.queryList.lastIndex)<parseInt(res.data.goodsInfo.totalNum)){
					this.canLoadMore=true;
				}else{
					this.canLoadMore=false;
				}
                res.data.goodsInfo.goodsList.forEach(item => {
                    var saleControl = "";
                    var date1 = new Date();    //当前时间
                    var promoteStartDataT = "";//开始时间
                    var promoteEndDateT = "";//结束时间
                    if (item.PROMOTE_START_DATE != undefined) {
                        promoteEndDateT = new Date(item.PROMOTE_END_DATE);
                    }
                    if (item.PROMOTE_START_DATE != undefined) {
                        promoteStartDataT = new Date(item.PROMOTE_START_DATE);
                    }

                    if (promoteStartDataT != "" && date1 < promoteStartDataT) {
                        saleControl = "活动未开始";
                    } else if (promoteEndDateT != "" && date1 > promoteEndDateT) {
                        saleControl = "活动已结束";
                    } else if (item.SALE_CONTROL != undefined && item.SALE_CONTROL.trim() != "") {
                        saleControl = item.SALE_CONTROL.trim();
                    } else if (item.QTY == null || item.QTY <= 0) {
                        saleControl = "已售罄";
                    }
                    item.sale_control_content = saleControl;

                    var minPrice = item.MIN_PRICE;
                    var currentPrice = item.CURRENT_PRICE;
                    var blockNameCode = item.DISPLAY_NAME;
                    if (blockNameCode != undefined) {
                        if ("XYG" == blockNameCode) {
                            if (minPrice == undefined) {
                                minPrice = item.CURRENT_PRICE;
                            }
                            currentPrice = minPrice;
                        }
                    } else {
                        minPrice = item.CURRENT_PRICE;
                        var retailPrice = item.RETAIL_PRICE;
                        if (retailPrice != undefined) {
                            if (retailPrice.indexOf("￥") > -1) {
                                currentPrice = retailPrice.substring(retailPrice.indexOf("￥") + 1);
                            } else {
                                currentPrice = retailPrice;
                            }
                        } else {
                            currentPrice = minPrice;
                        }
                    }
                    item.MIN_PRICE = minPrice;
                    item.CURRENT_PRICE = currentPrice;

                    var dispalyName = item.DISPLAY_NAME
                    if (dispalyName == undefined) {
                        dispalyName = "";
                    } else if (dispalyName == 'XYG') {
                        dispalyName = "信用购";
                    } else if ("ZCYS" == dispalyName) {
                        dispalyName = "众筹预售";
                    } else if ("ZCTH" == dispalyName) {
                        dispalyName = "众筹提货";
                    } else if ("HDZQ" == dispalyName) {
                        dispalyName = "活动专区";
                    }
                    item.DISPLAY_NAME = dispalyName

                    tempGoodsList.push(item)
                })
                this.goodsList = tempGoodsList;
            })
        },
        dropTagClick(i, j) { // 下拉点击
            this.dropList[i].arr.forEach(item => {
                item.active = false
            });
            this.dropList[i].arr[j].active = !this.dropList[i].arr[j].active
            this.$refs.dropDown.close();
            this.dropList[i].title = this.dropList[i].arr[j].label
			if(i == '0'){
				let blockName = this.dropList[i].arr[j].label.trim();
				if("智能家居"==blockName){
					this.queryList.cateType2= "7";
				}else if("智教影音"==blockName){
					this.queryList.cateType2 = "8";
				}else if("智能穿戴"==blockName){
				    this.queryList.cateType2 = "9";
				}else if("科技潮品"==blockName){
				    this.queryList.cateType2 = "10";
				}else if("生活健康"==blockName){
				    this.queryList.cateType2 = "11";
				}else if("手机周边"==blockName){
				    this.queryList.cateType2 = "12";
				}
				                      
				this.queryList.brandName="all";
				this.refreshBrand = true;
			}else if(i == '1'){
				this.queryList.brandName=this.dropList[i].arr[j].label.trim();
				this.refreshBrand = false;
			}
			this.queryList.pageNum = "0";  
			this.queryList.lastIndex = "0";
			this.getGoodsList();
        },
		fillBrand(brandList){
			if(this.refreshBrand){
				this.dropList[1].arr = [];
				for(var i=0;i<brandList.length;i++){
					let brandInfoJson = {}
					brandInfoJson.active = false;
					brandInfoJson.label = brandList[i];
					this.dropList[1].arr.push(brandInfoJson);
				}
			}
			
		},
        navClick(item, index) {  // 排序标签切换
		    this.queryList.pageNum = "0";
		    this.queryList.lastIndex = "0";
            switch (item.title) {
                case '价格':
                    this.currentTag = index
                    console.log(item.priceSort)
                    item.priceSort = !item.priceSort
                    this.queryList.sortType = item.priceSort == false ? item.sortType1 : item.sortType2
                    this.getGoodsList()
                    break;
                case '仅看有货':
                    item.showicon = !item.showicon
                    this.queryList.sortType = item.sortType
                    this.getGoodsList()
                    break;
                case '':
                    this.showSingle = !this.showSingle
                    break;
                default:
                    this.currentTag = index
                    this.navList.find(i => {
                        if (i.title == '价格') {
                            i.priceSort = false
                        }
                    })
                    this.queryList.sortType = item.sortType
                    this.getGoodsList()
                    break;
            }
        },
        toDetail(param) {
            // 商品详情
            var blockNameCode = param.DISPLAY_NAME;
            var vendorId = "vendorId=" + param.VENDOR_ID;
            var orderType = "&orderType=" + param.ORDER_TYPE;
            var vendorType = "&vendorType=" + param.VENDOR_TYPE;
            var createType = "&createType=" + param.CREATE_TYPE;
            var itemId = "&itemId=" + param.ITEM_ID;
            var minPrice = "&oldPrice=" + param.MIN_PRICE;
            var currentPrice = "&price=" + param.CURRENT_PRICE;
            if ("1" == param.ORDER_TYPE) {
                vendorType = "&vendorType=" + "1";
            }

            var promotionId = "";
            if (blockNameCode != undefined) {
                promotionId = "&headerId=" + param.HEADER_ID + "&lineId=" + param.LINE_ID;
            }

            var productDetailPageParam = vendorId + orderType + vendorType + createType + itemId + currentPrice + minPrice + promotionId;
            uni.navigateTo({
                url: '/pages/goods/goods-detail?' + productDetailPageParam,
                animationType: 'pop-in',
                animationDuration: 200
            });
        },
        lower(e) {
			if(this.canLoadMore){
				this.queryList.pageNum++
				this.getGoodsList()
			}
        }
    }
};
</script>

<style scoped lang="scss">
.top {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .slot-content {
        background-color: #ffffff;
        padding-bottom: 30rpx;
        .item-box {
            @include flex-center(flex-start, flex-start);
            flex-wrap: wrap;
            .every {
                background-color: #f3f4f6;
                border-radius: 20rpx;
                padding: 10rpx 20rpx;
                margin-left: 20rpx;
                margin-top: 20rpx;
                border: 1px solid transparent;
            }
            .active {
                border: 1px solid #33acfb;
                background-color: rgba(51, 172, 251, 0.3);
            }
        }
    }
    .sort-nav {
        @include flex-center(space-around, center);
        height: 88rpx;
        .sort-nav-item {
            .icon-sort-type {
                position: relative;
                width: 14rpx;
                .icon-test {
                    position: relative;
                    top: -5rpx;
                }
                .icon-test2 {
                    position: absolute;
                    top: 14rpx;
                    right: 0;
                }
            }
        }
        .active {
            color: #33acfb;
        }
        .is-active {
            color: #33acfb;
        }
        .not-active {
            color: #303133;
        }
    }
}
.commen-content {
    .product-item {
        position: relative;
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 10rpx;
        image {
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
        }
        .item-left {
            width: 270rpx;
            height: 270rpx;
            position: relative;
            .sell-out {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                @include flex-center(center, center);
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 10rpx;
                .sell-out-tip {
                    width: 190rpx;
                    height: 190rpx;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.5);
                    @include flex-center(center, center);
                    color: #bbb;
                }
            }
            .sell-activity {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: #fff;
                .sell-activity-name {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    font-size: 20rpx;
                    width: 160rpx;
                    height: 40rpx;
                    line-height: 40rpx;
                    text-align: center;
                }
                .sell-activity-price {
                    position: absolute;
                    left: 160rpx;
                    bottom: 0;
                    width: 110rpx;
                    height: 50rpx;
                    line-height: 50rpx;
                    font-size: 20rpx;
                    .price {
                        font-size: 28rpx;
                    }
                }
            }
        }
        .item-right {
            width: 400rpx;
            padding-left: 20rpx;
            .title {
                width: 100%;
                height: 80rpx;
                font-weight: 700;
                @include line-clamp(40rpx, 2);
            }
            .topic {
                line-height: 28rpx;
                height: 84rpx;
                margin-top: 5rpx;
                font-size: 25rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                white-space: normal;
                overflow: hidden;
                color: grey;
            }
            .price {
                margin-top: 5rpx;
                color: #f24444;
                .price {
                    font-size: 36rpx;
                    font-weight: 700;
                }
                .old {
                    color: grey;
                    margin-left: 10rpx;
                    text-decoration: line-through;
                    font-size: 26rpx;
                }
            }
            .activity-area {
                @include flex-center(space-between, center);
                .activity-remark {
                    font-size: 24rpx;
                    color: #9c9c9c;
                }
            }
        }
    }
    // 产品列表单行
    .product-list-single {
        .product-item {
            display: flex;
            padding: 20rpx;
        }
    }
    // 双列
    .product-list-double {
        @include flex-center(space-between, normal);
        flex-wrap: wrap;
        .product-item {
            @include flex-column;
            width: 340rpx;
            .item-left {
                width: 340rpx;
                height: 340rpx;
                .sell-activity {
                    .sell-activity-name {
                        width: 200rpx;
                        height: 50rpx;
                        line-height: 50rpx;
                    }
                    .sell-activity-price {
                        width: 140rpx;
                        left: 200rpx;
                        height: 60rpx;
                        line-height: 60rpx;
                        text-align: center;
                    }
                }
            }
            .item-right {
                width: 340rpx;
                padding: 20rpx;
            }
        }
    }
}
</style>
