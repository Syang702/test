<template>
	<!-- 购物车 -->
	<view class="car">
		<scroll-view scroll-y="true" class="car-scroll">
			<view class="classBoxs">
				<view class="classBoxs-list" v-for="(item, index) in carList" :key="index">
					<view class="checkbox"><u-checkbox v-model="item.checked" shape="circle" @change="checkChange(item.id, item.checked)"></u-checkbox></view>
					<view class="image" @click="toDetail(item.id)"><image :src="item.url" mode=""></image></view>
					<view class="otherInfo">
						<view class="goodsName" @click="toDetail(item.id)">{{ item.name }}</view>
						<view class="price" @click="toDetail(item.id)">￥{{ item.price }}</view>
						<view class="number"><u-number-box v-model="item.number" :min="1" :max="10" @change="numChange(item.id, item.number)"></u-number-box></view>
					</view>
				</view>
			</view>
			<view class="classBoxs-emptys" v-if="carList.length == 0">
				<image src="../../static/images/car.png"></image>
				<navigator class="classBoxs-emptys-btns" url="../home/home" open-type="switchTab">去逛逛</navigator>
			</view>
			<view class="classBoxLive">好物推荐</view>
			<view class="like">
				<view class="like-every" v-for="item in likeList" :key="item.id">
					<image :src="item.propaganda[0].url" mode="" @click="toDetail(item.id)"></image>
					<view class="like-every-text" @click="toDetail(item.id)">{{ item.name }}</view>
					<view class="like-every-price" @click="toDetail(item.id)">￥{{ item.price }}</view>
					<view class="like-every-car" @click="addCars(item)"><u-icon size="60" name="shopping-cart" color="#3bb86a"></u-icon></view>
				</view>
			</view>
		</scroll-view>
		<view class="footer">
			<view class="checkbox"><u-checkbox v-model="checkedAll" shape="circle" @change="allCheck"></u-checkbox></view>
			<view class="total">合计:¥{{ $store.state.allPrice.toFixed(2) }}元</view>
			<view class="button"><u-button type="error" @click="addOrder" color="#354e44" shape="circle">结算</u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			likeList: [],
			checkedAll: false,
			moneyTotal: 0.0
		};
	},
	computed: {
		carList: function() {
			return this.$store.state.carList;
		}
	},
	onLoad() {
		let token = uni.getStorageSync('token');
		if (!token) {
			uni.showModal({
				title: '提示',
				content: '你还没有登陆,现在去登陆?',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					} else if (res.cancel) {
						uni.switchTab({
							url: '/pages/home/home'
						});
					}
				}
			});
		}
		this.infoGoods();
	},
	watch: {},
	methods: {
		toDetail(id) {
			//进入商品详情页
			uni.navigateTo({
				url: '/pages/detail/detail?id=' + id,
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		numChange(id, number) {
			//改变商品数量
			this.$store.commit('changeCarsNum', { id: id, number: number });
		},
		checkChange(id, check) {
			//是否选中
			this.$store.commit('changeCheck', { id: id, check: check });
			let flag = true;
			this.carList.forEach(item => {
				if (item.checked == true) {
					return (flag = true);
				} else {
					return (flag = false);
				}
			});
			if (flag == true) {
				this.checkedAll = true;
			} else {
				this.checkedAll = false;
			}
		},
		allCheck(checkStatus) {
			//全选
			if (this.carList.length == 0) {
				return false;
			}
			this.$store.commit('allCheck', checkStatus.value);
		},
		addOrder() {
			//去结算
			let checkCars = this.carList.filter(item => {
				return item.checked == true;
			});
			if (checkCars.length == 0) {
				uni.showToast({
					title: '请先选择商品',
					icon: 'none',
					duration: 2000
				});
			} else {
				this.$store.commit('addOrder', checkCars);
				uni.navigateTo({
					url: '/pages/order/order',
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		},
		infoGoods() {
			//好物推荐
			this.request('nottoken/getBuyGoods', 'get', {
				current: 1,
				pageSize: 10
			}).then(res => {
				this.likeList = res.data.data.map(item => {
					item.propaganda = JSON.parse(item.propaganda);
					return item;
				});
			});
		},
		addCars(data) {
			let carGoods = {
				id: data.id,
				name: data.name,
				number: 1,
				url: data.propaganda[0].url,
				price: parseFloat(data.price), //解析一个字符串，并返回一个浮点数。
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
		}
	}
};
</script>

<style lang="scss" scoped>
.car {
	width: 100%;
	height: 100%;
	position: relative;
	.car-scroll {
		width: 100%;
		height: calc(100% - var(--status-bar-height));
		overflow: hidden;
		padding-bottom: 100rpx;
		box-sizing: border-box;
		.classBoxs {
			width: 100%;
			height: auto;
			background: #ffffff;
			// margin-top: 20rpx;
			.classBoxs-list {
				width: 100%;
				height: 200rpx;
				display: flex;
				border-bottom: 1px solid #efefef;
				.checkbox {
					width: 140rpx;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.image {
					width: 150rpx;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 150rpx;
						height: 150rpx;
					}
				}
				.otherInfo {
					// width: 500rpx;
					width: calc(100% - 290rpx);
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
					padding-left: 20rpx;
					.goodsName {
						width: 100%;
						height: 60%;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						overflow: hidden;
					}
					.price {
						width: 30%;
						height: 40%;
						display: flex;
						align-items: center;
						color: red;
					}
					.number {
						width: 70%;
						height: 40%;
						display: flex;
						justify-content: flex-end;
						box-sizing: border-box;
						padding-right: 20rpx;
					}
				}
			}
		}
		.classBoxs-emptys {
			width: 100%;
			height: 750rpx;
			padding-top: 100rpx;
			background: #f5f5f5;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			image {
				width: 600rpx;
			}
			.classBoxs-emptys-btns {
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
		.classBoxLive {
			width: 100%;
			height: 72rpx;
			padding-top: 10rpx;
			text-align: center;
			line-height: 62rpx;
			font-size: 30rpx;
			color: #0a0a0a;
		}
		.like {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 20rpx;
			.like-every {
				width: 48.5%;
				border: 1px solid #eeeeee;
				margin-top: 20rpx;
				display: flex;
				flex-wrap: wrap;
				image {
					width: 100%;
					height: 340rpx;
				}
				.like-every-text {
					width: 100%;
					height: 80rpx;
					padding: 0 20rpx;
					text-align: center;
					box-sizing: border-box;
					overflow: hidden;
				}
				.like-every-price {
					width: 40%;
					height: 60rpx;
					box-sizing: border-box;
					padding-left: 20rpx;
					color: red;
					display: flex;
					align-items: center;
				}
				.like-every-car {
					width: 60%;
					height: 60rpx;
					text-align: right;
					box-sizing: border-box;
					padding-right: 20rpx;
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
		z-index: 999;
		.checkbox {
			width: 140rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.total {
			width: 300rpx;
			height: 100%;
			font-size: 36rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
		.button {
			width: calc(100% - 440rpx);
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.u-btn {
				width: 50%;
				height: 60%;
			}
		}
	}
}
</style>
