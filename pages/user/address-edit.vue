/* 新增编辑地址 */
<template>
	<view class="index">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="收件人" prop="name">
				<u-input v-model="form.name" placeholder="请输入收货人" />
			</u-form-item>
			<u-form-item label="手机号" prop="tel">
				<u-input v-model="form.tel" placeholder="请输入手机号" />
			</u-form-item>
			<u-form-item label="所在地区" prop="city">
				<u-input v-model="form.city" placeholder="请输入收货人" @click="showArea = true" />
			</u-form-item>
			<u-form-item label="详细地址" prop="area">
				<u-input v-model="form.area" placeholder="请输入详细地址" />
			</u-form-item>
			<u-form-item label="身份证号" prop="sfz">
				<u-input v-model="form.sfz" placeholder="请输入收件人身份证号(选填)" />
			</u-form-item>
			<u-form-item label="设为默认地址" label-width="550">
				<u-switch v-model="form.only"></u-switch>
			</u-form-item>
		</u-form>
		<view class="btn">
			<u-button type="primary" @click="addOrUpdateAddressInfo()">保存地址</u-button>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="showArea" :area-code="['41', '4101', '410102']"
			@confirm="confirmAddress" />
	</view>
</template>

<script>
	import {
		getMyAddressDetail,
		saveOrDeleteAddressInfo
	} from "../../config/api.js";
	export default {
		data() {
			return {
				updateType: 1,
				addressInfoId: 0,
				fromUrl: "",
				form: {
					name: "",
					tel: "",
					city: "",
					area: "",
					sfz: "",
					only: true,
				},
				showArea: false,
				rules: {
					//验证规则
					name: [{
						required: true,
						message: "请输入姓名",
						// 可以单个或者同时写两个触发验证方式
						trigger: "blur,change",
					}, ],
					tel: [{
							required: true,
							message: "请输入手机号",
							trigger: ["change", "blur"],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: "手机号码不正确",
							trigger: "blur",
						},
					],
					city: [{
						required: true,
						message: "请选择地区",
						trigger: "change",
					}, ],
					area: [{
						required: true,
						message: "请输入详细地址",
						trigger: "blur,change",
					}, ],
				},
			};
		},
		components: {},
		watch: {
			form: {
				handler(newForm, oldForm) {
					if (newForm.sfz != "") {
						this.rules.sfz = [{
								required: true,
								message: "请输入身份证号",
								trigger: ["change", "blur"],
							},
							{
								validator: (rule, value, callback) => {
									return this.$u.test.idCard(value);
								},
								message: "身份证号码不正确",
								trigger: "blur",
							},
						];
					} else {
						this.$delete(this.rules, "sfz");
					}
				},
				immediate: true,
				deep: true,
			},
		},
		onLoad(e) {
			let navTitle = "";
			this.fromUrl = e.fromUrl;
			if (e.id == undefined) {
				navTitle = "新增收货地址";
			} else {
				this.updateType = 2;
				this.addressInfoId = e.id;
				navTitle = "编辑收货地址";
				this.getAddressDetail(e.id);
			}
			uni.setNavigationBarTitle({
				title: navTitle,
			});
		},
		onShow() {},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			getAddressDetail(addressInfoId) {
				var data = {
					addressInfoId: addressInfoId,
				};

				getMyAddressDetail(data).then((res) => {
					console.log("getMyAddressDetail " + JSON.stringify(res.data));
					if (res.code == 0) {
						var addressInfo = res.data.addressInfo;
						this.form.name = addressInfo.rcvContact;
						this.form.tel = addressInfo.rcvContactPhone;
						debugger;
						this.form.city = "河南省-" + addressInfo.addressValue;
						this.form.area = addressInfo.rcvSiteAddress;
						this.form.sfz = addressInfo.certificateNo == null ? "" : addressInfo.certificateNo;
						this.form.only = addressInfo.isDefault == "Y" ? true : false;
					} else {
						this.$refs.uToast.show({
							title: res.message,
							type: "error",
						});
					}
				});
			},
			confirmAddress(result) {
				this.form.city =
					result.province.label +
					"-" +
					result.city.label +
					"-" +
					result.area.label +
					"-" +
					result.street;
			},
			addOrUpdateAddressInfo() {
				this.$refs.uForm.validate((valid) => {
					debugger;
					// 触发验证通过
					if (valid) {
						//省市县街道
						var addressStr = this.form.city;
						var province = addressStr.split("-")[0];
						var city = addressStr.split("-")[1];
						var district = addressStr.split("-")[2];
						var street = addressStr.split("-")[3];
						var isDefault = this.form.only == true ? "Y" : "N";
						var data = {
							dzAddressInfoId: this.addressInfoId,
							updateType: this.updateType,
							rcvContact: this.form.name,
							rcvContactPhone: this.form.tel,
							rcvSiteAddress: this.form.area,
							certificateNo: this.form.sfz,
							isDefault: isDefault,
							province: province,
							city: city,
							district: district,
							street: street,
						};
						saveOrDeleteAddressInfo(data).then((res) => {
							console.log("saveOrDeleteAddressInfo " + JSON.stringify(res));
							if (res.code == 0) {
								uni.navigateBack({
									delta: 1,
								});
							} else {
								this.$refs.uToast.show({
									title: res.message,
									type: "error",
								});
							}
						});
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.index {
		height: calc(100vh - var(--window-top));
		padding: 0 30rpx;
		background-color: #fff;
		position: relative;

		.btn {
			position: absolute;
			width: 100%;
			padding: 20rpx;
			left: 0;
			bottom: 0;
			z-index: 66;
		}
	}
</style>
