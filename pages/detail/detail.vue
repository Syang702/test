<template>
	<!-- 商品详情页 -->
	<view class="detail">
		<view class="status_bar"><!-- 状态栏 --></view>
		<scroll-view scroll-y="true" class="detail-scroll">
			<view class="swiper"><u-swiper :list="swiperList" height="700"></u-swiper></view>
			<view class="shoping-buy" v-if="goodInfo.buy === 1">
				<view class="shoping-buy-left">
					疯狂抢购
					<text>抢购中</text>
				</view>
				<view class="shoping-buy-right">
					<text>距结束</text>
					<u-count-down :timestamp="timestamp" font-size="32" color="green" separator-color="#fd6069"></u-count-down>
				</view>
			</view>
			<view class="shoping-name">{{ goodInfo.name }}</view>
			<view class="shoping-describe">{{ goodInfo.bewrite }}</view>
			<view class="shoping-pick">
				<text>￥{{ goodInfo.price }}</text>
			</view>
			<view class="shoping-time">
				<view class="shoping-time-list">
					<u-icon name="clock-fill"></u-icon>
					最快29分送达
				</view>
			</view>
			<view class="shoping-hr"></view>
			<view class="shoping-Specifications">
				<view class="shoping-Specifications-name">规格</view>
				<view class="shoping-Specifications-list">
					<view class="shoping-Specifications-list-left">净含量</view>
					<view class="shoping-Specifications-list-right">{{ goodInfo.weight }}</view>
				</view>
				<view class="shoping-Specifications-list">
					<view class="shoping-Specifications-list-left">保存条件</view>
					<view class="shoping-Specifications-list-right">{{ goodInfo.conditions }}</view>
				</view>
				<view class="shoping-Specifications-list">
					<view class="shoping-Specifications-list-left">保质期</view>
					<view class="shoping-Specifications-list-right">{{ goodInfo.shelf_life }}</view>
				</view>
			</view>
			<view class="shoping-hr"></view>
			<view class="shoping-imgs"><image v-for="(item, index) in goodInfo.propaganda" :key="index" :src="item.url"></image></view>
			<view class="shoping-foot">我也是有底线的~</view>
		</scroll-view>
		<view class="shopping-car">
			<view class="shopping-car-left" @click="toCar">
				<view class="carNumber" v-show="carNumber > 0">{{ carNumber }}</view>
				<u-icon name="shopping-cart" size="60"></u-icon>
			</view>
			<view class="shopping-car-right">
				<u-button type="warning" size="medium" shape="square" @click="addCars()">加入购物车</u-button>
				<u-button type="error" size="medium" shape="square" @click="buy()">立即购买</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperList: [],
			timestamp: 86400,
			goodInfo: {},
			carNumber: 0
		};
	},
	onLoad(options) {
		this.request('nottoken/searchGood', 'get', {
			id: options.id
		}).then(res => {
			res.data.data.carousel = JSON.parse(res.data.data.carousel);
			res.data.data.propaganda = JSON.parse(res.data.data.propaganda);
			this.goodInfo = res.data.data;
			res.data.data.propaganda.forEach(item => {
				this.swiperList.push({ image: item.url, title: item.name });
			});
		});
		this.timestamp = 86400 - this.currentTime();
	},
	onShow() {
		this.carNumber = this.$store.state.carList.length;
	},
	methods: {
		//当前时间
		currentTime() {
			let date = new Date();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();
			return (hour * 60 + minute) * 60 + second + 1;
		},
		toCar() {
			uni.switchTab({
				url: '/pages/car/car',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		//加购物车
		addCars() {
			console.log(this.goodInfo);
			let carGoods = {
				id: this.goodInfo.id,
				name: this.goodInfo.name,
				number: 1,
				url: this.goodInfo.propaganda[0].url,
				price: parseFloat(this.goodInfo.price), //解析一个字符串，并返回一个浮点数。
				checked: false,
				val: '0'
			};
			this.$store.commit('addCars', carGoods);
			uni.showToast({
				title: '成功添加购物车',
				icon: 'success',
				duration: 2000
			});
			this.carNumber = this.$store.state.carList.length;
		},
		buy() {}
	}
};
</script>

<style lang="scss" scoped>
.detail {
	width: 100%;
	height: 100%;
	background: #ffffff;
	.status_bar {
		//自动计算导航栏高度
		height: var(--status-bar-height);
		width: 100%;
		// background-image: linear-gradient(left top, #6c37b4, #e4038e);
		color: #ffffff;
	}
	.detail-scroll {
		width: 100%;
		height: calc(100% - var(--status-bar-height));
		padding-bottom: 100rpx;
		box-sizing: border-box;
		.shoping-buy {
			width: 100%;
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 24rpx;
			.shoping-buy-left {
				width: 480rpx;
				height: 88rpx;
				background: #f14143;
				padding-left: 22rpx;
				line-height: 88rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				color: #ffffff;
				.shoping-buy-left text {
					font-size: 24rpx;
					margin-left: 15rpx;
				}
			}
			.shoping-buy-right {
				width: 270rpx;
				height: 88rpx;
				background: #feefe8;
				color: #f1627d;
				text-align: center;
				line-height: 88rpx;
				font-size: 22rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.shoping-name {
			width: 100%;
			height: 48rpx;
			font-size: 32rpx;
			color: #151513;
			padding-left: 20rpx;
			box-sizing: border-box;
			line-height: 48rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			font-weight: 600;
		}
		.shoping-describe {
			width: 100%;
			height: 44rpx;
			font-size: 26rpx;
			color: #878787;
			padding-left: 20rpx;
			box-sizing: border-box;
			line-height: 44rpx;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.shoping-pick {
			width: 100%;
			height: 50rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #878787;
			padding-left: 20rpx;
			box-sizing: border-box;
			line-height: 50rpx;
			color: #f25d65;
		}
		.shoping-time {
			width: 100%;
			height: 76rpx;
			line-height: 76rpx;
			padding-left: 20rpx;
			box-sizing: border-box;
		}
		.shoping-hr {
			width: 100%;
			height: 20rpx;
			background: #f8f4f5;
		}
		.shoping-Specifications-name {
			width: 100%;
			height: 76rpx;
			padding-left: 20rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			color: #2f2f2f;
			font-weight: 800;
			line-height: 76rpx;
		}
		.shoping-Specifications-list {
			width: 100%;
			height: 88rpx;
			border-top: 1px solid #ededed;
			line-height: 88rpx;
			font-size: 24rpx;
			padding-left: 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.shoping-Specifications-list-left {
				width: 210rpx;
				height: 88rpx;
				color: #606060;
			}
			.shoping-Specifications-list-right {
				width: 540rpx;
				height: 88rpx;
				color: #3f3f3f;
			}
		}
		.shoping-imgs {
			width: 100%;
			overflow-x: hidden;
			font-size: 0;
			padding: 0 25rpx;
			box-sizing: border-box;
			font-size: 0;
			.shoping-imgs image {
				width: 100%;
				height: 700rpx;
			}
		}
		.shoping-foot {
			width: 100%;
			height: 100rpx;
			background: #f8f4f5;
			display: flex;
			justify-content: center;
			line-height: 100rpx;
			color: #999999;
			.shoping-foot text {
				color: #999999;
			}
		}
	}
	.shopping-car {
		width: 100%;
		height: 100rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 666;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		.shopping-car-left {
			width: 100rpx;
			position: relative;
			display: flex;
			align-items: center;
			.carNumber {
				position: absolute;
				top: 0rpx;
				right: 0rpx;
				z-index: 888;
				font-size: 30rpx;
				font-weight: 400;
				background-color: red;
				color: #ffff;
				border-radius: 50%;
				width: 40rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
			}
		}
		.shopping-car-right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 500rpx;
			.u-btn.u-size-medium {
				width: 200rpx;
			}
		}
	}
}
</style>
