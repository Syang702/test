/* 选择地址 */
<template>
    <view class="index">
        <address-list :listMode="true" ref="addressList" @selectAddressID="selectAddressID" />
    </view>
</template>

<script>
import addressList from "../components/address-list";
export default {
    data() {
        return {};
    },
    components: {
        addressList,
    },
    onShow() {
        this.$refs.addressList.getAddressInfo();
    },
    onLoad() {
        // this.$refs.addressList.getAddressInfo()
    },
    methods: {
        selectAddressID(data) {
            let pages = getCurrentPages(); //获取所有页面栈实例列表
            let prevPage = pages[pages.length - 2]; //上一页页面实例
            prevPage.$vm.getAddressInfo(data); //

            uni.navigateBack({
                delta: 1,
            });
        },
    },
};
</script>
