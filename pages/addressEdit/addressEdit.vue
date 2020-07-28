<template>
	<view class="addressEdit">
		<u-form :model="form" ref="uForm" class="form">
			<u-form-item label="姓名"><u-input v-model="form.address_name" placeholder="收货人姓名" /></u-form-item>
			<u-form-item label="电话"><u-input v-model="form.address_phone" placeholder="收货人电话" /></u-form-item>
			<u-form-item label="地区">
				<u-input placeholder="选择省 / 市 / 区" v-model="area" :disabled="true" @click="show = true" />
				<u-icon name="arrow-right" @click="show = true"></u-icon>
			</u-form-item>
			<u-form-item label="住址"><u-input v-model="form.address_addressDetail" placeholder="详细地址" /></u-form-item>
		</u-form>
		<u-picker mode="region" v-model="show" :params="params" @confirm="changeArea" :area-code='areaCode'></u-picker>
		<u-button class="submitBtn" shape="circle" type="error" @click="toSave()">保存</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				address_name: '',
				address_phone: '',
				address_province: '',
				address_city: '',
				address_county: '',
				address_areacode: '',
				address_addressDetail: ''
			},
			show: false,
			area: '',
			params: { province: true, city: true, area: true },
			areaCode:['11','1101','110101',]
		};
	},
	onLoad(option) {
		if (option.id) {
			this.requestByToken('index/searchAddressId', 'get', {
				id: option.id
			}).then(res => {
				this.form = {
					id: res.data.data.id,
					address_name: res.data.data.address_name,
					address_phone: res.data.data.address_phone,
					address_province: res.data.data.address_province,
					address_city: res.data.data.address_city,
					address_county: res.data.data.address_county,
					address_areacode: res.data.data.address_areacode,
					address_addressDetail: res.data.data.address_addressDetail
				};
				let resAreaCode =res.data.data.address_areacode
				this.areaCode = [resAreaCode.slice(0,2),resAreaCode.slice(0,4),resAreaCode],
				this.area = res.data.data.address_province + res.data.data.address_city + res.data.data.address_county;
			});
		}
	},
	onReady() {},
	methods: {
		toSave() {
			for (var key in this.form) {
				if (this.form[key] == '') {
					this.$refs.uToast.show({
						title: '请正确填写地址',
						type: 'warning'
					});
					return;
				}
			}
			this.requestByToken('index/address', 'post', this.form)
				.then(res => {
					uni.redirectTo({
						url: '/pages/address/address',
						animationType: 'pop-in',
						animationDuration: 200
					});
				})
				.catch(err => {
					console.log(err);
				});
		},
		changeArea(params) {
			console.log(params)
			this.area = params.province.label + params.city.label + params.area.label;
			this.form.address_province = params.province.label;
			this.form.address_city = params.city.label;
			this.form.address_county = params.area.label;
			this.form.address_areacode = params.area.value;
		}
	}
};
</script>

<style lang="scss" scoped>
.addressEdit {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	padding: 20rpx;
	box-sizing: border-box;
	.form {
		width: 100%;
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-bottom: 50rpx;
	}
}
</style>
