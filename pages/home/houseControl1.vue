<template>
    <view class="page">
        <Navbar title="大棚控制"></Navbar>
        <view class="flex justifyBeteen header-action">
            <view @click="toSet">自动功能设置</view>
            <view @click="add">添加</view>
        </view>
        <u-gap height="20" bg-color="transparent"></u-gap>
    </view>
</template>

<script>
    export default {
        data() {
            return {};
        },
        onLoad() {},
        methods: {
            toSet() {},
            add() {},
        },
    };
</script>
<style lang="scss" scoped>
    .page {
        padding: 0 20rpx 20rpx;
    }
</style>
