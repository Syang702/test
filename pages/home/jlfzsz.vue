<template>
    <view class="page">
        <Navbar title="卷帘反转设置"></Navbar>
        <view class="page-content-bottom-button">
            <u-cell-group>
                <u-cell-item :arrow="false" title="1#卷帘机设置" value="" :title-style="titleStyle1"></u-cell-item>
                <u-cell-item
                    v-for="(item, index) in list1"
                    :key="index"
                    :arrow="false"
                    :title="item.title"
                    :value="item.value"
                    :title-style="titleStyle2"
                    :value-style="valueStyle1"
                ></u-cell-item>
                <u-cell-item :arrow="false" title="是否启用卷帘反转故障报警" :title-style="titleStyle2">
                    <u-switch slot="right-icon" v-model="enable"></u-switch>
                </u-cell-item>
            </u-cell-group>
            <u-gap height="20" bg-color="transparent"></u-gap>
            <u-cell-group>
                <u-cell-item :arrow="false" title="重要提示" value="" :title-style="titleStyle1"></u-cell-item>
                <view class="tip-color"> 当卷帘电机不动作，或者反转和限位器不能复位时，系统会自动停止卷帘机运行，方便检修和保障大棚安全。建议启用！</view>
            </u-cell-group>
            <view class="page-bottom-button">
                <u-button type="primary" shape="circle">保存</u-button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                enable: true,
                list1: [
                    { title: "大棚编号", value: "2312#" },
                    { title: "大棚名称", value: "XX1号大棚" },
                    { title: "当前反转报警状态", value: "启用" },
                ],
                titleStyle1: { "font-size": "32rpx", color: "#333" },
                titleStyle2: { "font-size": "30rpx", color: "#333" },
                valueStyle1: { "font-size": "30rpx", color: "#333" },
                valueStyle2: { "font-size": "30rpx", color: "#f9a906" },
            };
        },
        onLoad() {},
        methods: {},
    };
</script>
<style lang="scss" scoped>
    .tip-color {
        padding: 20rpx;
        background-color: $app-theme-bg-color;
        color: $app-theme-text-money-color;
        font-size: 30rpx;
    }
</style>
