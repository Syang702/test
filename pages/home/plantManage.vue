<template>
    <view class="page">
        <Navbar title="种植管理"></Navbar>
        <u-subsection :list="subList" :current="0" active-color="#f9a906" inactive-color="#333" :font-size="32" @change="sectionChange"></u-subsection>
        <view class="page-content-bottom-button">
            <view v-if="sectionIndex == 0"> </view>
            <view v-if="sectionIndex == 1"> </view>
            <view class="page-bottom-button">
                <u-button type="primary" shape="circle">添加</u-button>
            </view>
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
<style lang="scss" scoped></style>
