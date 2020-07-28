<template>
	<u-cell-group>
		<u-cell-item title="头像" icon="photo" :arrow="false">
			<u-image width="50rpx" height="50rpx" :src="userInfo.image" shape="circle"></u-image>
		</u-cell-item>
		<u-cell-item icon="account" title="ID号" :arrow="false">
			<text>{{ userInfo.id }}</text>
		</u-cell-item>
		<u-cell-item icon="phone" title="手机号" :arrow="false">
			<text>{{ userInfo.phone }}</text>
		</u-cell-item>
	</u-cell-group>
</template>

<script>
export default {
	data() {
		return {
			userInfo: uni.getStorageSync('userInfo')
		};
	}
};
</script>

<style lang="scss" scoped>
.u-image {
	position: absolute;
	right: 32rpx;
}
</style>
