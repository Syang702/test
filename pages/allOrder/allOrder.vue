<template>
	<view class="allOrder">
		<view><u-tabs-swiper ref="uTabs" :list="allTab" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="100%"></u-tabs-swiper></view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="allOrder-swiper">
			<swiper-item class="swiper-item" v-for="(itemTabs, index) in tabs" :key="index">
				<view class="allOrder-empty" v-show="itemTabs.length == 0"><image src="../../static/images/empty.jpeg"></image></view>
				<scroll-view scroll-y="true" @scrolltolower="onreachBottom" class="allOrder-swiper-box">
					<view class="order-every" v-for="(item, index) in itemTabs" :key="index">
						<view class="order-every-time">{{ item.order_createtime }}</view>
						<view class="order-every-status">
							<text v-if="item.order_states == 1">待支付</text>
							<text v-if="item.order_states == 2">待发货</text>
							<text v-if="item.order_states == 3">待收货</text>
							<text v-if="item.order_states == 4">待评价</text>
						</view>
						<view class="order-every-image" @click="toOrderDetail(item.id)">
							<scroll-view class="order-every-image-box" scroll-x="true">
								<view class="order-list-boxContent" :style="{ width: item.order_order.length * 110 + 'rpx' }">
									<view class="order-every-image-list" v-for="(every, index) in item.order_order" :key="index">
										<image :src="every.url"></image>
										<view class="image-left-line"></view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="order-every-price">￥{{ item.order_price }}</view>
						<view class="order-every-total">共{{ item.order_order.length }}份商品 实付￥{{ (Number(item.order_price) + Number(item.order_delivery)).toFixed(2) }}</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			allTab: [
				{
					name: '全部',
					id: 0
				},
				{
					name: '待支付',
					id: 1
				},
				{
					name: '待发货',
					id: 2
				},
				{
					name: '待收货',
					id: 3
				},
				{
					name: '待评价',
					id: 4
				}
			],
			tabs: [],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
		};
	},
	onLoad(options) {
		this.info();
		setTimeout(() => {
			this.current = options.id;
			this.swiperCurrent = options.id;
		}, 300);
	},
	methods: {
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view到底部加载更多
		onreachBottom() {},
		toOrderDetail(id) {
			uni.navigateTo({
				url: '/pages/orderDetail/orderDetail?id=' + id
			});
		},
		info() {
			this.requestByToken('index/getOrderAlls', 'post', {
				page: 1,
				pageSize: 10
			}).then(res => {
				let orderList = res.data.data.map(item => {
					item.order_order = JSON.parse(item.order_order);
					item.order_createtime = item.order_createtime.slice(0, 10);
					return item;
				});
				this.tabs[0] = orderList;
				this.tabs[1] = orderList.filter(item => {
					return item.order_states === 1;
				});
				this.tabs[2] = orderList.filter(item => {
					return item.order_states === 2;
				});
				this.tabs[3] = orderList.filter(item => {
					return item.order_states === 3;
				});
				this.tabs[4] = orderList.filter(item => {
					return item.order_states === 4;
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.allOrder {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	.allOrder-swiper {
		width: 100%;
		height: 100%;
		.allOrder-empty {
			width: 100%;
			height: 750rpx;
			image {
				width: 750rpx;
				height: 750rpx;
			}
		}
		.allOrder-swiper-box {
			width: 100%;
			height: calc(100% - 80rpx);
			overflow: hidden;
			.order-every {
				width: 100%;
				height: 310rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				.order-every-time {
					width: 70%;
					height: 100rpx;
					display: flex;
					align-items: center;
				}
				.order-every-status {
					width: 30%;
					height: 100rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
				.order-every-image {
					width: 80%;
					height: 110rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.order-every-image-box {
						width: 100%;
						height: 100%;
						overflow: hidden;
						.order-list-boxContent {
							width: 100%;
							height: 100%;
							display: flex;
						}
						.order-every-image-list {
							width: 130rpx;
							height: 110rpx;
							display: flex;
							image {
								width: 110rpx;
								height: 100%;
							}
							.image-left-line {
								width: 20rpx;
								height: 100%;
							}
						}
					}
				}
				.order-every-price {
					width: 20%;
					height: 110rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.order-every-total {
					width: 100%;
					height: 100rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
			}
		}
	}
}
</style>
