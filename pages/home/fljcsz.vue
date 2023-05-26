<template>
    <view class="page">
        <Navbar title="风帘基础设置"></Navbar>
        <view class="page-content">
            <view class="page-warp">
                <view v-for="(c, j) in 6" :key="j">
                    <u-cell-group>
                        <u-cell-item :arrow="false" title="1#号风帘设置" value="" :title-style="titleStyle1"></u-cell-item>
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
                        <u-cell-item :arrow="false" title="2#号风帘设置" value="" :title-style="titleStyle1"></u-cell-item>
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
                </view>
            </view>
            <view class="page-btn">
                <u-button type="primary" shape="circle">保存</u-button>
            </view>
        </view>
    </view>
</template>

<script>
    const app = getApp();
    export default {
        data() {
            return {
                enable: false,
                navBarHeight: app.globalData.navBarHeight + "px",
                list1: [
                    { title: "风帘打开总时长(单位:秒)", value: "0" },
                    { title: "风帘关闭总时长(单位:秒)", value: "0" },
                    { title: "关联哪一组卷帘", value: "1" },
                ],
                list2: [
                    { title: "风帘打开总时长(单位:秒)", value: "1" },
                    { title: "风帘关闭总时长(单位:秒)", value: "1" },
                    { title: "关联哪一组卷帘", value: "2" },
                ],
                titleStyle1: { "font-size": "32rpx", color: "#333", "font-weight": "700" },
                titleStyle2: { "font-size": "30rpx", color: "#333" },
                valueStyle1: { "font-size": "30rpx", color: "#333" },
                valueStyle2: { "font-size": "30rpx", color: "#f9a906" },
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
    .page-content {
            // height: calc(100vh - 180rpx);
        height: calc(100vh - var(navBarHeight));
    }
    .btn {
        position: fixed;
        width: 100%;
        padding: 20rpx;
        padding-bottom: 60rpx;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 66;
        background-color: $app-theme-bg-color;
    }
</style>
