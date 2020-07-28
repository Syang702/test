<template>
	<view class="order">
		<!-- 地址 -->
		<view class="order-address" @click="selectAddress()" v-if="list.id">
			<view class="order-address-name">{{ list.name }}</view>
			<view class="order-address-tel">{{ list.tel }}</view>
			<view class="order-address-location">{{ list.address }}</view>
			<view class="order-address-select"><u-icon name="arrow-right"></u-icon></view>
		</view>
		<view class="order-addressempty" @click="selectAddress()" v-if="!list.id">
			<view class="order-addressempty-left">
				<u-icon name="man-add-fill" color="blue" size="40"></u-icon>
				<text>请添加收货地址</text>
			</view>
			<view class="order-addressempty-right"><u-icon name="arrow-right"></u-icon></view>
		</view>
		<view class="order-hrs"></view>
		<view class="order-hr"></view>
		<!-- 订单商品 -->
		<view class="order-list">
			<scroll-view class="order-list-box" scroll-x="true">
				<view class="order-list-boxContent" :style="{ width: order.length * 110 + 'rpx' }">
					<view class="order-list-every" v-for="(item, index) in order" :key="index">
						<image :src="item.url"></image>
						<view class="order-list-every-line"></view>
					</view>
				</view>
			</scroll-view>
			<view class="order-list-icon" @click="orderList()">
				<text>共{{ order.length }}件</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<!-- 配送时间 -->
		<u-cell-group>
			<u-cell-item title="预计送达时间" @click="timeShow = true">
				<text>{{ deliveryTime }}</text>
			</u-cell-item>
		</u-cell-group>
		<view class="order-remark">
			<u-form-item label="备注"><u-input v-model="remark" placeholder="备注信息" /></u-form-item>
		</view>
		<u-cell-group>
			<u-cell-item title="支付方式" @click="payShow = true">
				<text>{{ payMethod }}</text>
			</u-cell-item>
			<u-cell-item title="优惠券" @click="toCoupon()"><text>0张可用</text></u-cell-item>
			<u-cell-item title="商品金额" :arrow="false">
				<text>￥{{ orderPrice }}</text>
			</u-cell-item>
			<u-cell-item title="配送费" :arrow="false">
				<text>￥{{ courierFee }}</text>
			</u-cell-item>
			<u-cell-item title="增加积分" :arrow="false">
				<text>+{{ orderPrice }}</text>
			</u-cell-item>
		</u-cell-group>
		<!-- 提交订单 -->
		<view class="order-submit">
			<view class="order-total">￥{{ (Number(orderPrice) + Number(courierFee)).toFixed(2) }}元</view>
			<view class="order-btn"><u-button type="error" shape="circle" @click="submitOrder()">提交订单</u-button></view>
		</view>
		<!-- 配送时间 支付方式 优惠券弹出层 -->
		<u-picker mode="multiSelector" v-model="timeShow" :default-selector="[0, 0]" :range="timeArray" @confirm="changeTime"></u-picker>
		<u-picker mode="selector" v-model="payShow" :default-selector="[0]" :range="payArray" @confirm="changePay"></u-picker>
		<view><u-toast ref="uToast" /></view>
		<!-- 支付弹窗 -->
		<u-popup v-model="payMoneyShow" mode="center" border-radius="30" width="500rpx" height="300rpx" @close="closePay()">
			<view class="order-pay">
				<view class="order-pay-money">￥{{ payMoney.price }}</view>
				<view class="order-pay-method">支付方式&nbsp;&nbsp;&nbsp;{{ payMethod }}</view>
				<view class="order-pay-btn"><u-button type="success" shape="circle" @click="pay()">确认支付</u-button></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: {}, //地址
			timeShow: false,
			deliveryTime: '',
			timeArray: [
				['今天', '明天'],
				[
					'09:00~09:29',
					'09:30~09:59',
					'10:00~10:29',
					'10:30~10:59',
					'11:00~11:29',
					'11:30~11:59',
					'12:00~12:29',
					'12:30~12:59',
					'13:00~13:29',
					'13:30~13:59',
					'14:00~14:29',
					'14:30~14:59',
					'15:00~15:29',
					'15:30~15:59',
					'16:00~16:29',
					'16:30~16:59',
					'17:00~17:29',
					'17:30~17:59',
					'18:00~18:29',
					'18:30~18:59',
					'19:00~19:29',
					'19:30~19:59',
					'20:00~20:29',
					'20:30~20:59'
				]
			],
			remark: '', //备注
			payShow: false,
			payArray: ['零钱'],
			payMethod: '', //支付方式
			courierFee: '8', //配送费
			payMoneyShow: false,
			payMoney: {}
		};
	},
	methods: {
		selectAddress() {
			uni.navigateTo({
				url: '/pages/address/address'
			});
		},
		orderList() {
			uni.navigateTo({
				url: '/pages/orderList/orderList'
			});
		},
		changeTime(params) {
			this.deliveryTime = this.timeArray[0][params[0]] + this.timeArray[1][params[0]];
		},
		changePay(params) {
			this.payMethod = this.payArray[params[0]];
		},
		toCoupon() {
			this.$refs.uToast.show({
				title: '当前无可用优惠券',
				type: 'default'
			});
		},
		submitOrder() {
			//提交订单
			if (!this.list.id) {
				uni.showModal({
					title: '提示',
					content: '请选择配送地址',
					showCancel: false
				});
				return false;
			} else if (this.deliveryTime == '') {
				uni.showModal({
					title: '提示',
					content: '请选择配送时间',
					showCancel: false
				});
				return false;
			}
			let src = {
				order_address: this.list, //收货地址
				order_time: this.deliveryTime, //配送时间
				order_order: this.order, //订单
				order_price: this.orderPrice, //订单总金额
				order_delivery: this.courierFee, //快递费
				order_payment: this.payArray[0], //支付方式
				allPrice: (Number(this.orderPrice) + Number(this.courierFee)).toFixed(2), // 总价
				order_message: this.remark //备注
			};
			this.requestByToken('index/addOrder', 'post', src).then(res => {
				if (res.data.code == 0) {
					this.payMoney = res.data.data;
					this.payMoneyShow = true;
					this.$store.commit('removeCar');
				} else {
					uni.showModal({
						title: '提示',
						content: '订单提交失败',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/car/car'
								});
							}
						}
					});
				}
			});
		},
		pay() {
			this.requestByToken('index/addPays', 'post', {
				...this.payMoney
			}).then(res => {
				if (res.data.code === 0) {
					uni.showModal({
						title: '提示',
						content: '支付成功',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/car/car'
								});
							}
						}
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '支付失败',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								});
							}
						}
					});
				}
			});
		},
		closePay() {
			//支付弹窗关闭
			uni.switchTab({
				url: '/pages/my/my'
			});
		}
	},
	onLoad(options) {
		//初始进入默认选择第一个地址 ,从选择地址页面进入提交订单页面携带 地址id
		this.requestByToken('index/searchAddress', 'get', {}).then(res => {
			if (options.id) {
				//选择地址
				res.data.data.forEach(item => {
					if (options.id == item.id) {
						this.list = {
							id: item.id,
							tel: item.address_phone,
							name: item.address_name,
							address: item.address_province + item.address_city + item.address_county + item.address_addressDetail
						};
					}
				});
			} else {
				//默认地址
				this.list = {
					id: res.data.data[0].id,
					tel: res.data.data[0].address_phone,
					name: res.data.data[0].address_name,
					address: res.data.data[0].address_province + res.data.data[0].address_city + res.data.data[0].address_county + res.data.data[0].address_addressDetail
				};
			}
		});
		//配送时间
		// let allTime = [
		// 	'09:00~09:29',
		// 	'09:30~09:59',
		// 	'10:00~10:29',
		// 	'10:30~10:59',
		// 	'11:00~11:29',
		// 	'11:30~11:59',
		// 	'12:00~12:29',
		// 	'12:30~12:59',
		// 	'13:00~13:29',
		// 	'13:30~13:59',
		// 	'14:00~14:29',
		// 	'14:30~14:59',
		// 	'15:00~15:29',
		// 	'15:30~15:59',
		// 	'16:00~16:29',
		// 	'16:30~16:59',
		// 	'17:00~17:29',
		// 	'17:30~17:59',
		// 	'18:00~18:29',
		// 	'18:30~18:59',
		// 	'19:00~19:29',
		// 	'19:30~19:59',
		// 	'20:00~20:29',
		// 	'20:30~20:59'
		// ];
		// let date = new Date();
		// let Hour = date.getHours();//获取当前小时
		// let Minute = date.getMinutes();//分钟
		// console.log(Hour,Minute)
		this.payMethod = this.payArray[0];
	},
	computed: {
		order: function() {
			//订单商品
			return this.$store.state.checkCars;
		},
		orderPrice: function() {
			//商品总金额
			return this.$store.state.allPrice;
		}
	}
};
</script>

<style lang="scss" scoped>
.order {
	width: 100%;
	height: 100%;
	padding-bottom: 100rpx;
	box-sizing: border-box;
	background-color: #f5f5f5;
	// 配送地址
	.order-address {
		width: 100%;
		height: 160rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background: #ffffff;
		display: flex;
		flex-wrap: wrap;
		.order-address-name {
			width: 30%;
			font-size: 32rpx;
		}
		.order-address-tel {
			width: 70%;
			font-size: 32rpx;
		}
		.order-address-location {
			width: 90%;
			font-size: 32rpx;
		}
		.order-address-select {
			width: 10%;
			display: flex;
			justify-content: flex-end;
		}
	}
	.order-addressempty {
		width: 100%;
		height: 160rpx;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		.order-addressempty-left {
			display: flex;
			align-items: center;
		}
	}
	.order-hrs {
		width: 100%;
		height: 10rpx;
		background-image: repeating-linear-gradient(-45deg, #fd3ff7 0, #fd3ff7 5%, #ffffff 5%, #ffffff 10%, #367dff 10%, #367dff 15%, #ffffff 15%, #ffffff 20%);
	}
	.order-hr {
		width: 100%;
		height: 20rpx;
		background: #f5f5f5;
	}
	/* 商品列表 */
	.order-list {
		width: 100%;
		height: 170rpx;
		background: #ffffff;
		display: flex;
		justify-content: center;
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		.order-list-box {
			width: 80%;
			height: 110rpx;
			overflow: hidden;
			.order-list-boxContent {
				width: 100%;
				height: 100%;
				display: flex;
				.order-list-every {
					width: 140rpx;
					height: 110rpx;
					display: flex;
					image {
						width: 110rpx;
						height: 100%;
					}
					.order-list-every-line {
						width: 30rpx;
						height: 110rpx;
					}
				}
			}
		}
		.order-list-icon {
			width: 20%;
			height: 110rpx;
			line-height: 110rpx;
			text-align: right;
			text {
				color: #787878;
				font-size: 32rpx;
				margin-right: 10rpx;
			}
		}
	}
	.order-remark {
		width: 100%;
		background-color: #ffffff;
		padding: 0 30rpx;
	}
	.order-submit {
		width: 100%;
		height: 100rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		.order-total {
			width: 75%;
			height: 100%;
			display: flex;
			align-items: center;
		}
		.order-btn {
			width: 25%;
			height: 100%;
			display: flex;
			align-items: center;
		}
	}
	/* 支付弹窗 */
	.order-pay {
		width: 100%;
		height: 100%;
		.order-pay-money {
			width: 100%;
			height: 40%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 40rpx;
			font-weight: 700;
		}
		.order-pay-method {
			width: 100%;
			height: 20%;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.order-pay-btn {
			width: 100%;
			height: 40%;
			padding: 10rpx 30rpx;
			box-sizing: border-box;
		}
	}
}
</style>
