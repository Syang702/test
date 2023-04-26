/* 地址 */
<template>
    <view class="index">
        <view class="address-item" v-for="item in addressList" :key="item.id">
            <view class="address-right">
                <view class="address-info" @click="selectAddress(item)">
                    <span>{{ item.name }}</span>
                    <span class="info-tel">{{ item.tel }}</span>
                </view>
                <view class="address-desc" @click="selectAddress(item)">{{ item.site }}</view>
                <view class="address-footer">
                    <u-checkbox v-model="item.checked" shape="circle" @change="delAddress(item.id, '5')">默认地址
                    </u-checkbox>
                    <view class="buttons">
                        <view @tap="toAddressEdit(item.id)"><text class="icon iconfont icon-bianji"></text>编辑</view>
                        <view @tap="delAddress(item.id, '3')"><text class="icon iconfont icon-shanchu3"></text>删除</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="btn">
            <u-button @click="toAddressEdit(null)" type="primary">新建收货地址</u-button>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { getAddressInfo, deleteAddressInfo } from "../../config/api.js";

var order = {};
var userInfo = {};
var data = {};

export default {
    name: "address-list",
    data() {
        return {
            flag: 0,
            addressList: [],
            receiveData: JSON.parse(uni.getStorageSync("poInfo")),
        };
    },
    props: {
        listMode: {
            // 列表还是选择地址模式
            type: Boolean,
            default: false,
        },
    },
    onload() { },
    methods: {
        selectAddress(item) {
            // 选择地址
            if (this.listMode == false) {
                return;
            }
            var addrInfoList = [];
            var addrInfo = {};
            addrInfo.DEFAULTFLAG = "Y";
            addrInfo.RECADDREEID = item.id;
            addrInfo.RECCONTACTNAME = item.name;
            addrInfo.RECCONTACTPHONE = item.tel;
            addrInfo.RECADDRESSINFO = item.site;
            addrInfoList[0] = addrInfo;
            this.$emit("selectAddressID", addrInfoList);
        },
        toAddressEdit(id) {
            //地址编辑
            let url = id == null ? "/pages/my/address-edit" : "/pages/my/address-edit?id=" + id;
            uni.navigateTo({
                url: url,
                animationType: "pop-in",
                animationDuration: 200,
            });
        },
        delAddress(addressInfoId, updateType) {
            var data = {
                dzAddressInfoId: addressInfoId,
                updateType: updateType,
            };
            deleteAddressInfo(data).then((res) => {
                console.log("deleteAddressInfo " + JSON.stringify(res));
                if (res.code == 0) {
                    this.$refs.uToast.show({
                        title: updateType == 3 ? "删除成功" : "操作成功",
                        type: "success",
                    });
                    this.getAddressInfo();
                } else {
                    this.$refs.uToast.show({
                        title: res.message,
                        type: "error",
                    });
                }
            });
        },
        getAddressInfo() {
            var data = {
                userId: this.receiveData["userId"],
            };
            getAddressInfo(data).then((res) => {
                console.log("getAddressInfo " + JSON.stringify(res));
                if (res != null && "0" == res.code) {
                    this.receiveData["recAddressInfoMap"] = res.data.recAddressInfoMap;
                    this.addressFunction();
                }
            });
        },
        addressFunction() {
            var recAddressList = this.receiveData["recAddressInfoMap"];
            if (recAddressList.length > 0) {
                for (var i = 0; i < recAddressList.length; i++) {
                    var defaultRecAddressInfo = {};
                    defaultRecAddressInfo.id = recAddressList[i]["RECADDREEID"];
                    defaultRecAddressInfo.name = recAddressList[i]["RECCONTACTNAME"];
                    defaultRecAddressInfo.tel = recAddressList[i]["RECCONTACTPHONE"];
                    defaultRecAddressInfo.site = recAddressList[i]["RECADDRESSINFO"];
                    defaultRecAddressInfo.checked =
                        "Y" == recAddressList[i]["DEFAULTFLAG"] ? true : false;
                    this.addressList[i] = defaultRecAddressInfo;
                }
            } else {
                this.addressList = [];
            }
            this.flag = Math.random();
        },
        checkboxChange(e) { },
    },
};
</script>

<style scoped lang="scss">
.address-item {
    display: flex;
    padding: 30rpx;
    background-color: #fff;
    margin-bottom: 30rpx;

    .address-right {
        width: 100%;
        .address-info {
            font-weight: bold;

            .info-tel {
                padding-left: 20rpx;
            }
        }

        .address-desc {
            margin-top: 10rpx;
            color: #808080;
            line-height: 40rpx;
        }

        .address-footer {
            margin-top: 20rpx;
            padding-top: 20rpx;
            @include flex-center(space-between, center);
            border-top: 1px solid #eee;

            .buttons {
                @include flex-center();

                view {
                    color: #333;

                    &:not(:first-child) {
                        margin-left: 30rpx;
                    }
                }
            }
        }
    }
}

.btn {
    position: absolute;
    width: 100%;
    padding: 20rpx;
    left: 0;
    bottom: 0;
    z-index: 66;
}
</style>
