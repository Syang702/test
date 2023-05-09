/* 地址管理 */
<template>
    <view class="index">
        <address-list :listMode="false" ref="addressList" />
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
    watch: {},
    methods: {},
};
</script>
