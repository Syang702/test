/* 物流详情 */
<template>
    <view class="commen-index">
        <view class="desc">
<!--            <u-cell-group>
                <u-cell-item title="物流公司" :value="logisticsInfo.logisticsName" :arrow="false"></u-cell-item>
                <u-cell-item title="运单编号" :value="logisticsInfo.logisticsOrder" :arrow="false">
                    <u-tag slot="right-icon" size="mini" border-color="#909399" color="#909399" text="复制" mode="plain" shape="circle" @click="setClipboard">
                    </u-tag>
                </u-cell-item>
                <u-cell-item title="物流电话" :value="logisticsInfo.logisticsTel" :arrow="false"></u-cell-item>
            </u-cell-group> -->
        </view>
        <view class="commen-content">
<!--            <u-time-line>
                <u-time-line-item v-for="(item,index) in logisticsInfo.detailList" :key="index">
                    <template v-slot:node>
                        <view class="u-node" style="background: #0084cf;" v-if="index==0">
                            <u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
                        </view>
                    </template>
                    <template v-slot:content>
                        <view>
                            <view class="u-order-desc">{{item.comments}}</view>
                            <view class="u-order-time">{{item.transferDate}}</view>
                        </view>
                    </template>
                </u-time-line-item>
            </u-time-line> -->
        </view>
    </view>
</template>

<script>
	import { getLogisticsDetail } from '../../config/api.js'
export default {
    data() {
        return {
			logisticsInfo:{},
			queryList:{}
        };
    },
	onLoad(e) {
		this.queryList.poHeaderId = e.poHeaderId;
		this.getLogisticInfo()
	},
    components: {
    },
    watch: {
    },
    methods: {
		getLogisticInfo(){
			this.logisticsInfo = {};
			getLogisticsDetail(this.queryList).then(res=>{
				var logistics = res.data.logisticsList;
				 if(logistics.length>0){
					 this.logisticsInfo.logisticsName = logistics[0].logisticsName;//物流公司
					 this.logisticsInfo.logisticsOrder = logistics[0].logisticsOrder;//运单编号
					 this.logisticsInfo.logisticsTel = "";//物流公司电话
				 }
				 var detailList = res.data.logisticsDetailList;
				 var detailList = [];
				 detailList.forEach(detail=>{
					 let detaiJson = {};
					 detaiJson.comments = detail.comments;
					 detaiJson.transferDate = detail.transferDate;
					 detailList.push(detaiJson);
				 })
				 this.logisticsInfo.detailList = detailList;
				 
			})
		},
        setClipboard() {
            uni.setClipboardData({ //复制
                data: 'hello',
            });
        },
    }
};
</script>

<style scoped lang="scss">
.desc {
    ::v-deep.u-cell-item-box {
        border-radius: 20rpx;
        .u-cell {
            padding: 10rpx 32rpx;
            .u-tag {
                margin-left: 10rpx;
            }
        }
    }
}
.commen-content {
    padding-top: 40rpx !important;
    padding-left: 40rpx !important;
    background-color: #fff;
    .u-node {
        width: 44rpx;
        height: 44rpx;
        border-radius: 50%;
        @include flex-center;
    }
    .u-order-desc {
        font-size: 28rpx;
        margin-bottom: 6rpx;
    }
    .u-order-time {
        color: rgb(200, 200, 200);
        font-size: 26rpx;
    }
}
</style>
