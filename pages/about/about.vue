<template>
	<view class="u-content"><u-parse :html="content" :tag-style="style"></u-parse></view>
</template>

<script>
export default {
	data() {
		return {
			content: `
				<p>使用uni-app开发,个人练习作品</p>
				<a href="https://uniapp.dcloud.io/">uni-app官网<a>
			`,
			style: {
				// 字符串的形式
				p: 'color: black;font-size:36rpx;text-align:center',
				a: 'text-decoration:none;width:100%;display:block;text-align:center;font-size:36rpx;color:blue'
			}
		};
	}
};
</script>

<style lang="scss" scoped>
.u-content {
	width: 100%;
	height: 100%;
	margin-top: 30rpx;
}
</style>
