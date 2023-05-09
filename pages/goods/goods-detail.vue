<template>
    <view class="goods-detail" :class="showParameter==true?'not-scroll':''">
        <!-- <view class="page-bg-gray"></view> -->
        <nav-bar type="transparentFixed" :scrollTop="scrollTop" transparentFixedFontColor="#FFF">
            <view slot="left">
                <!-- 左边 正常状态 -->
                <view class="header_left_info nav-bar-left" :class="{'header_btnMongol header_colorWhite_btnMongol':isShowHomeBtn}">
                    <view class="header_left_back header_btnMongol_left_back" @click="goBack">
                        <u-icon class="icon" name="arrow-left"></u-icon>
                    </view>
                    <text class="header_left_line" v-if="isShowHomeBtn"></text>
                    <view class="header_left_home header_btnMongol_left_home" v-if="isShowHomeBtn" @click="toHome">
                        <u-icon class="icon" name="home"></u-icon>
                    </view>
                </view>
            </view>
            <view slot="transparentFixedLeft">
                <!-- 左边 透明状态 -->
                <view class="header_left_info header_btnMongol header_colorWhite_btnMongol nav-bar-left nav-bar-left-transparent">
                    <view class="header_left_back header_btnMongol_left_back" @click="goBack">
                        <u-icon class="icon" name="arrow-left"></u-icon>
                    </view>
                    <text class="header_left_line" v-if="isShowHomeBtn"></text>
                    <view class="header_left_home header_btnMongol_left_home" v-if="isShowHomeBtn" @click="toHome">
                        <u-icon class="icon" name="home"></u-icon>
                    </view>
                </view>
            </view>
            <!-- 右边 正常状态 -->
            <!-- <view slot="right">
                <view class="nav-bar-right">
                    <u-icon class="icon" size="46" name="more-circle"></u-icon>
                </view>
            </view> -->
            <!-- 右边 透明状态 -->
            <!-- <view slot="transparentFixedRight">
                <view class="nav-bar-right nav-bar-right-transparent">
                    <u-icon class="icon" size="46" name="more-circle-fill"></u-icon>
                </view>
            </view> -->
            <view slot="default">
                <!-- 标题 正常状态 -->
                商品详情
            </view>
            <view slot="transparentFixed">
                <!-- 标题 透明状态 -->
            </view>
        </nav-bar>
        <view class="goods-content">
            <u-swiper :list="swiperList" height="750" indicator-pos="bottomRight"></u-swiper>
            <view class="goods-actity" v-if="timeShow">
                <view class="left">
                    <view>
                        <text class="price">
                            <text class="symbol">￥</text>{{price}}
                        </text>
                        <text class="price-old">￥{{oldPrice}}</text>
                    </view>
                    <view class="purchase-content">
                        <view>{{qgTypeName}}</view>
                        <view>{{userdQuantity}}</view>
                    </view>
                </view>
                <view class="right">
                    <view class="desc">{{activityDes}}</view>
                    <view class="left-time">
                        <u-count-down :timestamp="timestamp" separator="colon" font-size="28" separator-size="22" color="#fff" bg-color="#ff2b65"
                                      separator-color="#606266" @end="timeStampEnd">
                        </u-count-down>
                    </view>
                </view>
            </view>
            <view class="goods-desc">
                <view class="goods-price" v-if="normalOrderPrice">
                    <view class=" sell-price">
                        <text class="symbol">￥</text>
                        <text class="new-price font-bold">{{productActivityPrice}}</text>
                        <text class=" old-price">￥{{productActivityPriceOld}}</text>
                    </view>
                    <u-tag :text="blockName" type="error" shape="circle" size="mini" v-if="blockShow" />
                </view>
                <view class="goods-title font-bold">{{ itemName }}</view>
                <view class="goods-topic">{{ itemComment }}</view>
            </view>
            <u-gap height="20"></u-gap>
            <view class="description">
                <view class="description-item">
                    <view class="title">机型</view>
                    <view class="center">{{segment1}}</view>
                </view>
                <view class="description-item">
                    <view class="title">平台</view>
                    <view class="center">{{ vendorName }}</view>
                </view>
                <view class="description-item">
                    <view class="title">配送</view>
                    <view class="center">{{ vendorConfig }}</view>
                </view>
                <view class="description-item">
                    <view class="title">收款</view>
                    <view class="center">{{ payPlantforms }}</view>
                </view>
            </view>
            <u-gap height="20"></u-gap>
            <view class="goods-sku">
                <view class="sku-stock sku-item">
                    <view class="title">库存</view>
                    <view class="right">
                        <view class="stock-item" v-for="(item,index) in stockList" :key="item.id" :class="[currentstock==index?'active':'']"
                              @click="adjustPrice(item,index)">
                            <text>{{item.color}}</text>
                            <text>{{item.qty}}</text>
                        </view>
                    </view>
                </view>
                <view class="sku-num sku-item">
                    <view class="title">数量</view>
                    <view class="right">
                        <u-number-box v-model="goodsValue" @change="adjustPrice()" :min="1">
                        </u-number-box>
                    </view>
                </view>
                <view class="sku-num sku-item" v-if="limitShow">
                    <view class="title">限制</view>
                    <view class="center">{{limitSpan}}</view>
                </view>
                <view class="sku-price sku-item">
                    <view class="title">价格</view>
                    <view class="right">
                        <view class="product-price-desc" v-if="priceShow">
                            <view class="product-price-desc-title bg-graylight">
                                <text>购买量(台)</text>
                                <text>价格(元)</text>
                            </view>
                            <view class="product-price-desc-content" v-for="(item,index) in pricesList" :key="index">
                                <text> >={{item.qtyStart}}，<={{item.qtyEnd}} </text>
                                        <view>￥<text class="product-price-desc-content-price">{{item.price}}</text>/台
                                        </view>
                            </view>
                        </view>
                        <view class="product-price-info">
                            共<text class="product-price-count">{{productPriceCount}}</text>台，单价<text
                                  class="product-price-one">{{productPriceOne}}</text>元，合计<text class="product-price-total">{{productPriceTotal}}
                            </text>元
                        </view>
                    </view>
                </view>
            </view>
            <u-gap height="20"></u-gap>
            <view class="description">
                <view class="description-item" v-for="item in goodInfo" :key="item.id">
                    <view class="title">{{item.title}}</view>
                    <view class="center">{{item.introduction}}</view>
                </view>
                <view class="btn">
                    <u-button shape="circle" @click="showParameter = true">查看全部参数</u-button>
                </view>
            </view>
            <u-divider bgColor="#f3f4f6" margin-bottom="30" margin-top="30">宝贝详情</u-divider>
            <view class="goods-detail-img">
                <u-image :src="item" v-for="(item, index) in imgList" :key="index" mode="widthFix">
                </u-image>
            </view>
            <u-gap height="120"></u-gap>
        </view>
        <view class="good-nav">
            <view class="good-nav-left">
                <u-grid :col="3">
                    <u-grid-item @click="gotoNavigation('home')">
                        <u-icon name="home" :size="40"></u-icon>
                        <view class="grid-text">首页</view>
                    </u-grid-item>
                    <u-grid-item @click="gotoNavigation('service')">
                        <u-icon name="server-fill" :size="40"></u-icon>
                        <view class="grid-text">客服</view>
                    </u-grid-item>
                    <u-grid-item @click="gotoNavigation('car')">
                        <u-badge :count="cartNum" :offset="[0, 10]" v-if="cartNumShow"></u-badge>
                        <u-icon name="shopping-cart" :size="40"></u-icon>
                        <view class="grid-text">购物车</view>
                    </u-grid-item>
                </u-grid>
            </view>
            <view class="good-nav-right">
                <view class="cart btn u-line-1" :class="[shopBtnDis ? 'disabled' : '']" @click="addShoppingCart" v-if="shopBtnShow">加入购物车</view>
                <view class="buy btn u-line-1" :class="[buyBtnDis ? 'disabled' : '']" @click="buyThroughMicroService" v-if="buyBtnShow">立即购买</view>
            </view>
        </view>
        <u-popup v-model="showParameter" mode="bottom" :closeable="true" height="80%">
            <view class="goods-parameter">
<!--                <u-cell-group>
                    <u-cell-item title="品牌" :value="data6.brandName==null?'':data6.brandName" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="型号" :value="data6.name==null?'':data6.name" :arrow="false"></u-cell-item>
                    <u-cell-item title="互联网名称或别名" :value="data6.ext59==null?'':data6.ext59" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="终端类型" :value="data6.typeId==null?'':data6.typeId" :arrow="false"></u-cell-item>
                    <u-cell-item title="上市时间" :value="data6.marketTime==null?'':data6.marketTime" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="智能机" :value="data6.g3==null?'':data6.g3" :arrow="false"></u-cell-item>
                    <u-cell-item title="手机操作系统" :value="data6.os==null?'':data6.os" :arrow="false"></u-cell-item>
                    <u-cell-item title="系统版本" :value="data6.osNote==null?'':data6.osNote" :arrow="false"></u-cell-item>
                    <u-cell-item title="手机操控方式" :value="data6.touchScreen==null?'':data6.touchScreen" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="机身材质" :value="data6.ext20==null?'':data6.ext20" :arrow="false"></u-cell-item>
                    <u-cell-item title="CPU型号" :value="data6.cpu==null?'':data6.cpu" :arrow="false"></u-cell-item>
                    <u-cell-item title="CPU频率" :value="data6.ext5==null?'':data6.ext5" :arrow="false"></u-cell-item>
                    <u-cell-item title="CPU核数" :value="data6.ext4==null?'':data6.ext4" :arrow="false"></u-cell-item>
                    <u-cell-item title="是否4G" :value="data6.ext16==null?'':data6.ext16" :arrow="false"></u-cell-item>
                    <u-cell-item title="颜色" :value="data6.colors==null?'':data6.colors" :arrow="false"></u-cell-item>
                    <u-cell-item title=" 产品等级" :value="data6.ext17==null?'':data6.ext17" :arrow="false"></u-cell-item>
                    <u-cell-item title="产品状态" :value="data6.ext18==null?'':data6.ext18" :arrow="false"></u-cell-item>
                    <u-cell-item title="电池容量mAH" :value="data6.ext6==null?'':data6.ext6" :arrow="false"></u-cell-item>
                    <u-cell-item title="电池是否可拆卸" :value="data6.ext19==null?'':data6.ext19" :arrow="false"></u-cell-item>
                    <u-cell-item title="网络制式" :value="data6.networkType==null?'':data6.networkType" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="国内是否屏蔽电信" :value="data6.ext23==null?'':data6.ext23" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="国内是否屏蔽联通3/4G网络" :value="data6.ext24==null?'':data6.ext24" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="双卡机类型" :value="data6.ext25==null?'':data6.ext25" :arrow="false"></u-cell-item>
                    <u-cell-item title="sim卡1类型" :value="data6.ext26==null?'':data6.ext26" :arrow="false"></u-cell-item>
                    <u-cell-item title="sim卡2类型" :value="data6.ext27==null?'':data6.ext27" :arrow="false"></u-cell-item>
                    <u-cell-item title="运行内存(MB/GB)" :value="data6.memory==null?'':data6.memory" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="机身内存(MB/GB)" :value="data6.ext8==null?'':data6.ext8" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="最大可扩展内存(GB)" :value="data6.memoryExt==null?'':data6.memoryExt" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="可扩展内存卡种类" :value="data6.ext28==null?'':data6.ext28" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="显示屏尺寸" :value="data6.screenSize==null?'':data6.screenSize" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="屏幕分辨率" :value="data6.screenResolution==null?'':data6.screenResolution" :arrow="false"></u-cell-item>
                    <u-cell-item title="屏幕材质" :value="data6.screenMaterial==null?'':data6.screenMaterial" :arrow="false"></u-cell-item>
                    <u-cell-item title="屏幕特点" :value="data6.ext31==null?'':data6.ext31" :arrow="false"></u-cell-item>
                    <u-cell-item title="摄像头数量" :value="data6.ext34==null?'':data6.ext34" :arrow="false"></u-cell-item>
                    <u-cell-item title="主摄像头像素" :value="data6.backCameraPixes==null?'':data6.backCameraPixes" :arrow="false"></u-cell-item>
                    <u-cell-item title="副摄像头像素" :value="data6.frontCameraPixes==null?'':data6.frontCameraPixes" :arrow="false"></u-cell-item>
                    <u-cell-item title="闪光灯" :value="data6.flashLight==null?'':data6.flashLight" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="视频拍摄" :value="data6.videoShoot==null?'':data6.videoShoot" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="摄像头技术" :value="data6.ext35==null?'':data6.ext35" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持WiFi" :value="data6.ext3==null?'':data6.ext3" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持蓝牙" :value="data6.ext48==null?'':data6.ext48" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持NFC" :value="data6.ext53==null?'':data6.ext53" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持VoLTE" :value="data6.ext49==null?'':data6.ext49" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持CA" :value="data6.ext50==null?'':data6.ext50" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持GPS" :value="data6.ext51==null?'':data6.ext51" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持AGPS" :value="data6.ext52==null?'':data6.ext52" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持指纹识别" :value="data6.ext54==null?'':data6.ext54" :arrow="false"></u-cell-item>
                    <u-cell-item title="支持其它感应器" :value="data6.ext55==null?'':data6.ext55" :arrow="false"></u-cell-item>
                    <u-cell-item title="标配电池容量" :value="data6.ext6==null?'':data6.ext6" :arrow="false"></u-cell-item>
                    <u-cell-item title="重量" :value="data6.weight==null?'':data6.weight" :arrow="false"></u-cell-item>
                    <u-cell-item title="外形尺寸" :value="data6.terSize==null?'':data6.terSize" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="包装清单" :value="data6.accessories==null?'':data6.accessories" :arrow="false">
                    </u-cell-item>
                    <u-cell-item title="生产厂商" :value="data6.ext45==null?'':data6.ext45" :arrow="false"></u-cell-item>
                </u-cell-group> -->
            </view>
        </u-popup>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import {
    queryProduceDetail,
    getRetailPrice,
    getUserCrowdfundingDeliveryQty,
    getIsCanOrder,
    getDzChannelPlaceOrderControl,
    verifyItemQty,
    createOrder,
    addToShoppingCart,
    getShopingNum
} from '../../config/api.js'
import navBar from '../components/nav-bar.vue'
var detail = {};
var userInfo = {};
var minOrderQuantity = 1;
var maxQuantity = 111;
var priceColors = "";

var qgOrderType = '3,6,7'; //这些orderType展示“抢购价格”页面 3:抢购，6、组合营销，7、品牌专区
var zcYsOrderType = '4'; //这些orderType展示“抢购价格”页面 : 4：众筹预售，
var zcThOrderType = '5'; //这些orderType展示“抢购价格”页面 : 5、众筹提货，
var priceJson = [];
var orderType = '';
var coverImgUrl = '';
var promoteStartDate = "";
var promoteEndDate = "";
var saleControl = "";
var orderLimit = "";
var channelPlaceOrderControl = "";
var waterLevelReason = "";
var intoParam = {};

export default {
    data() {
        return {
            priceShow: false,
            timeShow: false,
            normalOrderPrice: false,
            limitShow: false,
            scrollTop: 0,
            timestamp: 0,
            cartNumShow: false,
            productActivityPrice: '',
            productActivityPriceOld: '',
            activityDes: '活动计时',
            swiperList: [],
            pricesList: [],
            goodInfo: [],
            cartNum: '',
            price: '',
            oldPrice: '',
            limitSpan: '',
            qgTypeName: '',
            retailPrice: '',
            userdQuantity: '',
            imgList: [],
            itemName: '',
            itemComment: '',
            blockShow: '',
            blockName: '',
            segment1: '',
            productPriceCount: '',
            productPriceOne: '',
            productPriceTotal: '',
            deliveryJson: '',
            data6: {},
            vendorName: '',
            vendorConfig: '',
            payPlantforms: '',
            stockList: [],
            goodsValue: 1,
            currentstock: 0,
            showParameter: false,
            priceHtml: '',
            popupStyle: {
                'paddingTop': '100rpx'
            },
            BASE_IMG_URL: getApp().globalData.$BASE_IMG_URL,
            selectedColor: '',
            selectedQty: '',
            selectedNum: 1,
            shopBtnShow: false,
            buyBtnShow: false,
            shopBtnDis: false,
            buyBtnDis: false,
        }
    },
    components: {
        navBar,
    },
    computed: {
        isShowHomeBtn() {
            return true;
        },
    },
    onLoad(parm) {
        this.getIsCanOrder(parm);
        this.getDzChannelPlaceOrderControlFun();

        intoParam = parm;
        orderType = parm.orderType;

        if (qgOrderType.indexOf(orderType) >= 0) {
            this.qgTypeName = "限时抢购";
        } else if (zcYsOrderType.indexOf(orderType) >= 0) {
            this.qgTypeName = "众筹预售";
        } else if (zcThOrderType.indexOf(orderType) >= 0) {
            this.qgTypeName = "众筹提货";
        }

        this.productActivityPrice = parm.price;
        this.productActivityPriceOld = parm.oldPrice;
        if (orderType != "" && (qgOrderType.indexOf(orderType) >= 0 || zcYsOrderType.indexOf(orderType) >= 0 ||
            zcThOrderType.indexOf(orderType) >= 0)) {
            this.timeShow = true;
        } else {
            this.normalOrderPrice = true;
        }
        this.queryProduceDetail(parm);
        this.getShopingNum();
    },

    methods: {
        goBack() { // 返回上一层
            uni.navigateBack({
                delta: 1
            })
        },
        toHome() { //首页
            uni.reLaunch({
                url: '/pages/home/home'
            })
        },
        timeStampEnd() { //倒计时结束触发

        },
        gotoNavigation(_type) {
            let url
            switch (_type) {
                case 'home':
                    url = '/pages/home/home'
                    uni.switchTab({
                        url: url,
                        animationType: 'pop-in',
                        animationDuration: 200
                    });
                    break;
                case 'service':
                    url = '/pages/my/service'
                    uni.navigateTo({
                        url: url,
                        animationType: 'pop-in',
                        animationDuration: 200
                    });
                    break;
                default:
                    url = '/pages/car/car'
                    uni.switchTab({
                        url: url,
                        animationType: 'pop-in',
                        animationDuration: 200
                    });
                    break;
            }
        },
        toast(msg) {
            uni.showToast({
                title: msg,
                icon: "none"
            });
        },
        toCar() { },
        toBuy() {
            uni.navigateTo({
                url: '/pages/goods/order-create',
                animationType: 'pop-in',
                animationDuration: 200
            });
        },
        queryProduceDetail(parm) {
            var data = {};
            data.createType = parm.orderType;
            data.itemId = parm.itemId;
            data.vendorId = parm.vendorId;
            data.vendorType = parm.vendorType;
            data.headerId = parm.headerId;
            data.lineId = parm.lineId;
            queryProduceDetail(data).then(res => {
                var code = res.code;
                var data = res.data;
                if (code == 0) {
                    userInfo = data.userInfo;
                    this.printDatas8(data.Datas8);
                    this.printDatas(data.Datas);
                    this.printDatas3(data.Datas3);
                    this.printDatas4(data.Datas4);
                    this.printDatas5(data.Datas5);
                    this.printDatas6(data.Datas6);

                    this.selectedColor = this.stockList[0].color;
                    this.selectedQty = this.stockList[0].qty == '' ? 9999999 + '台' : this.stockList[0].qty;

                    waterLevelReason = data.WaterLevelReason;
                    this.blockName = data.blockName;
                    if (this.blockName == null || this.blockName == "") {
                        this.blockShow = false;
                    } else {
                        this.blockShow = true;
                    }

                    this.adjustPrice();
                    if (orderType != '' && orderType != '1' && orderType != 'undefined') {
                        this.shopBtnShow = false;
                        this.buyBtnShow = true;
                    } else {
                        this.shopBtnShow = true;
                        this.buyBtnShow = true;
                    }
                    //如果是抢购都校验抢购时间
                    if (qgOrderType.indexOf(orderType) >= 0 || zcThOrderType.indexOf(orderType) >= 0 ||
                        zcYsOrderType.indexOf(orderType) >= 0) {
                        var date1 = new Date(); //开始时间
                        var promoteStartDataT = new Date(promoteStartDate); //开始时间
                        var promoteEndDateT = new Date(promoteEndDate); //开始时间
                        if (date1 < promoteStartDataT || date1 > promoteEndDateT) {
                            this.shopBtnDis = true;
                            this.buyBtnDis = true;
                        }
                    }
                } else {
                    this.$refs.uToast.show({
                        title: '请求失败,请稍后再试!',
                        type: 'error'
                    })
                    return
                }
            });
        },
        printDatas(jsonObj) {
            if (jsonObj == null || jsonObj == "undefined") {
                return;
            }
            var jsonStr = jsonObj[0];
            this.itemName = jsonStr['itemName'];
            this.segment1 = jsonStr['itemCode'];
            this.itemComment = jsonStr['phoneSellingPoint'];
            if (jsonStr['vendorConfigFlg'] == "1") {
                this.vendorConfig = "由移动集中配送，由供应商提供售后服务";
            } else {
                this.vendorConfig = "由供应商配送并提供售后服务";
            }
            this.payPlantforms = jsonStr["payPlantforms"];

            var colorList = "";
            if (orderType == "" || orderType == "undefined") {
                var numList = jsonStr["phoneColorsQty"].split(',');
                priceJson = JSON.parse(jsonStr['price']);
                priceJson.forEach(function(priceStr) {
                    priceColors = priceColors + ',' + priceStr.color
                });
                for (var i = 0; i < numList.length; i++) {
                    var color = numList[i].split('-')[0];
                    var kucun = numList[i].split('-')[1];
                    if (kucun > 0 && priceColors.indexOf(color) >= 0) {
                        var stock = {}
                        stock.color = color;
                        stock.qty = kucun + '台';
                        stock.id = i;
                        this.stockList[i] = stock;
                    }
                }
            } else if (qgOrderType.indexOf(orderType) == -1 && zcYsOrderType.indexOf(orderType) ==
                -1 && zcThOrderType.indexOf(orderType) == -1) {
                this.priceShow = true;
                if (jsonStr["phoneColorsQtyFlash"] != null && jsonStr["phoneColorsQtyFlash"].length > 0) {
                    var numList = jsonStr["phoneColorsQtyFlash"].split(',');
                    priceJson = JSON.parse(jsonStr['price']);
                    priceJson.forEach(function(priceStr) {
                        priceColors = priceColors + ',' + priceStr.color
                    });
                    for (var i = 0; i < numList.length; i++) {
                        var color = numList[i].split('-')[0];
                        var kucun = numList[i].split('-')[1];
                        if (kucun > 0 && priceColors.indexOf(color) >= 0) {
                            var stock = {}
                            stock.color = color;
                            stock.qty = kucun + '台';
                            stock.id = i;
                            this.stockList[i] = stock;
                        }
                    }
                } else if (jsonStr["phoneColorsQty"] != null && jsonStr["phoneColorsQty"].length > 0) {
                    var numList = jsonStr["phoneColorsQty"].split(',');
                    priceJson = JSON.parse(jsonStr['price']);
                    priceJson.forEach(function(priceStr) {
                        priceColors = priceColors + ',' + priceStr.color;
                    });
                    for (var i = 0; i < numList.length; i++) {
                        var color = numList[i].split('-')[0];
                        var kucun = numList[i].split('-')[1];
                        if (kucun > 0 && priceColors.indexOf(color) >= 0) {
                            var stock = {}
                            stock.color = color;
                            stock.qty = kucun + '台';
                            stock.id = i;
                            this.stockList[i] = stock;
                        }
                    }
                } else if (jsonStr["phoneColors"] != null) {
                    var numList = jsonStr["phoneColors"].split(';');
                    priceJson = JSON.parse(jsonStr['price']);
                    priceJson.forEach(function(priceStr) {
                        priceColors = priceColors + ',' + priceStr.color
                    });
                    for (var i = 0; i < numList.length; i++) {
                        var color = numList[i];
                        var kucun = '0';
                        if (priceColors.indexOf(color) >= 0) {
                            var stock = {}
                            stock.color = color;
                            stock.qty = kucun + '台';
                            stock.id = i;
                            this.stockList[i] = stock;
                        }
                    }
                }
            }
        },
        printDatas3(jsonObj) {
            this.vendorName = jsonObj;
        },
        printDatas4(jsonObj) {
            if (jsonObj.length > 0) {
                for (var c in jsonObj) {
                    this.swiperList[c] = this.BASE_IMG_URL + jsonObj[c]["NORM_IMAGE_URL"];
                    if ((orderType == "" || orderType == "undefined" || orderType == 1) && c == 1) {
                        coverImgUrl = this.BASE_IMG_URL + jsonObj[c]["NORM_IMAGE_URL"];
                    }
                }
            } else {
                this.swiperList[0] = this.BASE_IMG_URL + '/dz/images/dis/product/blank.gif'
            }
        },
        printDatas5(jsonObj) {
            for (var c in jsonObj) {
                this.imgList[c] = this.BASE_IMG_URL + jsonObj[c]["imageUrl"];
                console.log("this.BASE_IMG_URL + jsonObj[c]['imageUrl'];  " + this.BASE_IMG_URL + jsonObj[c]["imageUrl"]);
            }
        },
        printDatas6(jsonObj) {
            if (jsonObj == null || jsonObj.length == 0 || jsonObj == "undefined") {
                return;
            }
            var item0 = {};
            item0.title = "型号";
            item0.introduction = jsonObj[0]['name'];
            this.goodInfo[0] = item0;
            var item1 = {};
            item1.title = "机身颜色";
            item1.introduction = jsonObj[0]['colors'];
            this.goodInfo[1] = item1;
            var item2 = {};
            item2.title = "屏幕尺寸";
            item2.introduction = jsonObj[0]['screenSize'];
            this.goodInfo[2] = item2;
            var item3 = {};
            item3.title = "CPU型号";
            item3.introduction = jsonObj[0]['cpu'];
            this.goodInfo[3] = item3;

            var jsonStr = jsonObj[0];
            this.data6 = jsonStr;
            this.data6.marketTime = jsonStr['onMarketYear'] + " / " + jsonStr['onMarketMonth']
        },
        printDatas8(jsonObj) {
            console.log('data8 >>>>>>>> ' + JSON.stringify(jsonObj));
            if (jsonObj == null || jsonObj.length == 0 || jsonObj == "undefined") {
                return;
            }
            this.timeShow = true;
            var jsonStr = jsonObj[0];
            this.price = jsonStr["minPrice"];
            this.oldPrice = jsonStr["currentPrice"];
            this.userdQuantity = "已售 " + jsonStr["userdQuantity"] + " 台";
            this.leftTime = jsonStr["promoteEndDate"];
            promoteStartDate = jsonStr["promoteStartDate"];
            promoteEndDate = jsonStr["promoteEndDate"];
            saleControl = jsonStr["saleControl"];
            coverImgUrl = jsonStr["imageUrl"] == "" ? "/dz/images/dis/product/blank.gif" : jsonStr["imageUrl"];

            if (qgOrderType.indexOf(orderType) >= 0 || zcYsOrderType.indexOf(orderType) >= 0 || zcThOrderType.indexOf(
                orderType) >= 0) {
                var nowDate = new Date(); //当前时间
                var starDate = new Date(promoteStartDate);
                var endDate = new Date(promoteEndDate); //结束时间
                if (starDate > nowDate) {
                    console.log("活动还没开始")
                    this.activityDes = '距离开始还剩:'
                    //计算出相差天数
                    var date3 = nowDate.getTime() - starDate.getTime();
                    this.timestamp = Math.round(date3 / 1000);
                    //活动还没开始
                    this.$refs.uToast.show({
                        title: '活动还没开始!',
                        type: 'error'
                    })
                    this.shopBtnDis = true;
                    this.buyBtnDis = true;
                } else if (nowDate > endDate) {
                    console.log("活动已结束")
                    this.activityDes = '活动已结束';
                    //活动已经结束
                    this.$refs.uToast.show({
                        title: '活动已结束!',
                        type: 'error'
                    })
                    this.shopBtnDis = true;
                    this.buyBtnDis = true;
                } else if (nowDate > starDate && nowDate < endDate) {
                    this.activityDes = '距离结束还剩:'
                    //计算出相差天数
                    var date3 = endDate.getTime() - nowDate.getTime();
                    this.timestamp = Math.round(date3 / 1000);
                    //活动中
                    console.log("活动中")
                } else {

                }
            }


            //抢购\品牌专区 类商品 展示 颜色库存 方法
            if (orderType != "" && qgOrderType.indexOf(orderType) >= 0) {
                // this.priceShow = false;
                var colorList = "";
                var numList = jsonStr["phoneColorsQtyFlash"].split(',');
                for (var i = 0; i < numList.length; i++) {
                    var color = numList[i].split('-')[0];
                    var kucun = numList[i].split('-')[1];
                    if (orderType == 7) {
                        var stock = {}
                        stock.color = numList[i].split('-')[0];
                        stock.qty = kucun + "台";
                        stock.id = i;
                        this.stockList[i] = stock;
                    } else {
                        var stock = {}
                        stock.color = numList[i].split('-')[0];
                        stock.qty = kucun + '台';
                        stock.id = i;
                        this.stockList[i] = stock;
                    }
                }
            }

            //众筹预售类商品 展示 颜色库存 方法
            if (orderType != "" && zcYsOrderType.indexOf(orderType) >= 0) {
                // this.priceShow = false;
                var colorList = "";
                var numList = jsonStr["phoneColorsQtyFlash"].split(',');
                for (var i = 0; i < numList.length; i++) {
                    var stock = {}
                    stock.color = numList[i].split('-')[0];
                    stock.qty = '';
                    stock.id = i;
                    this.stockList[i] = stock;
                }
                priceJson = jsonObj;
            }

            //众筹提货类商品 展示 颜色库存 方法
            if (orderType != "" && zcThOrderType.indexOf(orderType) >= 0) {
                this.getRetailPrice(jsonStr.itemCode);
                var param = {};
                param.vendorId = jsonStr.vendorId;
                param.itemId = jsonStr.itemId;
                param.headerId = jsonStr.headerId;
                this.getUserCrowdfundingDeliveryQty(param);

                var priceJsonSingle;
                var colorList = "";
                if (this.deliveryJson) {
                    var spus = JSON.parse(this.deliveryJson)[0].spu;
                    for (var s = 0; s < spus.length; s++) {
                        var spu = spus[s];
                        var spu_price = spu.price;
                        var spu_minPrice = spu.price;
                        var spu_maxQuantity;
                        var spu_minOrderQuantity;
                        if (Number(spu.maxQty) - Number(spu.usedQty) < Number(jsonStr.maxQuantity) ||
                            Number(spu.vendorQty) < Number(jsonStr.maxQuantity)) {
                            if (Number(spu.maxQty) - Number(spu.usedQty) < Number(spu.vendorQty)) {
                                spu_maxQuantity = Number(spu.maxQty) - Number(spu.usedQty);
                            } else {
                                spu_maxQuantity = spu.vendorQty;
                            }
                        } else {
                            spu_maxQuantity = jsonStr.maxQuantity
                        }
                        if (Number(spu.maxQty) - Number(spu.usedQty) < Number(jsonStr.minOrderQuantity)) {
                            spu_minOrderQuantity = Number(spu.maxQty) - Number(spu.usedQty);
                        } else if (Number(spu.vendorQty) < Number(jsonStr.minOrderQuantity)) {
                            spu_minOrderQuantity = Number(spu.vendorQty);
                        } else {
                            spu_minOrderQuantity = jsonStr.minOrderQuantity == 0 ? 1 : jsonStr.minOrderQuantity;
                        }
                        if (s > 0) {
                            priceJsonSingle = priceJsonSingle +
                                ',{ ' +
                                '"color": "' + spu.color + '",' +
                                '"orderAuth": "",' +
                                '"priceinfo": [{"qtyStart": 1,"qtyEnd": 99999,"price": ' + spu_price + '}],' +
                                '"orderTotal": 0,' +
                                '"usedQty": ' + spu.usedQty + ',' +
                                '"maxQty": ' + spu.maxQty + ',' +
                                '"orderDay": 0,' +
                                '"orderOrg": 0,' +
                                '"orderMax": ' + spu_maxQuantity + ',' +
                                '"orderMin": ' + spu_minOrderQuantity +
                                '}';
                        } else {
                            priceJsonSingle = '{ ' +
                                '"color": "' + spu.color + '",' +
                                '"orderAuth": "",' +
                                '"priceinfo": [{"qtyStart": 1,"qtyEnd": 99999,"price": ' + spu_price + '}],' +
                                '"orderTotal": 0,' +
                                '"usedQty": ' + spu.usedQty + ',' +
                                '"maxQty": ' + spu.maxQty + ',' +
                                '"orderDay": 0,' +
                                '"orderOrg": 0,' +
                                '"orderMax": ' + spu_maxQuantity + ',' +
                                '"orderMin": ' + spu_minOrderQuantity +
                                '}';
                        }
                        var stock = {}
                        stock.color = spu.color;
                        stock.qty = spu.vendorQty + "台";
                        stock.id = i;
                        this.stockList[i] = stock;
                    }
                } else {
                    priceJsonSingle = '{ ' +
                        '"color": "",' +
                        '"orderAuth": "",' +
                        '"priceinfo": [{"qtyStart": 1,"qtyEnd": 99999,"price": 0}],' +
                        '"orderTotal": 0,' +
                        '"orderDay": 0,' +
                        '"orderOrg": 0,' +
                        '"orderMax": 0,' +
                        '"orderMin": 0' +
                        '}';
                }
                priceJson = JSON.parse('[' + priceJsonSingle + ']');
            }
        },
        getRetailPrice(itemCode) {
            getRetailPrice(itemCode).then(res => {
                console.log(res);
                if (res != null && 0 == res.code) {
                    this.retailPrice = res.data;
                }
            });
        },
        getUserCrowdfundingDeliveryQty(data) {
            getUserCrowdfundingDeliveryQty(data).then(res => {
                console.log(res);
                if (res != null && 0 == res.code) {
                    this.deliveryJson = res.data;
                }
            });
        },
        adjustPrice(e, i) {
            if (i != undefined) {
                this.currentstock = i
            }
            if (e != undefined) {
                if (e.value == undefined) {
                    //选择颜色触发的该事件
                    this.selectedColor = e.color;
                    this.selectedQty = e.qty == '' ? 999999 : e.qty;
                } else {
                    //变更数量触发的改时间
                    this.selectedNum = e.value;
                }
            }
            console.log(this.selectedColor + "   " + Number(this.selectedQty.replace("台", "")))
            var colorItem = [{
                "color": this.selectedColor,
                "orderMax": "0",
                "orderMin": "0",
                "priceinfo": [{
                    "price": this.productActivityPrice,
                    "qtyEnd": "99999",
                    "qtyStart": "1"
                }]
            }];

            if (orderType != "" && qgOrderType.indexOf(orderType) == -1 && zcYsOrderType.indexOf(orderType) ==
                -1 &&
                zcThOrderType.indexOf(orderType) == -1) {
                colorItem = this.getmylist(priceJson, this.selectedColor, "color");
                if (!colorItem.length) {
                    colorItem = [{
                        "color": this.selectedColor,
                        "orderAuth": "没有价格不能采购!",
                        "orderMax": "0",
                        "orderMin": "0",
                        "priceinfo": [{
                            "price": "0",
                            "qtyEnd": "0",
                            "qtyStart": "0"
                        }]
                    }];
                }
            }

            if (orderType != "" && zcYsOrderType.indexOf(orderType) >= 0) {
                //处理众筹预售活动页面处理方式。
                //add by chenbo 2021年1月4日 11:27:24
                colorItem = [{
                    "color": selectedColor,
                    "orderMax": priceJson[0].maxQuantity,
                    "orderMin": priceJson[0].minOrderQuantity,
                    "priceinfo": [{
                        "price": priceJson[0].minPrice,
                        "qtyEnd": "99999",
                        "qtyStart": "1"
                    }]
                }];

                this.limitShow = true;
                this.limitSpan = colorItem[0].orderMin + " 台起订," + "单订单最多 " + colorItem[0].orderMax + " 台";
            }

            if (orderType != "" && zcThOrderType.indexOf(orderType) >= 0) {
                //处理众筹提货活动页面处理方式。
                //add by chenbo 2021年1月4日 11:27:24
                colorItem = this.getmylist(priceJson, this.selectedColor, "color");
                this.limitShow = true;
                this.limitSpan =
                    "单订单最少提货" + colorItem[0].orderMin + " 台," +
                    "最多提货 " + colorItem[0].orderMax + " 台<br>" +
                    "预售总量 " + colorItem[0].maxQty + " 台，" +
                    "已提 " + colorItem[0].usedQty + " 台";

                if (!colorItem.length) {
                    colorItem = [{
                        "color": this.selectedColor,
                        "orderAuth": "没有价格不能采购!",
                        "orderMax": "0",
                        "orderMin": "0",
                        "priceinfo": [{
                            "price": "0",
                            "qtyEnd": "0",
                            "qtyStart": "0"
                        }]
                    }];
                }
            }

            if (zcThOrderType.indexOf(orderType) < 0 && (colorItem[0].orderMin == "0" || colorItem[0]
                .orderMax ==
                "0")) {
                colorItem[0].orderMin = 1;
                colorItem[0].orderMax = 99999;
            }

            this.fixBuyNumToInt();

            if (isNaN(this.selectedNum) || Number(this.selectedNum) < Number(colorItem[0].orderMin)) {
                this.selectedNum = colorItem[0].orderMin;
                this.goodsValue = colorItem[0].orderMin;
            }
            this.productPriceCount = this.selectedNum;

            var priceInfoArr = colorItem[0].priceinfo;
            for (var x = 0; x < priceInfoArr.length; x++) {
                if (this.selectedNum >= priceInfoArr[x].qtyStart && this.selectedNum <= priceInfoArr[x]
                    .qtyEnd || (
                        priceInfoArr[x]
                            .qtyStart == 0 && priceInfoArr[x].qtyEnd == 0)) {
                    this.productPriceOne = priceInfoArr[x].price;
                    this.productPriceTotal = Number(this.selectedNum) * priceInfoArr[x].price;
                    break;
                }
            }

            var priceInfos = colorItem[0].priceinfo;
            var priceHtmlPart = "";
            for (var n = 0; n < priceInfos.length; n++) {
                var stepPrice = {};
                stepPrice.qtyStart = priceInfos[n].qtyStart;
                stepPrice.qtyEnd = priceInfos[n].qtyEnd;
                stepPrice.price = priceInfos[n].price;
                this.pricesList[n] = stepPrice;
            }
        },
        getmylist(data, id, idkey) {
            var temp = [];
            for (var di in data) {
                var datai = data[di];
                if (datai[idkey] == id) {
                    temp.push(datai);
                }
            }
            return temp;
        },
        fixBuyNumToInt() {
            var buyNum = this.selectedNum;
            if (isNaN(buyNum)) {
                this.goodsValue = 1;
                return;
            }
            buyNum = Math.floor(buyNum); //向下取整，防止出现小数
            this.goodsValue = buyNum;
        },
        getIsCanOrder(parm) {
            var data = {};
            data.createType = parm.createType;
            data.itemId = parm.itemId;
            data.vendorId = parm.vendorId;
            data.vendorType = parm.vendorType;

            getIsCanOrder(data).then(res => {
                console.log("getIsCanOrder res " + JSON.stringify(res));
                if (res != null && 0 == res.code) {
                    orderLimit = res.data;
                }
            });
        },
        getDzChannelPlaceOrderControlFun() {
            getDzChannelPlaceOrderControl().then(res => {
                console.log("getDzChannelPlaceOrderControl " + JSON.stringify(res));
                if (res != null && res.code == 0) {
                    channelPlaceOrderControl = res.data;
                }
            });
        },
        buyThroughMicroService() {
            if (channelPlaceOrderControl == "Y") {
                this.$refs.uToast.show({
                    title: "本渠道已维护为不允许订货",
                    type: 'error'
                })
                return;
            }

            //购买权限控制
            if (orderLimit != "Y" && orderLimit != "") {
                this.$refs.uToast.show({
                    title: orderLimit,
                    type: 'error'
                })
                return;
            }

            //自有渠道水位控制
            if (waterLevelReason != "") {
                this.$refs.uToast.show({
                    title: waterLevelReason,
                    type: 'error'
                })
                return;
            }
            //如果是抢购都校验抢购时间
            if (qgOrderType.indexOf(orderType) >= 0 || zcThOrderType.indexOf(orderType) >= 0 || zcYsOrderType
                .indexOf(
                    orderType) >= 0) {
                var date1 = new Date(); //开始时间
                var promoteStartDataT = new Date(promoteStartDate); //开始时间
                var promoteEndDateT = new Date(promoteEndDate); //开始时间
                if (date1 < promoteStartDataT || date1 > promoteEndDateT) {
                    this.$refs.uToast.show({
                        title: "抢购时间无效",
                        type: 'error'
                    })
                    return false;
                }
            }
            var postMode = "toRetailer"; //发货方式 默认发货方式为“发货到渠道”
            var color = this.selectedColor;
            if (color == "") {
                this.$refs.uToast.show({
                    title: "请选择颜色",
                    type: 'error'
                })
                return;
            }

            var vendorType = intoParam.vendorType; //供应商类型
            var itemId = intoParam.itemId;
            var unitPrice = this.productPriceOne;
            var lineId = intoParam.lineId;
            this.fixBuyNumToInt();
            var quantity = this.productPriceCount;
            var vendorInvQty = Number(this.selectedQty.replace("台", ""));
            //抢购类活动 验证库存
            if ("3".indexOf(orderType) >= 0) {
                if (Number(vendorInvQty) <= 0) {
                    this.$refs.uToast.show({
                        title: "商品已抢完",
                        type: 'error'
                    })
                    return false;
                } else {
                    if (Number(quantity) > Number(vendorInvQty)) {
                        this.$refs.uToast.show({
                            title: "购买数量大于剩余数量",
                            type: 'error'
                        })
                        return false;
                    } else {
                        if (this.verifyItemQty(itemId, lineId, color, quantity)) {
                            //根据已用量和总量判断是否可以购买
                        } else {
                            return false;
                        }
                    }
                }
            }
            //订货会\普通商品订单 校验库存
            if ("1".indexOf(orderType) >= 0 || orderType == "" || orderType == "undefined") {
                var colorItem = this.getmylist(priceJson, this.selectedColor, "color");
                var orderAuth = colorItem[0].orderAuth;
                if (orderAuth != "") {
                    this.$refs.uToast.show({
                        title: orderAuth,
                        type: 'error'
                    })
                    return false;
                }
                if (vendorInvQty <= 0 || Number(quantity) > vendorInvQty) {
                    this.$refs.uToast.show({
                        title: "库存不足",
                        type: 'error'
                    })
                    return false;
                }
            }

            if ("5".indexOf(orderType) >= 0) {
                if (Number(quantity) == 0) {
                    this.$refs.uToast.show({
                        title: "购买数量不能为0",
                        type: 'error'
                    })
                    return;
                }
                if (Number(quantity) > Number(vendorInvQty)) {
                    this.$refs.uToast.show({
                        title: "已全部提货",
                        type: 'error'
                    })
                    return false;
                }
            }

            var realityPayAmount = Number(this.productPriceTotal).toFixed(2);
            var param = {};

            var userName = userInfo.userName;
            var userType = userInfo.userType;
            var poType = "";
            if ("1" == userType && ("3" == vendorType || "4" == vendorType)) {
                poType = "DZ_DS";
            } else if (("24" == userType || "25" == userType) && "1" == vendorType) {
                poType = "DS_VD";
            } else {
                poType = "DZ";
            }
            if (postMode == "toCustomer") {
                poType = "DF";
            }
            param.userName = userName;
            param.locateName = userInfo.locatorDesc;
            param.ioName = userInfo.currOuName;
            param.userType = userType;
            param.userId = userInfo.userId; //用户id
            param.controlAtrr = "0"; //是否发短信

            param.realityPayAmount = realityPayAmount; //实付总金额
            param.itemCode = this.segment1; //产品编码
            param.itemId = itemId; //产品id
            param.vendorName = this.vendorName;
            param.vendorType = vendorType; //供应商类型
            param.vendorId = intoParam.vendorId; //供应商类型
            param.isNoReserveOnhand = ""; //是否预占库存
            //根据活动类型分配不同的订单创建类型
            if (orderType == "" || orderType == "undefined") { // 普通订单
                param.createType = 2;
            } else if (orderType == "1") { // 订货会
                param.createType = 3;
            } else if ("3" == orderType) { //抢购
                param.createType = 4;
            } else if ("4" == orderType) { //预售
                param.createType = 21;
            } else if ("5" == orderType) { //提货
                param.createType = 23;
            } else if ("6" == orderType) { //组合营销
                param.createType = 25;
            } else if ("7" == orderType) { //品牌专区
                param.createType = 27;
            }
            param.headerId = intoParam.headerId; //促销申请单头ID
            param.promoteApplyHeaderId = intoParam.headerId; //促销申请单头ID
            param.promoteLineId = intoParam.lineId; //促销申请单行ID
            param.organizationId = userInfo.organizationId; //分公司ID
            param.authorizationStatus = "INCOMPLETE"; //订单状态
            param.isCreditRebate = "N"; //是否使用挂账/返利（Y:是；N:否）
            param.neetPayAmount = realityPayAmount; //应付总金额（元）

            param.poType = poType; //订单类型
            param.quantity = quantity;
            param.actualUnitPrice = unitPrice;
            param.unitPrice = unitPrice;
            param.itemDescription = this.itemName;
            param.presentQuantity = 0;
            param.unitOfIssue = "台"; //单位
            param.color = color;
            param.projectId = "1007172";
            if (postMode == "toCustomer") { //发货方式为代发
                param.dropShipFlg = "1";
            } else {
                param.dropShipFlg = "0";
            }
            createOrder(param).then(res => {
                console.log("createOrder " + JSON.stringify(res));
                if (res != null && 0 == res.code) {
                    res.data.createTypeName = this.blockName == null ? "B2B" : this.blockName;
                    res.data.imgUrl = this.BASE_IMG_URL + coverImgUrl;
                    uni.removeStorageSync("poInfo");
                    console.log("poInfo  " + JSON.stringify(res.data))
                    uni.setStorageSync("poInfo", JSON.stringify(res.data));
                    // uni.setStorageSync("subOrderHisUrl", window.location.href);
                    uni.navigateTo({
                        url: '/pages/goods/order-create',
                        animationType: 'pop-in',
                        animationDuration: 200
                    });
                } else {
                    this.$refs.uToast.show({
                        title: "操作失败",
                        type: 'error'
                    })
                }
            });
        },
        addShoppingCart() {
            if (channelPlaceOrderControl == "Y") {
                this.$refs.uToast.show({
                    title: "本渠道已维护为不允许订货",
                    type: 'error'
                })
                return;
            }
            //购买权限控制
            if (orderLimit != "Y" && orderLimit != "") {
                this.$refs.uToast.show({
                    title: orderLimit,
                    type: 'error'
                })
                return;
            }

            var color = this.selectedColor;
            if (color == "") {
                this.$refs.uToast.show({
                    title: '请选择颜色',
                    type: 'error'
                })
                return;
            }

            //订货会\普通商品订单 校验库存
            if ("1".indexOf(orderType) >= 0 || orderType == "" || orderType == "undefined") {
                var colorItem = this.getmylist(priceJson, color, "color");
                var orderAuth = colorItem[0].orderAuth;
                if (orderAuth != "") {
                    this.$refs.uToast.show({
                        title: orderAuth,
                        type: 'error'
                    })
                    return;
                }
            }

            var param = {};
            param.itemId = intoParam.itemId; //产品id
            param.vendorType = intoParam.vendorType; //供应商类型
            param.vendorId = intoParam.vendorId; //供应商类型
            param.quantity = this.productPriceCount;
            param.color = color;
            param.ioId = userInfo.currInvOrgId;
            param.userId = userInfo.userId; //用户id
            addToShoppingCart(param).then(res => {
                if (res.code == 0) {
                    this.$refs.uToast.show({
                        title: "商品已成功加入购物车",
                        type: 'success'
                    })
                    this.getShopingNum();
                } else {
                    this.$refs.uToast.show({
                        title: res.data == "" ? res.message : res.data,
                        type: 'error'
                    })
                }
            });
        },
        getShopingNum() {
            getShopingNum().then(res => {
                console.log("getShopingNum  " + JSON.stringify(res))
                var num = res.data.num;
                if (num > 0) {
                    this.cartNum = num
                    this.cartNumShow = true;
                } else {
                    this.cartNumShow = false;
                }
            });
        },
        verifyItemQty(itemId, promoteLineId, color, quantity) {
            var verifyResult = true;
            var data = {};
            data.itemId = itemId;
            data.promoteLineId = promoteLineId;
            data.color = color;
            data.buyQty = quantity;

            verifyItemQty(data).then(res => {
                console.log("verifyItemQty res " + JSON.stringify(res));
                if (res != null && "0" == res.code && "0" != res.data.buyFlag) {
                    this.$refs.uToast.show({
                        title: "库存不足",
                        type: 'error'
                    })
                    verifyResult = false;
                } else {
                    verifyResult = true;
                }
            });
            return verifyResult;
        },
    },
    //监听滑动事件
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    },
}
</script>

<style lang="scss" scoped>
.header_left_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 56rpx;
    margin-left: 16rpx;
}

.header_transparentFixed_left_info {
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.7);
    -webkit-border-radius: 16px;
    border-radius: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.header_btnMongol {
    -webkit-border-radius: 16px;
    border-radius: 16px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.7);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.header_colorWhite_btnMongol {
    border-style: solid;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(0, 0, 0, 0.2);
}

.header_left_line {
    height: 30rpx;
    width: 2rpx;
    background-color: rgba(255, 255, 255, 0.4);
}

.header_left_back {
    width: 76rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header_icon {
    width: 70rpx;
    height: 70rpx;
}

.header_left_home {
    width: 76rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-bar-left {
    .icon {
        color: #000;
    }

    .header_left_line {
        background-color: #ccc;
    }
}

.nav-bar-left.header_colorWhite_btnMongol {
    border-color: #ccc;
    background-color: #fff;
}

.nav-bar-left-transparent {
    .icon {
        color: #fff;
    }

    .header_left_line {
        background-color: rgba(255, 255, 255, 0.4);
    }
}

.nav-bar-left-transparent.header_colorWhite_btnMongol {
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(0, 0, 0, 0.2);
}

.nav-bar-right {
    padding-right: 10px;
}

.goods-detail {
    .goods-actity {
        position: relative;
        height: 120rpx;
        display: flex;
        background: url("../../static/images/index/lefttime.png") no-repeat 0 0;
        background-size: 100% 100%;

        .left {
            width: 515rpx;
            padding: 10rpx 30rpx;
            color: #fff;

            .symbol {
                font-size: 30rpx;
            }

            .price {
                font-size: 46rpx;
            }

            .price-old {
                margin-left: 15rpx;
                font-size: 26rpx;
                text-decoration: line-through;
            }

            .purchase-content {
                @include flex-center(space-between, center);
            }
        }

        .right {
            width: 235rpx;
            padding: 15rpx 10rpx;

            .desc {
                font-size: 24rpx;
                margin: 0;
                padding: 0;
                text-align: right;
                color: #ff2b65;
            }

            .left-time {
                margin-top: 20rpx;
                @include flex-center(flex-end, center);
            }
        }
    }

    .goods-desc {
        background-color: #fff;

        .goods-price {
            @include flex-center(flex-start, center);
            padding: 20rpx 30rpx;

            .sell-price {
                color: #f24444;

                .new-price {
                    font-size: 46rpx;
                    margin-right: 10rpx;
                }

                .old-price {
                    color: grey;
                    text-decoration: line-through;
                    margin-right: 10rpx;
                }
            }

            .u-tag {
                margin-top: 10rpx;
                margin-right: 10rpx;
            }
        }

        .goods-title {
            padding: 0 30rpx;
            font-size: 32rpx;
            @include line-clamp(1.5, 2);
        }

        .goods-topic {
            padding: 0 30rpx 20rpx;
            line-height: 40rpx;
            color: #f24444;
            font-size: 26rpx;
        }
    }

    .goods-sku {
        background-color: #fff;
        padding: 20rpx 30rpx;

        .sku-item {
            display: flex;
            margin-top: 30rpx;
        }

        .title {
            width: 90rpx;
        }

        .right {
            .stock-item {
                width: 250rpx;
                height: 52rpx;
                line-height: 50rpx;
                padding: 0 20rpx;
                border-radius: 25rpx;
                border: 1px solid #333;
                @include flex-center(space-between, center);
                margin-bottom: 20rpx;
            }

            .stock-item:last-child {
                margin-bottom: 0;
            }

            .stock-item.active {
                color: #33acfb;
                border-color: #33acfb;
            }

            .product-price-desc-title {
                background-color: #f3f4f6;
                @include flex-center(space-between, center);
                padding: 15rpx;
            }

            .product-price-desc-content {
                @include flex-center(space-between, center);
                padding: 25rpx;
                border-bottom: 1px solid #333;

                .product-price-desc-content-price {
                    color: #f24444;
                }
            }

            .product-price-info {
                margin-top: 25rpx;

                text {
                    color: #f24444;
                    font-size: 36rpx;
                }
            }
        }
    }

    .description {
        background-color: #fff;
        padding-bottom: 20rpx;

        .description-item {
            display: flex;
            font-size: 26rpx;
            line-height: 35rpx;
            padding: 15rpx 30rpx 0;

            .title {
                width: 180rpx;
            }

            .center {
                width: calc(100% - 180rpx);
            }
        }

        .btn {
            @include flex-center;
            padding-top: 20rpx;
        }
    }

    .goods-detail-img {
        .u-image {
            vertical-align: middle;
            font-size: 0;
        }
    }

    .good-nav {
        display: flex;
        border-top: solid 2rpx #f2f2f2;
        border-bottom: solid 2rpx #f2f2f2;
        background-color: #ffffff;
        width: 750rpx;
        position: fixed;
        bottom: 0;
        z-index: 999;

        .good-nav-left {
            flex: 1;
        }

        .good-nav-right {
            display: flex;
            padding: 0 30rpx;
            font-size: 28rpx;
            align-items: center;
            justify-content: center;

            .btn {
                width: 200rpx;
                height: 78rpx;
                line-height: 78rpx;
                text-align: center;
                border-radius: 36rpx;
                color: #ffffff;
            }

            .cart {
                background-color: #fca742;
                margin-right: 10rpx;
            }

            .buy {
                background-color: #f24444;
            }

            .disabled {
                background: #9c9c9c !important;
                color: #f3f4f6 !important;
                border-color: #9c9c9c !important;
            }
        }
    }

    ::v-deep .u-drawer-content-visible {
        padding-top: 80rpx;
    }
}
</style>
