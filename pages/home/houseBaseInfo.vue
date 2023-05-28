<template>
    <view class="page">
        <Navbar title="大棚基础信息"></Navbar>
        <view class="page-content-bottom-button">
            <u-cell-group>
                <u-cell-item :arrow="false" title="大棚基础信息" value="" :title-style="titleStyle1"></u-cell-item>
                <u-cell-item
                    v-for="(item, index) in list1"
                    :key="index"
                    :arrow="false"
                    :title="item.title"
                    :value="item.value"
                    :title-style="titleStyle2"
                    :value-style="valueStyle1"
                ></u-cell-item>
            </u-cell-group>
            <u-gap height="20" bg-color="transparent"></u-gap>
            <u-cell-group>
                <u-cell-item :arrow="false" title="大棚照片信息" value="" :title-style="titleStyle1"></u-cell-item>
                <u-cell-item
                    v-for="(item, index) in list2"
                    :key="index"
                    :arrow="false"
                    :title="item.title"
                    :value="item.value"
                    :title-style="titleStyle2"
                    :value-style="valueStyle1"
                ></u-cell-item>
            </u-cell-group>
            <view class="page-bottom-button">
                <u-button type="primary" shape="circle" @click="next">下一步</u-button>
            </view>
        </view>
    </view>
</template>

<script>
    import { operaDevice } from "../../request/api";
    export default {
        data() {
            return {
                list1: [
                    { title: "大棚名称", value: "0" },
                    { title: "所处位置", value: "0" },
                    { title: "种植亩数", value: "1" },
                    { title: "大棚序号", value: "1" },
                    { title: "启动前警示", value: "1" },
                ],
                titleStyle1: { "font-size": "32rpx", color: "#333", "font-weight": "700" },
                titleStyle2: { "font-size": "30rpx", color: "#333" },
                valueStyle1: { "font-size": "30rpx", color: "#333" },
            };
        },
        onLoad() {},
        onShow() {
            this.next();
        },
        methods: {
            next() {
                let params = {
                    plcCode: 380,
                    open: 1,
                    deviceCode: 8,
                };
                operaDevice(params).then((res) => {
                    console.log(res);
                });
            },
        },
    };
</script>
<style lang="scss" scoped></style>
