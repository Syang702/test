<template>
	<!-- 意见反馈 -->
	<view class="opinion">
		<u-input type="textarea" :border="true" :height="200" :auto-height="true" />
		<u-button type="error" shape="circle" @click="submit()">提交</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	methods: {
		submit() {
			this.$refs.uToast.show({
				title: '提交成功',
				type: 'success',
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.opinion {
	width: 100%;
	height: 100%;
	padding: 30rpx 20rpx;
	.u-input {
		background-color: #f5f5f5;
		margin-bottom: 30rpx;
	}
}
</style>
