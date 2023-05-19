<template>
    <view class="page">
        <Navbar title="传感器报警"></Navbar>
        <view class="flex justifyBeteen header-action">
            <view @click="toSet">报警设置</view>
            <view @click="add">添加</view>
        </view>
        <u-gap height="20" bg-color="transparent"></u-gap>
        <u-cell-group>
            <u-cell-item :arrow="false" title="报警是否启用" :title-style="{ 'font-size': '32rpx', color: '#333' }">
                <u-switch slot="right-icon" v-model="enable"></u-switch>
            </u-cell-item>
            <u-cell-item
                v-for="(item, index) in list"
                :key="index"
                :arrow="false"
                :title="item.title"
                :value="item.value"
                :title-style="{ 'font-size': '30rpx', color: '#333' }"
                :value-style="{ 'font-size': '30rpx', color: '#333' }"
            >
            </u-cell-item>
        </u-cell-group>
        <view class="flex justifyBeteen action">
            <u-button type="primary" size="medium" @click="edit">编辑</u-button>
            <u-button type="error" size="medium" @click="del">删除</u-button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                enable: true,
                list: [
                    { title: "报警检测时间", value: "08:00-18:00" },
                    { title: "传感器数据类型", value: "温度" },
                    { title: "监测组号", value: "1,2,3,4" },
                    { title: "上限报警值", value: "35" },
                    { title: "下限报警值", value: "5" },
                    { title: "报警频次（分钟）", value: "5" },
                ],
            };
        },
        onLoad() {},
        methods: {
            toSet() {},
            add() {},
            edit() {},
            del() {},
        },
    };
</script>
<style lang="scss" scoped>
    .action {
        background-color: $app-theme-bg-color;
        padding: 20rpx 100rpx;
    }
</style>
