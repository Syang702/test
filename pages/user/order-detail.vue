/* 订单详情 */
<template>
	<view class="index">
		<scroll-view scroll-y style="height: 100%;width: 100%;">
			<view class="order-status" v-if="res.canCancle == 'Y'">
				待收货,查看物流
			</view>
			<view class="logistic-status">
				<view class="logistic-icon1">
					<u-icon name="car-fill" :size="30" color="#219eec"></u-icon>
				</view>
				<view class="logistic-info">
					会签通过。以后请按一个地市一个订单制作，便于后期核对管理。提交财务部审批提交采购物流部下发征询函
					<view class="logistic-time">2021-06-26 14:15:15</view>
				</view>
				<view class="logistic-icon2">
					<u-icon name="arrow-right" :size="30" color="#ccc"></u-icon>
				</view>
			</view>
			<view class="address-select-box">
				<view class="address-select-box-main">
					<view class="address-info">
						<view class="address-selected">
							<view class="top">
								<view class="name">{{ addressInfo.rcvContact}}</view>
								<!-- <view class="phone">{{ addressInfo.rcvContact }}</view> -->
							</view>
							<view class="bottom">
								{{ addressInfo.rcvSiteAddress }}
							</view>
						</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#CCC" size="36"></u-icon>
					</view>
				</view>
			</view>
			<view class="commen-order-goods-box">
				<view class="order" :key="orderInfo.poHeaderId">
					<view class="top">
						<view class="left">
							<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
							<view class="store">{{ orderInfo.vendorName }}</view>
						</view>
					</view>
					<view class="item" v-for="(item, index) in orderInfo.goodsList" :key="index">
						<view class="item-left">
							<view class="left">
								<image :src="BASE_IMG_URL + item.imgUrl" mode="aspectFill"></image>
							</view>
							<view class="content">
								<view class="title u-line-2">{{ item.itemDescription }}</view>
								<view class="type">尺码/规格：{{ item.color }}</view>
								<view class="delivery-time">备注： {{ item.remark }}</view>
							</view>
						</view>
						<view class="right">
							<view class="price">
								￥{{ item.unitPrice }}
							</view>
							<view class="number">x{{ item.quantity }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="other-box">
<!-- 				<u-cell-group>
					<u-cell-item title="商品总额" :value="orderInfo.neetPayAmount" :arrow="false"></u-cell-item>
					<u-cell-item title="运费" :value="orderInfo.deliverAmount" :arrow="false"></u-cell-item>
					<u-cell-item title="订单总价" :value="orderInfo.neetPayAmount" :arrow="false"></u-cell-item>
					<u-cell-item title="订单编号" :value="orderInfo.segment1" :arrow="false">
						<u-tag slot="right-icon" size="mini" border-color="#909399" color="#909399" text="复制"
							mode="plain" shape="circle" @click="setClipboard">
						</u-tag>
					</u-cell-item>
					<u-cell-item title="下单时间" :value="orderInfo.creationDate" :arrow="false"></u-cell-item>
				</u-cell-group> -->
			</view>
			<u-gap height="120"></u-gap>
		</scroll-view>
		<view class="order-create-tabbar">
			<div class="left"></div>
			<u-button type="default" size="medium" v-if="canCancle=='Y'" shape="circle" :custom-style="customBtnStyle"
				:loading="submitBtnLoading" @click="showModal=true">取消订单
			</u-button>
			<u-button type="error" size="medium" shape="circle" :custom-style="customBtnStyle"
				:loading="submitBtnLoading" @click="submitOrder" v-if="canPay=='Y'">去支付</u-button>
			<u-button type="error" size="medium" shape="circle" :custom-style="customBtnStyle"
				:loading="submitBtnLoading" @click="submitOrder" v-if="canConfirm=='Y'">确认收货</u-button>
		</view>
		<u-modal v-model="showModal" :show-title="false" :show-cancel-button="true" content="确定取消订单?"
			@confirm="cancelOrder"></u-modal>
	</view>
</template>

<script>
	import {
		getOrderDetailAPI
	} from '../../config/api.js'
	export default {
		computed: {},
		data() {
			return {
				// BASE_IMG_URL: getApp().globalData.$BASE_IMG_URL,
				addressInfo: {},
				couponList: [],
				selectCoupons: [],
				gatherOrder: "",
				submitBtnLoading: false,
				orderInfo: {},
				showModal: false,
				queryList: {},
				logisticsDetail: {
					comments: "",
					transferDate: ""
				}, //物流信息
				customBtnStyle: {
					paddingLeft: '40rpx',
					paddingRight: '40rpx',
					marginLeft: '20rpx',
				},
				canCancle: 'N', //取消订单
				canPay: 'N', //去支付
				canConfirm: 'N', //确认收货
			}
		},
		onLoad(e) {
			this.queryList.poHeaderId = e.poHeaderId;
			this.getOrderDetail();
		},
		methods: {
			getOrderDetail() {

				this.orderInfo = {};
				//获取订单详情数据
				getOrderDetailAPI(this.queryList).then(res => {
					var orderInfoJsonTemp = {};
					var lineInfoListTemp = [];
					let header = res.data.orderHeader; //订单头
					this.gatherOrder = header.payGatherOrder;
					let LinesList = res.data.linesList; //订单行
					let logisticsDetailList = res.data.logisticsDetailList; //物流信息
					if (logisticsDetailList.length > 0) { //物流信息
						this.logisticsDetail.comments = logisticsDetailList[0].comments;
						this.logisticsDetail.transferDate = logisticsDetailList[0].transferDate
					}

					orderInfoJsonTemp.poHeaderId = header.poHeaderId;
					orderInfoJsonTemp.authorizationStatusName = header.authorizationStatusName;
					this.addressInfo.rcvContact = header.rcvContact;
					this.addressInfo.rcvSiteAddress = header.rcvSiteAddress;
					orderInfoJsonTemp.vendorName = header.vendorName;
					orderInfoJsonTemp.neetPayAmount = header.neetPayAmount;
					orderInfoJsonTemp.deliverAmount = header.deliverAmount;
					orderInfoJsonTemp.segment1 = header.segment1;
					orderInfoJsonTemp.creationDate = header.creationDate;
					orderInfoJsonTemp.poHeaderId = header.poHeaderId;

					LinesList.forEach(line => {
						let tempLineJson = {};
						tempLineJson.imgUrl = line.imgUrl;
						tempLineJson.itemDescription = line.itemDescription;
						tempLineJson.unitPrice = line.unitPrice;
						tempLineJson.color = line.color;
						tempLineJson.quantity = line.quantity;
						tempLineJson.remark = line.remark;
						lineInfoListTemp.push(tempLineJson);
					})
					
					orderInfoJsonTemp.goodsList = lineInfoListTemp;
					if ((header.createdBy == header.currUserId) && header.authorizationStatus == "INCOMPLETE") {
						this.canCancle = "Y" //取消订单
					}

					var isBuyPhone = (header.createType == "2" || header.createType == "3" || header.createType ==
						"4" ||
						header.createType == "5" || header.createType == "6" || header.createType == "7" ||
						header.createType == "8" || header.createType == "9" || header.createType == "12" ||
						header.createType == "13" || header.createType == "21" || header.createType == "22" ||
						header.createType == "23" || header.createType == "24" || header.createType == "25" ||
						header.createType == "26" || header.createType == "27" || header.createType == "28");

					var canReceiveAndRefund = !(header.createType == "36" || header.createType == "37" ||
						header.createType == "38" || header.createType == "39" || header.createType == "40" ||
						header.createType == "41" || header.createType == "42" || header.createType == "43");
					if (header.authorizationStatus != "INCOMPLETE" && header.authorizationStatus != "CANCELLED" &&
						header.authorizationStatus != "RETURNED" && header.realityPayAmount != "" &&
						(header.onlinePayStatus != "交易成功") && (header.bnakRemitNumber == "" || header
							.bnakRemitNumber == null) &&
						header.offlinePay == "N" && header.showPayBtn != "N" && header.createdBy == header
						.currUserId) {
						if ((canReceiveAndRefund && header.realityPayAmount != "0") || header.createType == "36") {
							this.canPay = 'Y'
						}
					}

					if (header.authorizationStatus == "CONFIRM_PAYMENTED" && header.stockUpQtySum > 0 && header
						.quantityReceivedSum == 0 &&
						canReceiveAndRefund && header.createdBy == header.currUserId) {
						this.canConfirm = 'Y';
					}

					orderInfoJsonTemp.poHeaderId = header.poHeaderId;
					orderInfoJsonTemp.authorizationStatusName = header.authorizationStatusName;
					this.addressInfo.rcvContact = header.rcvContact;
					this.addressInfo.rcvSiteAddress = header.rcvSiteAddress;
					orderInfoJsonTemp.vendorName = header.vendorName;
					orderInfoJsonTemp.neetPayAmount = header.neetPayAmount;
					orderInfoJsonTemp.deliverAmount = header.deliverAmount;
					orderInfoJsonTemp.segment1 = header.segment1;
					orderInfoJsonTemp.creationDate = header.creationDate;
					orderInfoJsonTemp.poHeaderId = header.poHeaderId;
					
					if ((header.createdBy == header.currUserId) && header.authorizationStatus == "INCOMPLETE") {
						this.canCancle = "Y" //取消订单
					}
					this.orderInfo = orderInfoJsonTemp;
				})
			},
			setClipboard() {
				uni.setClipboardData({ //复制
					data: 'hello',
				});
			},
			cancelOrder() { //取消订单

			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			submitOrder() {
				let that = this
				that.submitBtnLoading = true
				setTimeout(function() {
					that.submitBtnLoading = false
				}, 2000);
				var successUrl =
					"/pages/goods/order-pay?act=GATHER_PAY&isAgain=Y&gatherOrder=" +
					this.gatherOrder +
					"&vendorType=1";
				uni.navigateTo({
					url: successUrl,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			gotoUseCoupon() {
				this.$myRouter.push({
					name: 'order/use_coupon',
					params: {
						good_ids: [1, 2]
					}
				})
			},
			gotoUseInvoice() {
				this.$myRouter.push({
					name: 'order/use_invoice',
					params: {
						good_ids: [1, 2]
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		width: 100%;
		height: 100vh;

		.order-status {
			background-color: #fff;
			height: 100rpx;
			@include flex-center;
			font-size: 36rpx;
			font-weight: 700;
		}

		.logistic-status {
			background-color: #fff;
			padding: 0 30rpx;
			display: flex;

			.logistic-icon1 {
				width: 120rpx;
			}

			.logistic-icon2 {
				width: 180rpx;
				@include flex-center(flex-end, flex-start);
			}

			.logistic-info {
				color: #219eec;

				.logistic-time {
					color: #606266;
					padding: 10rpx 0;
				}
			}
		}

		.address-select-box {
			position: relative;
			padding: 0 0 20rpx;

			.address-select-box-main {
				display: flex;
				background-color: #fff;
				justify-content: space-between;
				border-radius: 20rpx;

				.address-selected {
					padding: 40rpx 40rpx;

					.top {
						display: flex;
						font-weight: bold;

						.phone {
							margin-left: 60rpx;
						}
					}

					.bottom {
						display: flex;
						margin-top: 20rpx;
						justify-content: space-between;
						color: #999999;
					}
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

		.other-box {
			margin-top: 20rpx;

			::v-deep.u-cell-item-box {
				border-radius: 20rpx;

				.u-cell {
					padding: 10rpx 32rpx;

					.u-tag {
						margin-left: 10rpx;
					}
				}
			}
		}

		.order-create-tabbar {
			border-top: 1px solid #ccc;
			background-color: #fff;
			width: 100%;
			height: 100rpx;
			@include flex-center(flex-end, center);
			position: fixed;
			padding: 0 30rpx;
			bottom: 0;
			right: 0;
			z-index: 66;

			.left {
				width: 50%;
				height: 100%;
			}
		}
	}
</style>
