/* 仿 支付宝 选择时间 */
<template>
    <view class="datepicker">
        <view class="datepicker-toolbar">
            <view class="datepicker-toolbar_button" @tap="changeMode"
                >{{ text }}
                <!-- <u-icon name="reload" size="28"></u-icon> -->
            </view>
        </view>
        <view class="datepicker-box" v-if="mode === 1">
            <view class="datepicker-header">
                <view class="datepicker-header__result highlight" @tap="showMonthPicker">
                    {{ selectedMonth }}
                </view>
                <view class="datepicker-header__clear">
                    <u-icon name="trash" size="36" @tap="clearMonth"></u-icon>
                </view>
            </view>
            <view class="datepicker-header__calendar">
                <picker-view
                    v-if="monthPicker.visible"
                    class="datepicker-header__calendar-picker"
                    indicator-class="picker-selected"
                    :value="monthPicker.value"
                    @change="monthPickerChange"
                >
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in years" :key="index">{{ item }}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in months" :key="index">{{ item }}</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
        <view v-if="mode === 0" class="datepicker-box">
            <view class="datepicker-header">
                <view class="datepicker-header__result" @tap="showDayPicker">
                    <view @tap="changeCurrent(0)" :class="'datepicker-header__result-text ' + (current === 0 ? 'highlight' : 'default-border')">{{
                        begin
                    }}</view>
                    <view class="datepicker-header__result-separator">至</view>
                    <view @tap="changeCurrent(1)" :class="'datepicker-header__result-text ' + (current === 1 ? 'highlight' : 'default-border')">{{ end }}</view>
                </view>
                <view class="datepicker-header__clear">
                    <u-icon name="trash" size="36" @tap="clearDay"></u-icon>
                </view>
            </view>
            <view class="datepicker-header__calendar">
                <picker-view
                    v-if="dayPicker.visible"
                    class="datepicker-header__calendar-picker"
                    indicator-class="picker-selected"
                    :value="dayPicker.value"
                    @change="dayPickerChange"
                >
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in years" :key="index">{{ item }}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in months" :key="index">{{ item }}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in days" :key="index">{{ item }}</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
        <slot></slot>
    </view>
</template>

<script>
    // import uniIcon from '@/components/magician-icon/magician-icon.vue'
    // import utils from '../../static/js/date-calc.js'
    const years = () => {
        let arr = [];
        let year = new Date().getFullYear();
        for (let i = 2000; i <= year; i++) {
            arr.push(i);
        }
        return arr;
    };
    const months = () => {
        let arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push(i);
        }
        return arr;
    };
    export default {
        components: {
            // uniIcon
        },
        props: {
            date: {
                type: [String, Array],
                default: () => {
                    let now = new Date();
                    return now.getFullYear() + "-" + (now.getMonth() + 1);
                },
            },
        },
        watch: {
            date(val) {
                if (val.constructor === Array) {
                    this.mode = 0;
                    this.begin = val[0];
                    this.end = val[1];

                    this.dayPicker.value = [this.years.indexOf(temp[0]), this.months[temp[1]], this.days[temp[2]]];
                } else {
                    this.mode = 1;
                    let temp = val.split("-");
                    this.monthPicker.year = temp[0];
                    this.monthPicker.month = temp[1];

                    this.monthPicker.value = [this.years.indexOf(temp[0]), this.months[temp[1]]];
                }
            },
        },
        computed: {
            selectedMonth() {
                if (this.monthPicker.visible) {
                    return this.monthPicker.year + "-" + this.monthPicker.month;
                } else {
                    return "选择月份";
                }
            },
            selected() {
                if (this.mode === 1) {
                    return this.monthPicker.visible ? this.selectedMonth : "";
                } else {
                    return [this.begin, this.end];
                }
            },
        },
        data() {
            let now = new Date();
            let current_year = now.getFullYear();
            let current_month = now.getMonth();
            let current_day = now.getDate();
            let days_temp = [];
            for (let i = 1; i <= utils.date.dayOfMonth(current_year, current_month); i++) {
                days_temp.push(i);
            }
            return {
                mode: 1, //0按日选择，1按月选择
                text: "按月选择",
                years: years(),
                months: months(),
                days: days_temp,
                monthPicker: {
                    visible: true,
                    value: [current_year, current_month],
                    year: current_year,
                    month: current_month + 1,
                },
                dayPicker: {
                    visible: true,
                    value: [current_year, current_month, current_day - 1],
                    year: current_year,
                    month: current_month + 1,
                    day: 0,
                },
                current: 0, //0为开始时间，1为结束时间
                begin: current_year + "-" + (current_month + 1) + "-" + current_day,
                end: current_year + "-" + (current_month + 1) + "-" + current_day,
            };
        },
        methods: {
            changeCurrent(current) {
                this.current = current;
                let temp;
                if (this.current === 0) {
                    temp = this.begin.split("-").map(Number);
                } else {
                    temp = this.end.split("-").map(Number);
                }
                if (temp.length < 3) {
                    let now = new Date();
                    temp = [this.years.indexOf(now.getFullYear()), now.getMonth(), now.getDate() - 1];
                    if (this.current == 0) {
                        this.begin = now.toLocaleDateString().replace(/\//g, "-");
                    } else {
                        this.end = now.toLocaleDateString().replace(/\//g, "-");
                    }
                } else {
                    temp[0] = this.years.indexOf(temp[0]);
                    temp[1] = temp[1] - 1;
                    temp[2] = temp[2] - 1;
                }
                this.dayPicker.value = temp;
            },
            changeMode() {
                this.mode = this.mode === 1 ? 0 : 1;
                if (this.mode === 0) {
                    this.text = "按日选择";
                } else {
                    this.text = "按月选择";
                }
            },
            showDayPicker() {
                this.dayPicker.visible = true;
            },
            showMonthPicker() {
                this.monthPicker.visible = true;
            },
            monthPickerChange(e) {
                this.monthPicker.year = this.years[e.detail.value[0]];
                this.monthPicker.month = this.months[e.detail.value[1]];
            },
            dayPickerChange(e) {
                this.dayPicker.year = this.years[e.detail.value[0]];
                this.dayPicker.month = this.months[e.detail.value[1]];
                let day = utils.date.dayOfMonth(this.dayPicker.year, this.dayPicker.month);
                if (day !== this.days.length) {
                    this.days = [];
                    for (let i = 1; i <= day; i++) {
                        this.days.push(i);
                    }
                }
                this.dayPicker.day = this.days[e.detail.value[2]];
                let format = this.dayPicker.year + "-" + this.dayPicker.month + "-" + this.dayPicker.day;
                if (this.current === 0) {
                    this.begin = format;
                } else {
                    this.end = format;
                }
            },
            clearMonth() {
                this.monthPicker.visible = false;
            },
            clearDay() {
                this.dayPicker.visible = false;
                this.begin = "开始日期";
                this.end = "结束日期";
                this.current = -1;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .datepicker {
        overflow: hidden;
        width: 100%;
        // height: calc(100vh - 44px);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #fff;
        &-box {
            width: 100%;
        }
        &-toolbar {
            height: 150upx;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: flex-start;
            padding-left: 50upx;
            border-top: 1px solid #fafafa;
            &_button {
                width: 225upx;
                height: 65upx;
                border-radius: 2500upx;
                background: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: $uni-font-size-sm;
                border: 1px solid #dbdbdb;
                // &:after {
                //     padding-left: 12.5upx;
                //     content: "\f0ec";
                //     font-family: "FontAwesome";
                //     font-size: $uni-font-size-lg;
                //     color: #9e9e9e;
                // }
            }
        }
        &-header {
            display: flex;
            flex-direction: column;
            padding: 25upx 50upx;
            box-sizing: border-box;
            justify-content: center;
            width: 100%;
            &__result {
                width: 100%;
                height: 65upx;
                color: #00c456;
                font-size: $uni-font-size-lg;
                display: flex;
                flex-direction: row;
                justify-content: center;
                &-text {
                    flex: 1;
                    text-align: center;
                }
                &-separator {
                    width: 100upx;
                    color: rgba(0, 0, 0, 0.6);
                    font-weight: 1000;
                    font-size: $uni-font-size-base;
                    text-align: center;
                }
            }
            &__clear {
                width: 100%;
                height: 100upx;
                color: #a9a9a9;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            &__calendar {
                border-top: 1px solid #f9f9f9;
                border-bottom: 1px solid #f9f9f9;
                height: 500upx;
                &-picker {
                    height: 100%;
                    text-align: center;
                }
            }
        }
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .highlight {
        color: #00c456;
        border-bottom: 1px solid #00c456;
    }

    .default-border {
        color: #000;
        border-bottom: 1px solid #dedede;
    }
</style>
