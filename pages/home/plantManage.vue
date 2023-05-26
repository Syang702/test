<template>
    <view class="page">
        <Navbar title="种植管理"></Navbar>
        <u-subsection :list="subList" :current="0" active-color="#f9a906" inactive-color="#333" :font-size="32" @change="sectionChange"></u-subsection>
        <view v-if="sectionIndex == 0"> </view>
        <view v-if="sectionIndex == 1"> </view>
        <view class="btn">
            <u-button type="primary" shape="circle">添加</u-button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                subList: [{ name: "已种植" }, { name: "已收获" }],
                sectionIndex: 0,
            };
        },
        onLoad() {},
        methods: {
            sectionChange(index) {
                this.sectionIndex = index;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .btn {
        position: fixed;
        width: 100%;
        padding: 20rpx;
        left: 0;
        bottom: 40rpx;
        z-index: 66;
    }
</style>
