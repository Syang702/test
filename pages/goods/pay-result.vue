<template>
	<view class="index">
		<view class="image">
			<image :src="payImgUrl"></image>
		</view>
		<!-- <i class="icon iconfont icon-chenggong"></i> -->
		<p class="result-msg">扫码支付</p>
		<p class="result-auto-goto">跳转我的页面查看订单信息</p>
		<u-button type="primary" shape="circle" @click="toMy">立即跳转</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payImgUrl: "",
			};
		},
		onLoad(param) {
			var gatherOrder = param.gatherOrder;
			this.loadInfo(gatherOrder);
		},
		onUnload() { // 此处监听返回操作 ,可以直接返回到商品页
			// let currentPages = getCurrentPages();
			// console.log(currentPages[currentPages.length - 2].route)
			uni.navigateBack({
				delta: 2,
			});
		},
		methods: {
			loadInfo(gatherOrder) {
				this.payImgUrl = uni.getStorageSync("PAY_IMG_URL:" + gatherOrder);
				console.log(this.payImgUrl);
			},
			toMy() {
				uni.switchTab({
					url: "/pages/my/my",
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.index {
		@include flex-column;
		@include flex-center(center, center);
		padding-top: 100rpx;

		.image {
			width: 400rpx;
			height: 400rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}

		.result-msg {
			margin: 60rpx auto 30rpx;
		}

		.result-auto-goto {
			color: #9c9c9c;
			margin-bottom: 30rpx;
		}
	}
</style>
