/* 订单确认 */
<template>
	<view class="index">
		<view class="address-select-box">
			<view class="address-select-box-main" @click="selectAddress">
				<view class="address-info">
					<view class="address-selected" v-if="addressInfo.id">
						<view class="top">
							<view class="name">{{ addressInfo.name }}</view>
							<view class="phone">{{ addressInfo.tel }}</view>
						</view>
						<view class="bottom">
							{{ addressInfo.site }}
						</view>
					</view>
					<view class="address-not" v-else>
						<u-icon name="map" size="46"></u-icon>
						<text class="text">选择收货地址</text>
					</view>
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#CCC" size="36"></u-icon>
				</view>
				<view class="companyName"> 公司名称:{{ companyName }} </view>
			</view>
		</view>
		<view class="goods-box">
			<view class="commen-order-goods-list">
				<view class="check-box">
					<view class="vendorName">{{ vendorName }}</view>
				</view>
				<view class="car-every" v-for="(item, index) in goodsList" :key="index">
					<view class="image">
						<image :src="item.goodsUrl" mode="aspectFill"></image>
					</view>
					<view class="other-info">
						<view class="title u-line-2">{{ item.title }}</view>
						<view class="spu">
							<text>{{ item.type }}</text>
						</view>
						<view class="price">
							￥<text class="decimal">{{ item.price }}</text>
						</view>
						<view class="number">x {{ item.number }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="other-box">
<!-- 			<u-cell-group class="group">
				<u-cell-item title="商品总额" :arrow="false" hover-class="cell-hover-class">
					<view slot="right-icon" class=""> ￥{{ neetPayAmount }} </view>
				</u-cell-item>
			</u-cell-group> -->
		</view>
		<view class="order-create-tabbar-area-bottom"></view>
		<view class="order-create-tabbar">
			<view class="left">
				<text>共<text class="goods-num">{{ totalNum(goodsList) }}</text>件</text>,
				<text>实付:<text class="price">￥{{ neetPayAmount }}</text></text>
			</view>
			<view class="right">
				<u-button type="error" size="medium" shape="circle" :hairLine="false" :loading="submitBtnLoading"
					@click="submitFormOrder">提交订单</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getAddressInfo,
		getUsedAndConfigCount,
		verifyMaxPoCount,
		submitOrder,
		submitCartOrder,
		getHandleResultByPolling
	} from "../../config/api.js";

	var order = {};
	var data = {};

	export default {
		computed: {
			// 价格小数
			priceDecimal() {
				return (val) => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return "00";
				};
			},
			// 价格整数
			priceInt() {
				return (val) => {
					if (val !== parseInt(val)) return val.split(".")[0];
					else return val;
				};
			},
		},
		data() {
			return {
				// BASE_IMG_URL: getApp().globalData.$BASE_IMG_URL,
				addressInfo: {},
				flag: 0,
				neetPayAmount: 0,
				poHeaderId: 0,
				companyName: "",
				couponList: [],
				selectCoupons: [],
				submitBtnLoading: false,
				vendorName: "",
				goodsList: [],
				receiveData: JSON.parse(uni.getStorageSync("poInfo")),
				dropShipFlg: JSON.parse(uni.getStorageSync("poInfo"))["dropShipFlg"],
				userType: JSON.parse(uni.getStorageSync("poInfo"))["userType"],
				orderSource: JSON.parse(uni.getStorageSync("poInfo"))["orderSource"],
				mainObj: {},
			};
		},
		onShow() {},
		onLoad() {
			// console.log(this.$Route.query)
			this.do_initPage();
			this.getAddressInfo();
		},
		methods: {
			selectAddress() {
				uni.navigateTo({
					url: "/pages/goods/select-address",
					animationType: "pop-in",
					animationDuration: 200,
				});
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map((val) => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map((val) => {
					num += Number(val.number);
				});
				return num;
			},
			submitFormOrder() {
				let that = this;
				that.submitBtnLoading = true;
				setTimeout(function() {
					that.submitBtnLoading = false;
				}, 2000);

				if (
					this.addressInfo.name == "" ||
					this.addressInfo.id == "" ||
					this.addressInfo.tel == "" ||
					this.addressInfo.site == ""
				) {
					this.$refs.uToast.show({
						title: "请选择收货人信息",
						type: "error",
					});
					return false;
				}
				var rcvContactPhoneObj = this.addressInfo.tel;

				var companyName = this.companyName;
				if (companyName == "") {
					if (rcvContactPhoneObj == "") {
						this.$refs.uToast.show({
							title: "收货人联系电话不能为空",
							type: "error",
						});
						return false;
					} else {
						var r =
							/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
						if (!r.test(rcvContactPhoneObj) || rcvContactPhoneObj.length != 11) {
							this.$refs.uToast.show({
								title: "收货人联系电话输入不正确，请确认！",
								type: "error",
							});
							return false;
						}
					}
					if (userType == "27") {
						this.$refs.uToast.show({
							title: "购机人不能为空！",
							type: "error",
						});
					} else {
						this.$refs.uToast.show({
							title: "公司名称不能为空！",
							type: "error",
						});
					}
					return false;
				} else {
					if (companyName.length > 100) {
						this.$refs.uToast.show({
							title: "公司名称不能超过50个字！",
							type: "error",
						});
						return false;
					}
				}
				var isSubmit = true;
				if (isSubmit) {
					//验证机型单价 ADD BY ZHANGXING 2016-7-8 20:35:07
					for (var i = 0; i < this.goodsList.length; i++) {
						var uPrice = this.goodsList[i].price;
						if (uPrice == "" || Number(uPrice) <= 0) {
							this.$refs.uToast.show({
								title: "机型单价必须是大于0的数字！",
								type: "error",
							});
							isSubmit = false;
							return false;
						}
					}

					var realityPayAmount = this.neetPayAmount;
					if (Number(realityPayAmount) <= 0) {
						this.$refs.uToast.show({
							title: "实付总金额错误，不允许提交！",
							type: "error",
						});
						isSubmit = false;
						return false;
					}
				}
				if (this.orderSource != "shoppingCart") {
					//判断是否还有库存，没有库存提示并隐藏购买按钮
					var createTypeCode = this.receiveData["createType"];
					if (isSubmit && "4" == createTypeCode) {
						isSubmit = false;
						var data = {
							itemId: this.receiveData["itemid"],
							promoteLineId: this.receiveData["promoteLineId"],
							color: this.receiveData["color"],
							buyQty: this.receiveData["quantity"],
						};
						getUsedAndConfigCount(data).then((res) => {
							console.log("getUsedAndConfigCount " + JSON.stringify(res));
							if (res != null && "0" == res.code) {
								if (0 == res.data.buyFlag) {
									var errMsg = this.verifyMaxPoCount();
								} else {
									this.$refs.uToast.show({
										title: "库存不足！",
										type: "error",
									});
									return false;
								}
							}
						});
					}
				} else {
					var errMsg = this.verifyMaxPoCount();
				}

			},
			verifyMaxPoCount() {
				var verifyResult = true;
				var buyQty = 0;
				for (var i = 0; i < this.goodsList.length; i++) {
					buyQty = buyQty + Number(this.goodsList[i].number);
				}
				var data = {
					buyQty: buyQty,
					userId: this.receiveData.userId,
				};
				verifyMaxPoCount(data).then((res) => {
					console.log("verifyMaxPoCount " + JSON.stringify(res));
					if (res != null && "0" == res.code) {
						if ("ok" != res.data.msg) {
							verifyResult =
								"您所属单位【 " +
								this.companyName +
								" 】当月累计采购量【" +
								res.data.currentMonthTotalCount +
								"】大于等于当月提货量上限值【" +
								res.data.max +
								"】，请降低订货量；如果继续提交订单，到货后需要渠道经理现场验货！";
							this.$refs.uToast.show({
								title: verifyResult,
								type: "error",
							});
							return false;
						} else {
							if (this.orderSource != "shoppingCart") {
								this.submitOrderInfo();
							} else {
								this.submitCartOrderInfo();
							}
						}
					}
				});
				return verifyResult;
			},
			submitOrderInfo() {
				this.mainObj.poHeaderId = this.receiveData["poHeaderId"];
				this.mainObj.rcvAddressId = this.receiveData["rcvAddressId"];
				this.mainObj.extTypeCode = "2";
				console.log("mainObj " + JSON.stringify(this.mainObj));
				submitOrder(this.mainObj).then((res) => {
					console.log("submitOrder " + JSON.stringify(res));
					if (null != res && "0" == res.code) {
						this.getHandleResultByPolling();
					} else if (res != null && "0" != res.code) {
						var errmsg = "";
						if ("poCountIsTooBig" == res.data) {
							errmsg = "当前订单数过多，请稍后";
						} else if ("submitted" == res.data) {
							errmsg = "订单已提交过，请勿重复提交";
						} else {
							errmsg = "操作失败！";
						}
						this.$refs.uToast.show({
							title: errmsg,
							type: "error",
						});
					} else {
						this.$refs.uToast.show({
							title: "操作失败！",
							type: "error",
						});
					}
				});
			},
			submitCartOrderInfo() {
				var params = JSON.stringify(this.receiveData);
				var data = {
					params: params,
				};
				submitCartOrder(data).then((res) => {
					console.log("submitCartOrder " + JSON.stringify(res));
					if (null != res && "0" == res.code) {
						this.getHandleResultByPolling();
					} else if (res != null && "0" != res.code) {
						var errmsg = "";
						if ("poCountIsTooBig" == res.data) {
							errmsg = "当前订单数过多，请稍后";
						} else if ("submitted" == res.data) {
							errmsg = "订单已提交过，请勿重复提交";
						} else {
							errmsg = "操作失败！";
						}
						this.$refs.uToast.show({
							title: errmsg,
							type: "error",
						});
					} else {
						this.$refs.uToast.show({
							title: "操作失败！",
							type: "error",
						});
					}
				});
			},
			getHandleResultByPolling() {
				var startTime = new Date();
				var intervalTime = 1000; //轮询时间间隔
				var v_poHeaderId = this.receiveData.poHeaderId;
				var v_createType = this.receiveData["createType"];
				var intervalFun = setInterval(function() {
					if (new Date().getTime() - startTime.getTime() > 50000) {
						this.$refs.uToast.show({
							title: "订单正在处理过程中，请稍后去订单中心查询支付",
							type: "error",
						});
						clearInterval(intervalFun);
					} else {
						var data = {
							poHeaderId: v_poHeaderId,
						};
						getHandleResultByPolling(data).then((res) => {
							console.log("getHandleResultByPolling " + JSON.stringify(res));
							if (res != null && "0" == res.code && "0" == JSON.parse(res.data.handleResult)
								.code) {
								var resutJson = JSON.parse(res.data.handleResult);
								var successUrl;
								if ("27" == v_createType) {
									this.$refs.uToast.show({
										title: "该订单无需支付，即将跳转个人中心。",
										type: "success",
									});
									//如果不需要支付跳转到个人中心--个人中心
									uni.switchTab({
										url: "/pages/my/my",
									});
								} else {
									successUrl =
										"/pages/goods/order-pay?act=GATHER_PAY&isAgain=Y&gatherOrder=" +
										resutJson.payGatherOrder +
										"&vendorType=1";
									// uni.setStorageSync("orderPayHisUrl", successUrl);
									uni.navigateTo({
										url: successUrl,
										animationType: 'pop-in',
										animationDuration: 200
									});
								}
								uni.removeStorageSync("poInfo");
								clearInterval(intervalFun);
							} else if (res != null && "0" == res.code && "0" != JSON.parse(res.data
									.handleResult).code &&
								undefined != JSON.parse(res.data.handleResult).code) {
								clearInterval(intervalFun);
								var resultJson = JSON.parse(res.data.handleResult);
								this.$refs.uToast.show({
									title: resultJson.message,
									type: "error",
								});
								uni.navigateBack({
									delta: 1
								});
							}
						});
					}
				}, intervalTime);
			},
			getAddressInfo(param) {
				var selectAddrInfo = param;
				if (
					selectAddrInfo != "" &&
					selectAddrInfo != null &&
					selectAddrInfo != "undefined"
				) {
					this.receiveData["recAddressInfoMap"] = selectAddrInfo;
					this.addressFunction();
				} else {
					var data = {
						userId: this.receiveData["userId"],
					};
					getAddressInfo(data).then((res) => {
						console.log("getAddressInfo " + JSON.stringify(res));
						if (res != null && "0" == res.code) {
							this.receiveData["recAddressInfoMap"] = res.data.recAddressInfoMap;
							this.addressFunction();
						}
					});
				}
			},
			addressFunction() {
				var recAddressList = this.receiveData["recAddressInfoMap"];
				if (recAddressList.length > 0) {
					for (var i = 0; i < recAddressList.length; i++) {
						if ("Y" == recAddressList[i]["DEFAULTFLAG"]) {
							var defaultRecAddressInfo = recAddressList[i];
							this.receiveData.rcvAddressId = defaultRecAddressInfo["RECADDREEID"];
							this.addressInfo.id = defaultRecAddressInfo["RECADDREEID"];
							this.addressInfo.name = defaultRecAddressInfo["RECCONTACTNAME"];
							this.addressInfo.tel = defaultRecAddressInfo["RECCONTACTPHONE"];
							this.addressInfo.site = defaultRecAddressInfo["RECADDRESSINFO"];
							this.addressInfo.checked = true;
						} else {
							this.addressInfo = {};
						}
					}
				} else {
					this.addressInfo = {};
				}
				console.log("用赋值,触发更新产品列表事件????????????????????????????");
				this.flag = Math.random();
			},
			do_initPage() {
				this.companyName = this.receiveData["companyName"];
				this.vendorName = this.receiveData["vendorName"];
				this.neetPayAmount = this.receiveData["neetPayAmount"];
				this.poHeaderId = this.receiveData["poHeaderId"];
				if (this.orderSource == "shoppingCart") {
					this.initProductDatas(this.receiveData);
				} else {
					this.initProductData(this.receiveData);
				}
			},
			initProductData(poInfo) {
				var prodInfo = {};
				prodInfo.goodsUrl = poInfo["imgUrl"];
				prodInfo.title = poInfo["itemDescription"];
				prodInfo.type = poInfo["color"];
				prodInfo.price = poInfo["unitPrice"];
				prodInfo.number = poInfo["quantity"];
				this.goodsList[0] = prodInfo;
				//遍历对象，生成input元素
				this.mainObj = this.fillElement(poInfo);
			},
			initProductDatas(param) {
				var lineList = param.lineList;
				for (var i = 0; i < lineList.length; i++) {
					var poInfo = lineList[i];
					var prodInfo = {};
					prodInfo.goodsUrl = poInfo["imgUrl"];
					prodInfo.title = poInfo["itemDescription"];
					prodInfo.type = poInfo["color"];
					prodInfo.price = poInfo["unitPrice"];
					prodInfo.number = poInfo["quantity"];
					this.goodsList[i] = prodInfo;
				}
			},
			fillElement(poInfo) {
				var ele = {};
				var Objkeys = Object.keys(poInfo);
				Objkeys.forEach(function(item) {
					var obj = poInfo[item];
					if (obj != null && poInfo[item] != "") {
						if (typeof obj == "string") {
							if (item == "organizationId") {
								ele.ioId = poInfo[item];
							}
							if (item == "userId") {
								ele.createdBy = poInfo[item];
							}
							ele[item] = poInfo[item];
							// ele = {item:poInfo[item]}
						} else if (typeof obj == "object") {
							if (obj.length >= 1) {
								for (var g = 0; g < obj.length; g++) {
									var el = obj[g];
									var keys = Object.keys(el);
									keys.forEach(function(it) {
										var o = el[it];
										if (it == "USER_ID") {
											ele.vendorContactId = el[it];
										} else {
											ele[it] = el[it];
										}
									});
								}
							} else {
								var keys = Object.keys(obj);
								keys.forEach(function(it) {
									var o = obj[it];
									if (it == "USER_ID") {
										ele.vendorContactId = obj[it];
									} else {
										ele[it] = obj[it];
									}
								});
							}
						}
					}
				});
				console.log("fillElement  " + JSON.stringify(ele));
				return ele;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.address-select-box {
		position: relative;
		padding: 20rpx 20rpx 0 20rpx;

		.address-select-box-main {
			display: flex;
			flex-wrap: wrap;
			background-color: #fff;
			justify-content: space-between;
			border-radius: 20rpx;

			.address-selected {
				padding: 20rpx 40rpx;

				.top {
					display: flex;
					font-weight: bold;
					font-size: 34rpx;

					.phone {
						margin-left: 60rpx;
					}
				}

				.bottom {
					display: flex;
					margin-top: 20rpx;
					font-size: 28rpx;
					justify-content: space-between;
					color: #999999;
				}
			}

			.address-not {
				padding: 40rpx 40rpx;
				font-size: 36rpx;

				.text {
					margin-left: 10rpx;
				}
			}

			.companyName {
				width: 100%;
				height: 50rpx;
				padding-left: 40rpx;
			}
		}

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-right: 20rpx;
		}
	}

	.goods-box {
		padding: 20rpx 20rpx 0;

		.other-info {
			width: calc(100% - 200rpx) !important;

			.number {
				text-align: center;
			}
		}
	}

	.order-create-tabbar-area-bottom {
		height: 120rpx;
	}

	.order-create-tabbar {
		border-top: 1px solid #ccc;
		background-color: #fff;
		display: flex;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		position: fixed;
		padding: 0 30rpx;
		bottom: 0;
		justify-content: space-between;

		.left {
			font-size: 32rpx;
			color: #6a6a6a;

			.goods-num {
				color: #000000;
				font-weight: 700;
			}
		}
	}

	.price {
		color: #e41f19;
		font-weight: 700;
	}

	.other-box {
		margin: 20rpx;

		.coupon-select {
			color: #333;
		}

		.coupon-discount {
			color: #e41f19;
		}

		.group {
			border-radius: 20rpx;

			/deep/ .u-cell-item-box {
				border-radius: 20rpx;
			}
		}
	}
</style>
