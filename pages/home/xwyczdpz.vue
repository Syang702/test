<template>
    <view class="page">
        <Navbar title="限位延迟自动配置"></Navbar>
        <u-cell-group>
            <u-cell-item
                v-for="(item, index) in list"
                :key="index"
                :arrow="false"
                :title="item.title"
                :value="item.value"
                :title-style="{ 'font-size': '30rpx', color: '#333' }"
                :value-style="{ 'font-size': '30rpx', color: '#333' }"
            ></u-cell-item>
        </u-cell-group>
        <u-gap height="20" bg-color="transparent"></u-gap>
        <u-subsection :list="subList" :current="0" active-color="#f9a906" inactive-color="#333" :font-size="32" @change="sectionChange"></u-subsection>
        <view v-if="sectionIndex == 0">
            <u-cell-group>
                <u-cell-item :arrow="false" title="下限位配置0" value="" :title-style="{ 'font-size': '30rpx', color: '#333' }"></u-cell-item>
                <u-cell-item :arrow="false" title="下限位延迟停止时间（秒）" :title-style="{ 'font-size': '30rpx', color: '#333', width: '450rpx' }">
                    <u-input slot="right-icon" type="number" v-model="infoForm.time" placeholder="请输入" input-align="right"></u-input>
                </u-cell-item>
            </u-cell-group>
        </view>
        <view v-if="sectionIndex == 1">
            <u-cell-group>
                <u-cell-item :arrow="false" title="下限位配置1" value="" :title-style="{ 'font-size': '30rpx', color: '#333' }"></u-cell-item>
                <u-cell-item :arrow="false" title="下限位延迟停止时间（秒）" :title-style="{ 'font-size': '30rpx', color: '#333', width: '450rpx' }">
                    <u-input slot="right-icon" type="number" v-model="infoForm.time" placeholder="请输入" input-align="right"></u-input>
                </u-cell-item>
            </u-cell-group>
        </view>
        <view v-if="sectionIndex == 2">
            <u-cell-group>
                <u-cell-item :arrow="false" title="下限位配置2" value="" :title-style="{ 'font-size': '30rpx', color: '#333' }"></u-cell-item>
                <u-cell-item :arrow="false" title="下限位延迟停止时间（秒）" :title-style="{ 'font-size': '30rpx', color: '#333', width: '450rpx' }">
                    <u-input slot="right-icon" type="number" v-model="infoForm.time" placeholder="请输入" input-align="right"></u-input>
                </u-cell-item>
            </u-cell-group>
        </view>
        <view class="btn">
            <u-button type="primary" shape="circle">提交</u-button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                infoForm: {
                    time: "",
                },
                list: [
                    { title: "大鹏编号", value: "#9527" },
                    { title: "大鹏名称", value: "刘小明3号大棚" },
                    { title: "大鹏位置", value: "山西省晋城市XX县" },
                ],
                subList: [{ name: "1#卷帘机" }, { name: "2#卷帘机" }, { name: "3#卷帘机" }],
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
