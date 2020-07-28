<template>
	<!-- 收获地址 -->
	<view class="address">
		<view class="address-list">
			<view class="address-every" v-for="(item, index) in addressList" :key="index">
				<view class="address-every-name" @click="selectAddress(item.id)">{{ item.name }}</view>
				<view class="address-every-tel" @click="selectAddress(item.id)">{{ item.tel }}</view>
				<view class="address-every-location" @click="selectAddress(item.id)">{{ item.address }}</view>
				<view class="address-every-edit" @click="toEdit(item.id)"><u-icon name="edit-pen" size="28"></u-icon></view>
			</view>
		</view>
		<view class="addBtn"><u-button @click="toAdd()" type="error" shape="square">新增地址</u-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			chosenAddressId: 1,
			addressList: []
		};
	},
	onLoad() {
		this.requestByToken('index/searchAddress', 'get', {}).then(res => {
			res.data.data.forEach(item => {
				this.addressList.push({
					id: item.id,
					tel: item.address_phone,
					name: item.address_name,
					address: item.address_province + item.address_city + item.address_county + item.address_addressDetail,
					areaCode: item.address_areacode
				});
			});
		});
	},
	methods: {
		toAdd() {
			uni.redirectTo({
				url: '/pages/addressEdit/addressEdit',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		toEdit(id) {
			uni.redirectTo({
				url: '/pages/addressEdit/addressEdit?id=' + id,
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		selectAddress(id) {
			uni.navigateTo({
				url: '/pages/order/order?id=' + id,
				animationType: 'pop-in',
				animationDuration: 200
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.address {
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	.address-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.address-every {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			background-color: #ffffff;
			margin-bottom: 20rpx;
			padding: 30rpx;
			box-sizing: border-box;
			.address-every-name {
				width: 30%;
				font-size: 32rpx;
			}
			.address-every-tel {
				width: 70%;
				font-size: 32rpx;
			}
			.address-every-location {
				width: 90%;
			}
			.address-every-edit {
				width: 10%;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	.addBtn {
		width: 100%;
		height: 120rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 666;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx;
		box-sizing: border-box;
		.u-btn {
			width: 100%;
		}
	}
}
</style>
