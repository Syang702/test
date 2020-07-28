<template>
	<view class="homes">
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<!-- 头像区域 -->
		<view class="homes-title" @click="toUser()">
			<view class="homes-title-left"><image :src="userList.image"></image></view>
			<view class="homes-title-center">
				<view class="homes-title-center-list">会员ID：{{ userList.id }}</view>
				<view class="homes-title-center-list">手机号：{{ userList.phone }}</view>
			</view>
			<view class="homes-title-right"><u-icon name="arrow-right" color="#fff"></u-icon></view>
		</view>
		<!-- 余额明细 -->
		<view class="homes-money">
			<view class="homes-money-list">
				<view class="homes-money-list-top">0</view>
				<view class="homes-money-list-bottom">优惠券</view>
			</view>
			<view class="homes-money-list">
				<view class="homes-money-list-top">{{ userList.integral }}</view>
				<view class="homes-money-list-bottom">积分</view>
			</view>
			<view class="homes-money-list">
				<view class="homes-money-list-top">{{ userList.money }}</view>
				<view class="homes-money-list-bottom">余额(元)</view>
			</view>
		</view>
		<!-- 订单区域 -->
		<view class="homes-order">
			<view class="homes-order-title">
				<view class="homes-order-title-box" @click="clickAllOrder(0)">
					<view class="homes-order-title-box-left">
						<u-icon name="order" color="#ffd944" size="40"></u-icon>
						<text>我的订单</text>
					</view>
					<view class="homes-order-title-box-right">
						<text>查看全部订单</text>
						<u-icon name="arrow-right" color="#909090" size="30"></u-icon>
					</view>
				</view>
			</view>
			<!-- 列表 -->
			<view class="homes-order-box">
				<view class="homes-order-box-list" @click="clickAllOrder(1)">
					<view class="homes-order-box-list-top">
						<u-icon name="red-packet" color="#2979ff" size="50"></u-icon>
						<view class="orderNum" v-show="orderState1.length > 0">{{ orderState1.length }}</view>
					</view>
					<view class="homes-order-box-list-bottom">待支付</view>
				</view>
				<view class="homes-order-box-list" @click="clickAllOrder(2)">
					<view class="homes-order-box-list-top">
						<u-icon name="calendar" color="#f37b1d" size="50"></u-icon>
						<view class="orderNum" v-show="orderState2.length > 0">{{ orderState2.length }}</view>
					</view>
					<view class="homes-order-box-list-bottom">待发货</view>
				</view>
				<view class="homes-order-box-list" @click="clickAllOrder(3)">
					<view class="homes-order-box-list-top">
						<u-icon name="car" color="rgb(118 211 72)" size="50"></u-icon>
						<view class="orderNum" v-show="orderState3.length > 0">{{ orderState3.length }}</view>
					</view>
					<view class="homes-order-box-list-bottom">待收货</view>
				</view>
				<view class="homes-order-box-list" @click="clickAllOrder(4)">
					<view class="homes-order-box-list-top">
						<u-icon name="heart" color="red" size="50"></u-icon>
						<view class="orderNum" v-show="orderState4.length > 0">{{ orderState4.length }}</view>
					</view>
					<view class="homes-order-box-list-bottom">待评价</view>
				</view>
				<view class="homes-order-box-list">
					<view class="homes-order-box-list-top">
						<u-icon name="rmb-circle" size="50"></u-icon>
						<view class="orderNum" v-show="orderState5.length > 0">{{ orderState5.length }}</view>
					</view>
					<view class="homes-order-box-list-bottom">退款</view>
				</view>
			</view>
		</view>
		<view class="home-info">
			<u-cell-group>
				<u-cell-item icon="man-add" title="收获地址" @click="toAddress()"></u-cell-item>
				<u-cell-item icon="share" title="邀请好友" @click="toShare()"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="home-info">
			<u-cell-group>
				<u-cell-item icon="phone" title="联系电话" @click="toTel()"></u-cell-item>
				<u-cell-item icon="chat" title="意见反馈" @click="toOpinion()"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="home-info">
			<u-cell-group><u-cell-item icon="question-circle" @click="toAbout()" title="关于"></u-cell-item></u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userList: {},
			orderState1: 0,
			orderState2: 0,
			orderState3: 0,
			orderState4: 0,
			orderState5: 0
		};
	},
	onLoad() {},
	// onShow() {
	// 	let token = uni.getStorageSync('token');
	// 	if (!token) {
	// 		uni.showModal({
	// 			title: '温馨提示',
	// 			content: '你还没有登陆,现在去登陆?',
	// 			success: function(res) {
	// 				if (res.confirm) {
	// 					uni.navigateTo({
	// 						url: '/pages/login/login'
	// 					});
	// 				} else if (res.cancel) {
	// 					uni.switchTab({
	// 						url: '/pages/home/home'
	// 					});
	// 				}
	// 			}
	// 		});
	// 	}
	// },
	methods: {
		clickAllOrder(id) {
			uni.navigateTo({
				url: '/pages/allOrder/allOrder?id=' + id
			});
		},
		toTel() {
			uni.showModal({
				title: '联系电话',
				content: '0371 - 88888888'
			});
		},
		toShare() {
			uni.showModal({
				title: '提示',
				content: '本功能开发中'
			});
		},
		toUser() {
			uni.navigateTo({
				url: '/pages/user/user',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		toAddress() {
			uni.navigateTo({
				url: '/pages/address/address',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		toAbout() {
			uni.navigateTo({
				url: '/pages/about/about',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		toOpinion() {
			uni.navigateTo({
				url: '/pages/opinion/opinion',
				animationType: 'pop-in',
				animationDuration: 200
			});
		}
	},
	onShow() {
		this.requestByToken('index/getHome', 'get', {}).then(res => {
			this.userList = res.data.data.userList;
			uni.setStorageSync('userInfo', res.data.data.userList);
			let orderState = res.data.data.orderNumber;
			this.orderState1 = orderState.filter(item => {
				return item.order_states == 1;
			});
			this.orderState2 = orderState.filter(item => {
				return item.order_states == 2;
			});
			this.orderState3 = orderState.filter(item => {
				return item.order_states == 3;
			});
			this.orderState4 = orderState.filter(item => {
				return item.order_states == 4;
			});
			this.orderState5 = orderState.filter(item => {
				return item.order_states === 5 || item.order_states === 6;
			});
		});
	}
};
</script>

<style lang="scss" scoped>
.homes {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	overflow-x: hidden;
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #3bba63;
		color: #ffffff;
	}
	/* 头像区域 */
	.homes-title {
		width: 100%;
		height: 206rpx;
		padding: 44rpx 0;
		box-sizing: border-box;
		background: #3bba63;
		display: flex;
		justify-content: space-between;
		.homes-title-left {
			width: 176rpx;
			height: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			image {
				width: 100%;
				height: 100%;
				border-radius: 59rpx;
			}
		}
		.homes-title-center {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: wrap;
			.homes-title-center-list {
				width: 100%;
				height: 40rpx;
				font-size: 26rpx;
				color: #ffffff;
				line-height: 40rpx;
			}
		}
		.homes-title-right {
			width: 84rpx;
			text-align: center;
			line-height: 118rpx;
		}
	}
	/* 余额明细 */
	.homes-money {
		width: 100%;
		height: 150rpx;
		margin-bottom: 20rpx;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		.homes-money-list {
			width: 33%;
			height: 150rpx;
			padding-top: 35rpx;
			box-sizing: border-box;
			.homes-money-list-top {
				width: 100%;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				font-size: 24rpx;
				font-weight: 700;
				color: #322f30;
			}
			.homes-money-list-bottom {
				width: 100%;
				height: 40rpx;
				text-align: center;
				line-height: 40rpx;
				font-size: 24rpx;
				color: #4a4a4a;
			}
		}
	}
	/* 订单区域 */
	.homes-order {
		width: 100%;
		height: 280rpx;
		background: #ffffff;
		.homes-order-title {
			width: 100%;
			height: 95rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
			.homes-order-title-box {
				width: 100%;
				height: 100%;
				border-bottom: 1px solid #ebebeb;
				display: flex;
				justify-content: space-between;
				padding: 0 36rpx 0 10rpx;
				box-sizing: border-box;
				line-height: 94rpx;
				.homes-order-title-box-left text {
					margin-left: 20rpx;
					color: #0f0f0f;
					font-size: 30rpx;
				}
				.homes-order-title-box-right text {
					color: #c6c6c6;
					font-size: 30rpx;
				}
			}
		}
		.homes-order-box {
			width: 100%;
			height: 180rpx;
			padding-top: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			.homes-order-box-list {
				width: 20%;
				height: 150rpx;
				text-align: center;
				.homes-order-box-list-top {
					width: 100%;
					height: 76rpx;
					line-height: 76rpx;
					background: #ffffff;
					position: relative;
					.orderNum {
						position: absolute;
						right: 30rpx;
						top: -20rpx;
						width: 40rpx;
						height: 40rpx;
						line-height: 40rpx;
						color: #fff;
						font-size: 28rpx;
						font-weight: 600;
						border-radius: 50%;
						background-color: red;
					}
				}
				.homes-order-box-list-bottom {
					width: 100%;
					height: 76rpx;
					line-height: 60rpx;
					color: #131313;
					font-size: 26rpx;
				}
			}
		}
	}
}
</style>
