/* 公告 */
<template>
    <view class="commen-index">
        <view class="commen-content">
            <scroll-view scroll-y style="height: 100%; width: 100%">
                <view
                    class="notice-item"
                    v-for="(item, index) in noticeList"
                    ::key="index"
                    @tap="toNoticeDetail(item.PUBLISH_ID)"
                >
                    <view class="title">
                        {{ item.TITLE }}
                    </view>
                    <view class="time"> {{ item.PUBLISH_DATE }}</view>
                    <u-line margin="20rpx 0" color="#2979ff" border-style="dashed" />
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
	import { getNotificationListAPI } from "../../config/api.js";
    export default {
        data() {
            return {
				queryList: {
				    //请求接口传的参数
				},
                noticeList: [
                ],
            };
        },
        components: {},
		onLoad(param) {
			this.queryList.infoType = '',
			this.getNotificationList();
		},
        watch: {},
        methods: {
			getNotificationList(){
				getNotificationListAPI(this.queryList).then((res) => {
					this.noticeList = res.data.notifications
				})
			},
            toNoticeDetail(id) {
				console.log(id)
                uni.navigateTo({
                    url: "/pages/my/notice-detail?id" + id,
                    animationType: "pop-in",
                    animationDuration: 200,
                });
            },
        },
    };
</script>

<style scoped lang="scss">
    .commen-content {
        background-color: #fff;
    }
</style>
