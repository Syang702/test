<template>
	<view class="content">
		<view class="status_bar"><!-- 状态栏 --></view>
		<view class="contentBox">
			<view class="search"><u-search placeholder="请输入搜索内容" v-model="keyword" :show-action="false"></u-search></view>
			<scroll-view scroll-y="true" class="content-scroll">
				<view class="swiper"><u-swiper :list="swiperList" height="416"></u-swiper></view>
				<view class="classify">
					<view class="classify-every" v-for="(item, index) in classifyList" :key="item.id" @click="toClassify(item.id)">
						<image :src="item.image[0].url" mode=""></image>
						<view class="classify-every-text">{{ item.name }}</view>
					</view>
				</view>
				<view class="bg-title">
					<view class="bg-title-line"></view>
					<view class="bg-title-text">今日疯抢</view>
					<u-count-down :timestamp="timestamp" font-size="36" color="#fd6069" separator-color="#fd6069"></u-count-down>
				</view>
				<view class="today">
					<view class="todayBuy">
						<view class="todayBuy-every" v-for="item in todayBuyList" :key="item.id">
							<image :src="item.propaganda[0].url" mode="" @click="toDetail(item.id)"></image>
							<view class="todayBuy-every-text" @click="toDetail(item.id)">{{ item.name }}</view>
							<view class="todayBuy-every-price" @click="toDetail(item.id)">￥{{ item.price }}</view>
							<view class="todayBuy-every-car" @click="addCars(item)"><u-icon size="60" name="shopping-cart" color="#3bb86a"></u-icon></view>
						</view>
					</view>
				</view>
				<view class="bg-title">
					<view class="bg-title-line"></view>
					<view class="bg-title-text">猜你喜欢</view>
				</view>
				<view class="like">
					<view class="like-every" v-for="item in likeList" :key="item.id">
						<image :src="item.propaganda[0].url" mode="" @click="toDetail(item.id)"></image>
						<view class="like-every-text" @click="toDetail(item.id)">{{ item.name }}</view>
						<view class="like-every-price" @click="toDetail(item.id)">￥{{ item.price }}</view>
						<view class="like-every-car" @click="addCars(item)"><u-icon size="60" name="shopping-cart" color="#3bb86a"></u-icon></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			keyword: '',
			swiperList: [],
			classifyList: [],
			timestamp: 86400,
			todayBuyList: [],
			likeList: []
		};
	},
	onLoad() {
		this.infoSwips();
		this.infoClassifyList();
		this.timestamp = 86400 - this.currentTime();
		this.infoTodayBuyList();
		this.infoLikeList();
	},
	methods: {
		infoSwips() {
			//获取轮播图
			this.request('nottoken/getSwipers', 'get', {}).then(res => {
				res.data.data.swipers.forEach(item => {
					item.carousel = JSON.parse(item.carousel);
					this.swiperList.push({ image: item.carousel[0].url, title: item.remark });
				});
			});
		},
		//分类导航
		infoClassifyList() {
			this.request('nottoken/getOneClass', 'get', {}).then(res => {
				this.classifyList = res.data.data.map(item => {
					item.image = JSON.parse(item.image);
					return item;
				});
			});
		},
		//当前时间
		currentTime() {
			let date = new Date();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();
			return (hour * 60 + minute) * 60 + second + 1;
		},
		//今日疯抢
		infoTodayBuyList() {
			this.request('nottoken/getInsane', 'get', {}).then(res => {
				this.todayBuyList = res.data.data.map(item => {
					item.propaganda = JSON.parse(item.propaganda);
					item.price = JSON.parse(item.price);
					return item;
				});
			});
		},
		//猜你喜欢
		infoLikeList() {
			this.request('nottoken/homeLive', 'get', {
				current: 1,
				pageSize: 10
			}).then(res => {
				this.likeList = res.data.data.map(item => {
					item.propaganda = JSON.parse(item.propaganda);
					return item;
				});
			});
		},
		//分类页
		toClassify(id) {
			this.$store.commit('toClassify', id);
			uni.switchTab({
				url: '/pages/classify/classify',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		//详情页
		toDetail(id) {
			uni.navigateTo({
				url: '/pages/detail/detail?id=' + id,
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		//加购物车
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
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
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
	.contentBox {
		width: 100%;
		height: calc(100% - var(--status-bar-height));
		.search {
			width: 100%;
			height: 92rpx;
			padding: 10rpx;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			position: fixed;
			top: var(--status-bar-height);
			left: 0;
			z-index: 666;
		}
		.content-scroll {
			width: 100%;
			height: calc(100% - var(--status-bar-height));
		}
		.swiper {
			width: 100%;
			height: 416rpx;
		}
		.classify {
			width: 100%;
			height: 380rpx;
			padding-bottom: 28rpx;
			display: flex;
			flex-wrap: wrap;
			.classify-every {
				width: 20%;
				height: 180rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
				.classify-every-text {
					width: 100%;
					height: 58rpx;
					line-height: 58rpx;
					text-align: center;
				}
			}
		}
		.bg-title {
			width: 100%;
			height: 82rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			.bg-title-line {
				width: 10rpx;
				height: 100%;
				background-color: #3ecd60;
				margin-right: 20rpx;
			}
			.bg-title-text {
				font-size: 36rpx;
				font-weight: 700;
				margin-right: 30rpx;
			}
		}
		.today {
			width: 100%;
			.todayBuy {
				width: auto;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				overflow: auto;
				.todayBuy-every {
					width: 220rpx;
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					image {
						width: 220rpx;
						height: 220rpx;
						box-sizing: border-box;
						padding: 10rpx;
					}
					.todayBuy-every-text {
						width: 100%;
						height: 80rpx;
						padding: 0 20rpx;
						box-sizing: border-box;
						overflow: hidden;
						// white-space: nowrap;
						// text-align: center;
						// text-overflow: ellipsis;
					}
					.todayBuy-every-price {
						width: 40%;
						height: 60rpx;
						box-sizing: border-box;
						padding-left: 20rpx;
						color: red;
						display: flex;
						align-items: center;
					}
					.todayBuy-every-car {
						width: 60%;
						height: 60rpx;
						text-align: right;
						box-sizing: border-box;
						padding-right: 20rpx;
					}
				}
			}
		}
		.like {
			width: 100%;
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
}
</style>
