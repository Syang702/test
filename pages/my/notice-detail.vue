/* 公告详情 */
<template>
    <view class="index">
        <u-parse :html="contents"></u-parse>
    </view>
</template>

<script>
import { getNotificationDeatil } from "../../config/api.js";
export default {
    data() {
        return {
            queryList: {
                //请求接口传的参数
            },
            contents: '',
        };
    },
    components: {},
    watch: {},
    created() { },
    mounted() { },
    onLoad(param) {
        this.queryList.notificationId = param.id,
            this.getNotificationDeatilContent();
    },
    methods: {
        getNotificationDeatilContent() {
            getNotificationDeatil(this.queryList).then((res) => {
                this.contents = res.data.notifications[0]
            })
        }
    },
};
</script>

<style scoped lang="scss">
.index {
    padding: 30rpx;
}
</style>
