<template>
    <view class="page">
        <Navbar title="自动风帘设置"></Navbar>
        <u-subsection :list="subList" :current="0" active-color="#f9a906" inactive-color="#333" :font-size="32" @change="sectionChange"></u-subsection>
        <view class="page-content-bottom-button">
            <view v-if="sectionIndex == 0">
                <u-cell-group>
                    <u-cell-item :arrow="false" title="智控模式" :title-style="titleStyle1">
                        <u-switch slot="right-icon" v-model="enable"></u-switch>
                    </u-cell-item>
                    <u-cell-item :arrow="false" title="1#卷帘机设置" value="" :title-style="titleStyle1"></u-cell-item>
                    <u-cell-item
                        v-for="(item, index) in list1"
                        :key="index"
                        :title="item.title"
                        :value="item.value"
                        :title-style="titleStyle2"
                        :value-style="valueStyle1"
                    ></u-cell-item>
                    <u-cell-item :arrow="false" title="2#卷帘机设置" value="" :title-style="titleStyle1"></u-cell-item>
                    <u-cell-item
                        v-for="(item, index) in list2"
                        :key="index"
                        :title="item.title"
                        :value="item.value"
                        :title-style="titleStyle2"
                        :value-style="valueStyle1"
                    ></u-cell-item>
                    <u-cell-item :arrow="false" title="温馨提示" value="" :title-style="titleStyle1"></u-cell-item>
                    <view class="tip-color">
                        晴或多云天气，卷帘自动在日出之后卷起，日落之前铺开；遇大雪、冻雨等恶劣天气预警信息,卷帘自动铺开，智能模式暂时关闭；再次手动卷起成功后，智能模式自动恢复。</view
                    >
                </u-cell-group>
            </view>
            <view v-if="sectionIndex == 1">
                <u-cell-group>
                    <u-cell-item :arrow="true" title="选择哪些天气允许自动卷起" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                    <u-cell-item :arrow="true" title="选择哪些天气允许自动铺开" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                    <u-cell-item :arrow="true" title="选择哪些恶劣天气暂停自动并卷起" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                    <u-cell-item :arrow="true" title="选择哪些恶劣天气暂停自动并铺开" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                </u-cell-group>
            </view>
            <view v-if="sectionIndex == 2">
                <u-cell-group>
                    <u-cell-item :arrow="true" title="选择哪些天气允许自动卷起" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                    <u-cell-item :arrow="true" title="选择哪些天气允许自动铺开" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                    <u-cell-item :arrow="true" title="选择哪些恶劣天气暂停自动并卷起" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                    <u-cell-item :arrow="true" title="选择哪些恶劣天气暂停自动并铺开" value="选择" :title-style="titleStyle1" :value-style="valueStyle2">
                    </u-cell-item>
                    <view class="weather-tag">
                        <u-tag text="雨" mode="light" />
                        <u-tag text="雪" mode="light" />
                        <u-tag text="晴天" mode="light" />
                        <u-tag text="阴天" mode="light" />
                        <u-tag text="暴雨" mode="light" />
                    </view>
                </u-cell-group>
            </view>
            <view class="page-bottom-button">
                <u-button type="primary" shape="circle">保存</u-button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                enable: false,
                list1: [
                    { title: "卷起时间", value: "0小时0分钟" },
                    { title: "铺开时间", value: "0小时0分钟" },
                ],
                list2: [
                    { title: "卷起时间", value: "0小时0分钟" },
                    { title: "铺开时间", value: "0小时0分钟" },
                ],
                subList: [{ name: "基本设置" }, { name: "自动调温" }, { name: "放晨风" }],
                titleStyle1: { "font-size": "32rpx", color: "#333" },
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
    .tip-color {
        padding: 20rpx;
        background-color: $app-theme-bg-color;
        color: $app-theme-text-money-color;
        font-size: 30rpx;
    }
    .btn {
        position: fixed;
        width: 100%;
        padding: 20rpx;
        left: 0;
        bottom: 40rpx;
        z-index: 66;
    }
    .weather-tag {
        padding: 20rpx;
        background-color: $app-theme-bg-color;
        ::v-deep .u-tag {
            font-size: 28rpx;
            margin-left: 30rpx;
        }
    }
</style>
