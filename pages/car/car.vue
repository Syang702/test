/* 购物车 */
<template>
	<view class="commen-index">
		<view class="car-emptys" v-if="carList.length == 0">
			<text class="icon iconfont icon-gouwuchekong1"></text>
			<navigator class="car-emptys-btns" url="../home/home" open-type="switchTab">去逛逛</navigator>
		</view>
		<view v-else class="commen-content">
			<scroll-view scroll-y style="height: 100%; width: 100%">
				<view class="car-list" v-for="(item, index) in carList" :key="index">
					<view class="check-box">
						<u-checkbox v-model="item.checked" :name="item.vendorName" shape="circle"
							@change="shopChange(item)">{{ item.vendorName }}
						</u-checkbox>
					</view>
					<u-swipe-action v-for="(every, i) in item.shopcar" :show="every.show" :index="i" :key="every.id"
						@click="delCart(every)" :options="options">
						<view class="car-every">
							<view class="checkbox">
								<u-checkbox v-model="every.checked" shape="circle" @change="goodsChange(item, every)">
								</u-checkbox>
							</view>
							<view class="image" @tap="toDetail(every.id)">
								<image :src="every.url" mode=""></image>
							</view>
							<view class="other-info">
								<view class="title" @tap="toDetail(every.id)">{{
                                    every.name
                                }}</view>
								<view class="spu">
									<text>{{ every.spu }}</text>
								</view>
								<view class="price">￥{{ every.price }}</view>
								<view class="number">
									<u-number-box v-model="every.number" :min="1" :max="10"
										@change="numChange(every, every.number)"></u-number-box>
								</view>
							</view>
						</view>
					</u-swipe-action>
				</view>
			</scroll-view>
			<view class="footer">
				<view class="total" v-if="isEdit">
					合计：<text>{{ allPrice.toFixed(2) }}</text>
				</view>
				<view class="button">
					<u-button v-if="isEdit" type="primary" @click="toPay" shape="circle">去结算</u-button>
					<u-button v-if="!isEdit" type="error" @click="delAll" shape="circle">删除</u-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		shoppingCartQuery,
		removeShopItem,
		getShopingNum,
		createDzOrderFromcart,
	} from "../../config/api.js";

	var userInfo = {};

	export default {
		data() {
			return {
				// BASE_IMG_URL: getApp().globalData.$BASE_IMG_URL,
				moneyTotal: 0.0,
				flag: "激活",
				allPrice: 0,
				isEdit: true,
				carList: [],
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#dd524d",
					},
				}, ],
			};
		},
		computed: {},
		onLoad() {
			this.shoppingCartQuery();
		},
		onShow() {
			this.$store.dispatch("setCarBadge");
			// this.shoppingCartQuery();
		},
		methods: {
			shoppingCartQuery() {
				shoppingCartQuery().then((res) => {
					console.log("shoppingCartQuery " + JSON.stringify(res));
					userInfo = res.data.userInfo;
					var vendorList = res.data.Datas; // 店铺名
					var productList = res.data.Datas1; // 商品名
					if (vendorList != null && vendorList.length > 0) {
						for (var n in vendorList) {
							var productInfos = this.getmylist(
								productList,
								vendorList[n].vendorId,
								"vendorId"
							);
							var productsHtml = "";

							var shopPros = [];
							for (var m in productInfos) {
								var shopcar = {};
								var productInfo = productInfos[m];
								var unitPrice = 0;
								var proPirceJson = JSON.parse(productInfo.unitPrice);
								if (proPirceJson.length > 0) {
									unitPrice = JSON.stringify(proPirceJson[0].priceinfo);
									var priceInfoArr = JSON.parse(unitPrice);
									var buyNum = productInfo.quantity;
									for (var x = 0; x < priceInfoArr.length; x++) {
										if (
											(buyNum >= priceInfoArr[x].qtyStart &&
												buyNum <= priceInfoArr[x].qtyEnd) ||
											(priceInfoArr[x].qtyStart == 0 &&
												priceInfoArr[x].qtyEnd == 0)
										) {
											shopcar.price = priceInfoArr[x].price;
										}
									}
								} else {
									shopcar.price = 0;
								}

								shopcar.url = this.BASE_IMG_URL + productInfo.imgUrl;
								shopcar.spu = productInfo.color;
								shopcar.name = productInfo.itemName;
								shopcar.dataPricesJsonStr = unitPrice;
								shopcar.number = productInfo.quantity;
								shopcar.id = productInfo.cartId;
								shopcar.checked = false;
								shopcar.poType = productInfo.poType;
								shopcar.vendorType = productInfo.vendorType;
								shopcar.ioId = productInfo.ioId;
								shopcar.vendorContactId = productInfo.vendorContactId;
								shopcar.itemId = productInfo.itemId;
								shopcar.vendorId = productInfo.vendorId;
								shopcar.vendorName = vendorList[n].vendorName;
								shopcar.show = false;
								shopPros[m] = shopcar;
							}

							if (shopPros.length > 0) {
								var cartInfo = {};
								cartInfo.vendorName = vendorList[n].vendorName;
								cartInfo.checked = false;
								cartInfo.id = n;
								cartInfo.shopcar = shopPros;
								this.carList[n] = cartInfo;
							}
						}
					}
					console.log("用赋值,触发更新产品列表事件????????????????????????????");
					this.flag = Math.random();
				});
			},
			toDetail(id) {
				//进入商品详情页
				uni.navigateTo({
					url: "/pages/goods/goods-detail?id=" + id,
					animationType: "pop-in",
					animationDuration: 200,
				});
			},
			shopChange(item) {
				// 店铺商品选中
				item.checked = !item.checked;
				item.shopcar.forEach((i) => {
					i.checked = item.checked;
				});
				this.isCheckAll();
				this.updateTotalPrice();
			},
			goodsChange(item, every) {
				// 单个商品选中
				every.checked = !every.checked;
				let arr_1 = [];
				item.shopcar.forEach((i) => {
					if (i.checked == true) arr_1.push(i);
				});
				item.checked = arr_1.length == item.shopcar.length ? true : false;
				this.isCheckAll();
				this.updateTotalPrice();
			},
			isCheckAll() {
				//全选调用
				let arr_ = [];
				this.carList.forEach((j) => {
					if (j.checked == true) arr_.push(j);
				});
				// this.checkedAll = arr_.length == this.carList.length ? true : false
			},
			numChange(productObj, number) {
				//改变商品数量
				var priceInfoArr = JSON.parse(productObj.dataPricesJsonStr);
				for (var x = 0; x < priceInfoArr.length; x++) {
					if (
						(number >= priceInfoArr[x].qtyStart && number <= priceInfoArr[x].qtyEnd) ||
						(priceInfoArr[x].qtyStart == 0 && priceInfoArr[x].qtyEnd == 0)
					) {
						console.log(
							"!!!!!!!!!!!!!! 有问题,不会动态改变list里面的产品价格 !!!!!!!!!!!!!!!!"
						);
						productObj.price = priceInfoArr[x].price;
					}
				}
				console.log("选中 " + JSON.stringify(this.carList));
				this.updateTotalPrice();

				console.log("用赋值,触发更新产品列表事件????????????????????????????");
				this.flag = Math.random();
			},
			updateTotalPrice() {
				var productArray = this.carList;
				var totalP = 0;
				for (var i = 0; i < productArray.length; i++) {
					var productsInfo = productArray[i].shopcar;
					for (var l = 0; l < productsInfo.length; l++) {
						if (productsInfo[l].checked) {
							totalP = totalP + productsInfo[l].price * productsInfo[l].number;
						}
					}
				}
				this.allPrice = totalP;
			},
			delCart(item) {
				console.log("delCart " + JSON.stringify(item));
				var cartId = item.id;
				var data = {
					cartId: cartId,
				};
				removeShopItem(data).then((res) => {
					if (res.code == 0) {
						this.getShopingNum();
						this.shoppingCartQuery();
					} else {
						this.$refs.uToast.show({
							title: res.data == "" ? res.message : res.data,
							type: "error",
						});
					}
				});
			},
			toPay() {
				var checkCars = [];
				for (var i = 0; i < this.carList.length; i++) {
					var item = this.carList[i];
					checkCars = item.shopcar.filter((it) => {
						return it.checked == true;
					});
				}

				if (checkCars.length == 0) {
					this.$refs.uToast.show({
						title: "请先选择商品",
						type: "error",
					});
					return;
				}

				var fullJsonObj = {};
				var cartItemContent = checkCars[0];
				fullJsonObj.vendorType = cartItemContent.vendorType;
				fullJsonObj.vendorId = cartItemContent.vendorId;
				fullJsonObj.poType = cartItemContent.poType;
				fullJsonObj.vendorContactId = cartItemContent.vendorContactId;
				fullJsonObj.ioId = cartItemContent.ioId;

				fullJsonObj.realityPayAmount = this.allPrice;
				fullJsonObj.createType = "2";
				fullJsonObj.authorizationStatus = "INCOMPLETE";
				fullJsonObj.isCreditRebate = "N";
				fullJsonObj.neetPayAmount = this.allPrice;
				fullJsonObj.projectId = "1007172";
				fullJsonObj.createdBy = userInfo.userId;
				fullJsonObj.extTypeCode = "2";
				//以下为页面展示所需元素
				fullJsonObj.dropShipFlg = "0";
				fullJsonObj.vendorName = cartItemContent.vendorName;

				var poline = [];
				for (var i = 0; i < checkCars.length; i++) {
					var productsInfo = checkCars[i];
					var paramJson = {};
					paramJson.quantity = productsInfo.number;
					paramJson.actualUnitPrice = productsInfo.price;
					paramJson.unitPrice = productsInfo.price;
					paramJson.itemId = productsInfo.itemId;
					paramJson.itemDescription = productsInfo.name;
					paramJson.presentQuantity = 0; //赠送机数量
					paramJson.projectId = "1007172";
					paramJson.ioId = productsInfo.ioId;
					paramJson.unitOfIssue = "台"; //产品单位
					paramJson.color = productsInfo.spu;
					//以下为页面展示所需元素
					paramJson.vendorId = productsInfo.vendorId;
					paramJson.promoteApplyHeaderId = "";
					paramJson.imgUrl = productsInfo.url;
					poline.push(paramJson);
				}
				fullJsonObj.poline = poline;

				var data = {
					params: JSON.stringify(fullJsonObj),
				};
				console.log(JSON.stringify(data));
				createDzOrderFromcart(data).then((res) => {
					console.log("createDzOrderFromcart " + JSON.stringify(res));
					if (res.code == 0) {
						uni.removeStorageSync("poInfo");
						uni.setStorageSync("poInfo", JSON.stringify(res.data));
						uni.navigateTo({
							url: "/pages/goods/order-create",
							animationType: "pop-in",
							animationDuration: 200,
						});
					} else {
						this.$refs.uToast.show({
							title: res.data == "" ? res.message : res.data,
							type: "error",
						});
					}
				});
			},
			getShopingNum() {
				getShopingNum().then((res) => {
					console.log("getShopingNum  " + JSON.stringify(res));
					var num = res.data.num;
					if (num > 0) {
						this.cartNum = num;
						this.cartNumShow = true;
					} else {
						this.cartNumShow = false;
					}
				});
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
		},
	};
</script>

<style lang="scss" scoped>
	.car-emptys {
		width: 100%;
		height: 800rpx;
		padding-top: 100rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		text {
			width: 100%;
			font-size: 400rpx;
			line-height: 1;
			text-align: center;
		}

		.car-emptys-btns {
			width: 300rpx;
			height: 80rpx;
			border-radius: 40rpx;
			color: #ffffff;
			background: #45c763;
			text-align: center;
			line-height: 80rpx;
			font-size: 36rpx;
		}
	}

	.commen-content {
		padding-bottom: 100rpx !important;

		.is-edit {
			height: 50rpx;
			padding-right: 30rpx;
			@include flex-center(flex-end, center);
		}

		.car-list {
			border-radius: 20rpx;
			padding: 20rpx 20rpx 20rpx 20rpx;
			background: #ffffff;
			margin-bottom: 20rpx;

			.check-box {
				margin: 0 auto 20rpx 3rpx;

				::v-deep.u-checkbox__label {
					padding-left: 20rpx;
				}
			}

			::v-deep.u-swipe-action {
				margin-bottom: 20rpx;
			}

			::v-deep.u-swipe-action:last-child {
				margin-bottom: 20rpx;
			}

			.car-every {
				display: flex;

				.checkbox {
					width: 60rpx;
					display: flex;
					align-items: center;

					::v-deep.u-checkbox__label {
						width: 26rpx;
						height: 34rpx;
					}
				}

				.image {
					width: 200rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 200rpx;
						height: 200rpx;
					}
				}

				.other-info {
					width: calc(100% - 260rpx);
					padding-left: 20rpx;
					display: flex;
					flex-wrap: wrap;

					.title {
						height: 84rpx;
						display: -webkit-box;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.spu {
						width: 100%;

						text {
							padding: 8rpx 20rpx;
							border-radius: 20rpx;
							background-color: #f3f4f6;
							color: #9c9c9c;
						}
					}

					.price {
						width: 45%;
						color: #f24444;
						margin-top: 20rpx;
					}

					.number {
						width: 55%;
						margin-top: 15rpx;
					}
				}
			}
		}
	}

	.footer {
		width: 100%;
		height: 100rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		@include flex-center(space-between, center);
		z-index: 99;
		background-color: #ffffff;

		.checkbox {
			width: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 30rpx;
		}

		.total {
			width: 330rpx;
			font-size: 30rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			text {
				color: #f24444;
			}
		}

		.button {
			width: calc(100% - 500rpx);
			height: 100%;
			@include flex-center;

			.u-btn {
				width: 70%;
				height: 70%;
			}
		}
	}
</style>
