/* 申请退款 */
<template>
    <view class="index">
        <view class="order-number">
            订单编号：<text class="font-bold">123456789</text>
        </view>
        <view class="commen-order-goods-box">
            <view class="order" v-for="(res, index) in orderList" :key="res.id">
                <view class="top">
                    <view class="left">
                        <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                        <view class="store">{{ res.store }}</view>
                    </view>
                </view>
                <view class="item" v-for="(item, index) in res.goodsList" :key="index">
                    <view class="left">
                        <image :src="item.goodsUrl" mode="aspectFill"></image>
                    </view>
                    <view class="content">
                        <view class="title u-line-2">{{ item.title }}</view>
                        <view class="type">{{ item.type }}</view>
                        <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                    </view>
                    <view class="right">
                        <view class="price">
                            ￥{{ item.price }}
                            <text class="decimal">.{{ item.price }}</text>
                        </view>
                        <view class="number">x{{ item.number }}</view>
                    </view>
                </view>
            </view>
        </view>
        <u-gap height="20"></u-gap>
        <view class="other-box">
            <u-cell-group>
                <u-cell-item title="退款类型" value="请选择"></u-cell-item>
            </u-cell-group>
        </view>
        <u-gap height="20"></u-gap>
        <view class="other-box">
            <u-cell-group>
                <u-cell-item title="退款总额" value="￥9000.00" :arrow="false" :value-style="{color:'#f24444'}"></u-cell-item>
            </u-cell-group>
        </view>
        <u-gap height="20"></u-gap>
        <view class="reason-content">
            <view class="title">上传凭证</view>
            <u-upload ref="uUpload" :action="action" :file-list="fileList" :auto-upload="true" max-count="1" name="image" :show-progress="false"
                      @on-success="uploadSuccess"></u-upload>
        </view>
        <u-gap height="20"></u-gap>
        <view class="reason-content">
            <view class="title">退款原因</view>
            <u-field v-model="reason" label-width="0" placeholder="请填写退款原因" :clearable="false" type="textarea" />
        </view>
        <u-gap height="120" bg-color="#fff"></u-gap>
        <view class="btn">
            <u-button type="primary" shape="circle">提交</u-button>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
export default {
    data() {
        return {
            orderList: [
                {
                    id: 1,
                    store: '商城',
                    deal: '交易成功',
                    goodsList: [
                        {
                            goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
                            title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
                            type: '灰色;M',
                            deliveryTime: '付款后30天内发货',
                            price: '348.58',
                            number: 2
                        },
                        {
                            goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
                            title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
                            type: '45cm;S',
                            deliveryTime: '付款后30天内发货',
                            price: '135.00',
                            number: 1
                        }
                    ]
                },
            ],
            fileList: [], // 上传文件列表
            action: this.BASE_FILE_URL + 'api/upload/fileUpload',   // 上传链接
            reason: ''

        };
    },
    components: {

    },
    watch: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        uploadSuccess(data, index, lists, name) { //上传成功
            console.log(data)
        },
    }
};
</script>

<style scoped lang="scss">
.index {
    .order-number {
        background-color: #fff;
        padding: 20rpx 20rpx 10rpx;
    }
    ::v-deep.u-cell-item-box {
        border-radius: 20rpx;
    }
    .reason-content {
        padding: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;
        .title {
            height: 50rpx;
        }
        .u-field.u-border-bottom {
            background-color: #f4f5f6;
        }
    }
    .btn {
        position: fixed;
        width: 100%;
        padding: 20rpx;
        left: 0;
        bottom: 0;
        z-index: 66;
    }
}
</style>
