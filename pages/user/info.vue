<template>
	<view class="index">
<!-- 		<u-cell-group>
			<u-cell-item title="用户昵称" :value="userName" :arrow="false"></u-cell-item>
			<u-cell-item title="绑定手机" :value="userPhone" :arrow="false"></u-cell-item>
		</u-cell-group> -->
		<view class="button">
			<u-button type="error" shape="circle" @click="logOut">退出登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				userPhone: '',
			};
		},
		onLoad() {
			this.userName = uni.getStorageSync("userName");
			this.userPhone = uni.getStorageSync("userPhone");
		},
		components: {

		},
		watch: {

		},
		methods: {
			logOut(){
				uni.removeStorageSync("Authorization");
				uni.removeStorageSync("sessionId");
				uni.showToast({
					title: "请重新登陆",
					duration: 2000,
					icon: "none",
					complete: () => {
						// uni.clearStorageSync('token')
						uni.redirectTo({
							url: "/pages/login/login",
						});
					},
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.button {
		padding: 30rpx;
	}
</style>
