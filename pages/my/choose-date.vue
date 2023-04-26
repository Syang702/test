/* 选择时间 */
<template>
    <view class="choose-time">
        <view class="yes" @tap="completeDate">完成</view>
        <mg-datepicker ref="datepicker" :date="date"></mg-datepicker>
    </view>
</template>

<script>
import mgDatepicker from '../components/datepicker.vue'
export default {
    components: {
        mgDatepicker
    },
    data() {
        return {
            date: ''
        };
    },
    onLoad(options) {
        this.date = options.date;
    },
    methods: {
        completeDate() {
            uni.setStorage({
                key: 'selected-date',
                data: this.$refs.datepicker.selected, //获取的时间
                complete() {
                    uni.navigateBack({
                        delta: 1
                    })
                }
            })
        }
    },
}
</script>

<style scoped lang='scss'>
.choose-time {
    height: 100vh;
    background-color: #fff;
    .yes {
        width: 100%;
        padding-right: 50rpx;
        text-align: right;
    }
}
</style>
