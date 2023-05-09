/* 订单支付 */
<template>
	<view class="index">
		<view class="order-pay">
			<view class="img">
				<image class="order-pay-title-img" src="../../static/images/index/title.png" />
			</view>
<!-- 			<view class="pay-content">
				<scroll-view scroll-y style="height: 100%">
					<u-cell-group>
						<u-cell-item title="支付订单号" :value="gatherOrder" :arrow="false"></u-cell-item>
						<u-cell-item title="收件人" :value="recContactName" :arrow="false"></u-cell-item>
						<u-cell-item title="手机号" :value="recContactPhone" :arrow="false"></u-cell-item>
						<u-cell-item title="收货地址" :value="recContactInfo" :arrow="false"></u-cell-item>
						<u-cell-item title="商品金额" :value="'￥' + realityPayamount" :arrow="false"></u-cell-item>
					</u-cell-group>

					<u-cell-group v-for="(item, index) in couponsList" :key="index" v-if="vouShow">
						<u-cell-item :title="item.vouTypeName" :value="'￥' + item.amound" :value-style="valueStyle"
							@click="choseVou(item)"></u-cell-item>
					</u-cell-group>

					<u-cell-group v-if="rabateShow">
						<u-cell-item title="返利" :value="'￥' + fanliUseData" :value-style="valueStyle"
							@click="choseVou({ vouType: 'rebate' })"></u-cell-item>
					</u-cell-group>

					<u-cell-group>
						<u-cell-item title="优惠金额" :value="'￥' + deductionAmount" :arrow="false"></u-cell-item>
						<u-cell-item title="实付金额" :value="'￥' + needPayAmound" :arrow="false"></u-cell-item>
					</u-cell-group>
				</scroll-view>
			</view> -->
		</view>
		<view class="btn">
			<u-button :class="[payBtnDis ? 'disabled' : '']" @click="toPay()" type="primary" shape="circle">确认支付
			</u-button>
		</view>
		<u-popup v-model="showPopup" mode="bottom" height="722rpx" :mask-close-able="false">
			<view class="popup-card">
				<view class="popup-card-header">
					<!-- <view class="header-left" >取消</view> -->
					<view class="header-title">{{ couponType == "rebate" ? "返利" : "卡包" }}</view>
					<view class="header-right" @click="pushItem()">确定</view>
				</view>
				<view class="popup-card-desc" v-if="couponType != 'rebate'">
					<view class="desc-item">{{ couponType }}我的卡券：{{ couponInfo.couponNumber }}张，{{
                            couponInfo.couponMoney
                        }}元
					</view>
					<view class="desc-item">
						最多可用：卡券{{ couponInfo.mostUseMoney }}元，已累计使用{{
                            couponInfo.totalUsedMoney
                        }}元</view>
					<view class="desc-item text-color-red">
						本次使用：卡券{{ couponInfo.currentUseNumber }}张，{{
                            couponInfo.currentUseMoney
                        }}元</view>
				</view>
				<view class="popup-card-desc" v-if="couponType == 'rebate'">
					<view class="desc-item">我的返利：{{ couponInfo.couponMoney }}元</view>
					<view class="desc-item"> 最多可用：返利{{ couponInfo.totalUsedMoney }}元</view>
					<view class="desc-item text-color-red">
						本次使用：返利{{ fanliUseData }}元</view>
				</view>
				<view class="popup-card-body">
					<scroll-view scroll-y style="height: 100%; width: 100%">
						<view class="commen-coupon-card-item" :style="{ backgroundImage: 'url(' + bgImg + ')' }"
							v-for="(item, index) in couponList" :key="index" v-if="couponType != 'rebate'">
							<view class="card-item-left">
								<view class="card-price">
									<span>￥</span><span class="card-price-off">{{ item.FACE_VALUE }}</span>
								</view>
								<view class="card-limit">还剩{{ item.AVILABLE_QTY }}张</view>
							</view>
							<view class="card-item-right">
								<view class="card-info">
									<view class="card-name overflow-ellipsis">{{
                                        item.APPLY_NAME
                                    }}</view>
								</view>
								<view class="icon">
									<view class="stepper">
										<view class="stepper-minus" :class="{
                                                'u-icon-disabled': item.VOU_USED_QTY <= 0,
                                            }">
											<u-icon name="minus" @click="minus(item)"></u-icon>
										</view>
										<input type="number" v-model="item.VOU_USED_QTY" class="stepper-input"
											disabled />
										<view class="stepper-plus" :class="{
                                                'u-icon-disabled':
                                                    item.VOU_USED_QTY >= item.AVILABLE_QTY,
                                            }">
											<u-icon name="plus" @click="plus(item)"></u-icon>
										</view>
									</view>
								</view>
								<view class="card-bottom">
									有效期至{{ item.EFECTIVE_END_DATE }}</view>
							</view>
						</view>

						<view class="commen-coupon-card-item" :style="{ backgroundImage: 'url(' + bgImg + ')' }"
							v-if="couponType == 'rebate'">
							<view class="card-item-left">
								<view class="card-price">
									<span><i class="icon iconfont icon-fanli"></i></span>
								</view>
								<view class="card-limit">{{ fanli }}元</view>
							</view>
							<view class="card-item-right">
								<view class="card-info">
									<view class="card-name overflow-ellipsis">{{
                                        APPLY_NAME
                                    }}</view>
								</view>
								<view class="card-fanli">
									使用
									<u-input v-model="fanliUseData" type="number" input-align="center"
										:clearable="false" :custom-style="inputCustomStyle" @input="validRebate()" />元
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		gatherPay,
		payHandleServlet,
		getWxVouLimit
	} from "../../config/api.js";

	export default {
		data() {
			return {
				flag: 0,
				payInfo: {},
				orderPay: {},
				userInfo: {},
				isAgain: "",
				gatherOrder: "",
				vendorType: "",
				createtype: "",
				payData: {},
				venVouFlag: "",
				payType: [],
				fanli: 0,
				valueStyle: {
					color: "#f24444",
				},
				vouShow: false,
				payBtnDis: false,
				showPopup: false,
				inputCustomStyle: {
					borderBottom: "1rpx solid #000000",
					width: "200rpx",
				},
				wepayShow: false,
				alipayShow: false,
				otherMsgShow: false,
				rabateShow: false,
				realityPayamount: 0,
				needPayAmound: 0,
				deductionAmount: 0,
				recContactName: "",
				recContactPhone: "",
				recContactInfo: "",
				couponsList: [],
				mainForm: {},
				// 卡券使用参数
				couponInfo: {}, // 弹出框优惠券信息
				bgImg: "http://192.168.9.1:7001/h5/static/images/card/bg.png",
				couponList: [], //优惠券列表

				cardUse: {},
				couponType: "", //temptypeFlag || $.query.get("couponType"),
				couponDatas: [],
				rebate: 0,
				useVouLimit: "",
				coinVouLimit: "",
				couponArray: [],
				pay: 0, //订单金额

				usedtpN: 0, //使用4G补贴券的总金额
				usedzcV: 0, //使用的供应商专用券
				usedcjq: 0, //使用的酬金券总金额
				usedzd5gV: 0, //使用的终端公司5G金币专用券总金额
				usedzd5gC: 0, //使用的终端公司5G金币专用券个数
				usedvenCount: 0,
				usedvenAmount: 0,
				usedAllCoponAmount: 0, //已使用的所有券累计金额

				// 数量组件
				countComponts: [],
				//获取已使用返利金额
				fanliUseData: 0,
				//当前订单 所有券使用信息
			};
		},
		components: {},
		watch: {},
		onLoad(param) {
			this.isAgain = param.isAgain;
			this.gatherOrder = param.gatherOrder;
			this.vendorType = param.vendorType;

			this.loadInfo();
		},
		methods: {
			getmylist(data, id, idkey) {
				var temp = [];
				for (var di in data) {
					var datai = data[di];
					if (datai[idkey] == id) {
						temp.push(datai);
					}
				}
				return temp;
			},
			replaceMyList(data, id, idkey, obj) {
				var temp = [];
				for (var di in data) {
					var datai = data[di];
					if (datai[idkey] != id) {
						temp.push(datai);
					} else {
						temp.push(obj);
					}
				}
				return temp;
			},
			loadInfo() {
				//获取页面所需元素值
				this.getPayInfo();
			},
			choseVou(item) {
				this.couponType = item.vouType;
				if (item.vouType != "rebate") {
					this.couponTypeName = item.vouTypeName;
				}
				this.loadCouponInfo();
				this.showSelectedCard();
			},

			loadCouponInfo() {
				this.rebate = this.payData["rebate"];
				this.pay = this.payData["orderAmount"];

				this.couponList = this.getmylist(this.couponDatas, this.couponType, "VOU_TYPE");
				this.getDisVouLimit();
			},
			getDisVouLimit() {
				var data = {
					gatherOrder: this.gatherOrder,
				};
				getWxVouLimit(data).then((res) => {
					if (res.code == "0") {
						this.useVouLimit = res.data.useVouLimit;
						this.coinVouLimit = res.data.coinVouLimit;
						if (this.couponType == "rebate") {
							this.dispRebateDiv();
						} else {
							this.dispConpouDiv();
						}
						this.showPopup = true;
					} else {
						this.$refs.uToast.show({
							title: "未获取到使用券的限额，请联系系统管理员核实！",
							type: "error",
						});
					}
				});
			},
			dispRebateDiv() {
				var companyName = this.payData["PO_HEADERS_JSON"]["COMPANY_NAME"];
				this.couponInfo.couponMoney = this.rebate;
				this.couponInfo.totalUsedMoney = this.rebate;
				this.fanli = this.rebate;
				this.flag = Math.random();
			},
			dispConpouDiv() {
				var totalNum = 0;
				var totalAmound = 0;
				for (var cd in this.couponList) {
					var usedNum = 0;
					totalNum = totalNum + this.couponList[cd]["AVILABLE_QTY"];
					totalAmound =
						totalAmound +
						Number(this.couponList[cd]["AVILABLE_QTY"]) *
						Number(this.couponList[cd]["FACE_VALUE"]);
				}
				this.couponInfo["couponNumber"] = totalNum;
				this.couponInfo["couponMoney"] = totalAmound;

				console.log("此处有疑问???????????????????????????");
				if (this.couponType == 12) {
					this.couponInfo.mostUseMoney = coinVouLimit;
				} else {
					this.couponInfo.mostUseMoney = this.useVouLimit;
				}
				this.couponInfo.totalUsedMoney =
					this.usedtpN + this.usedcjq - this.usedzcV - this.usedvenAmount;
				this.flag = Math.random();
			},
			showSelectedCard() {
				var count = 0;
				var money = 0;
				var fanli = 0;
				for (var i = 0; i < this.couponList.length; i++) {
					var cp = this.couponList[i];
					count += cp.VOU_USED_QTY;
					money += cp.VOU_USED_QTY * cp.FACE_VALUE;
				}

				if (this.couponType == "rebate") {
					this.couponInfo.currentUseNumber = this.fanli;
					this.couponInfo.currentUseMoney = this.fanli;
				} else {
					this.couponInfo.currentUseNumber = count;
					this.couponInfo.currentUseMoney = money;
				}
				this.flag = Math.random();
			},
			validRebate() {
				var inputRebate = this.fanliUseData;
				if (isNaN(inputRebate) || Number(inputRebate) < 0) {
					this.fanliUseData = 0;
					this.$refs.uToast.show({
						title: "请输入有效的返利金额",
						type: "error",
					});
					this.flag = Math.random();
					return false;
				}
				if (Number(inputRebate) > Number(this.fanli)) {
					this.fanliUseData = this.fanli;
					this.$refs.uToast.show({
						title: "不能大于最大可用返利金额",
						type: "error",
					});
					this.flag = Math.random();
					return false;
				}

				var rest =
					Number(this.pay) -
					Number(this.usedtpN) -
					Number(this.usedzd5gV) -
					Number(inputRebate);
				if (Number(rest) <= 0) {
					//先检查总金额和优惠
					this.fanliUseData = Number(inputRebate) + Number(rest);
					this.$refs.uToast.show({
						title: "选择的券、返利合计金额不能超过应付款金额",
						type: "error",
					});
					this.flag = Math.random();
					return false;
				}
			},
			initHeaderData(poData) {
				this.recContactName = poData["RCV_CONTACT"];
				this.recContactPhone = poData["RCV_CONTACT_PHONE"];
				this.recContactInfo = poData["RCV_SITE_ADDRESS"];
				this.realityPayamount = poData["NEET_PAY_AMOUNT"];
			},
			initCouponData(couponData) {
				var keys = Object.keys(couponData);
				if (keys.length > 0) {
					this.vouShow = true;
					for (var i = 0; i < keys.length; i++) {
						var coupon = {};
						coupon.vouTypeName = couponData[keys[i]];
						coupon.vouType = keys[i];
						coupon.amound = 0;
						this.couponsList[i] = coupon;
					}
				}
				//修改页面返利元素
				if (this.payData["rebate"] == 0 || this.payData["rebate"] == "") {
					this.rabateShow = false;
				} else {
					this.rabateShow = true;
				}
			},
			checkPay(poData) {
				var deductionAmount = 0;
				for (var i = 0; i < this.couponsList.length; i++) {
					var coponInfo = this.couponsList[i];
					if (coponInfo.vouType != 8) {
						deductionAmount = Number(deductionAmount) + Number(coponInfo.amound);
					}
				}
				deductionAmount = Number(deductionAmount) + Number(this.fanliUseData);
				this.deductionAmount = Number(deductionAmount.toFixed(2));
				this.needPayAmound = Number(poData["NEET_PAY_AMOUNT"] - deductionAmount).toFixed(2);
			},
			minus(item) {
				//   - 数量
				if (item.VOU_USED_QTY <= 0) {
					return;
				}
				item.VOU_USED_QTY = item.VOU_USED_QTY - 1;
				this.changeCouponNum(item);
			},
			plus(item) {
				// + 数量
				if (item.VOU_USED_QTY >= item.AVILABLE_QTY) {
					return;
				}
				item.VOU_USED_QTY = item.VOU_USED_QTY + 1;
				if (this.changeCouponNum(item)) {

				} else {
					item.VOU_USED_QTY = item.VOU_USED_QTY - 1;
				}
			},
			changeCouponNum(item) {
				// 选择优惠券数量
				console.log(JSON.stringify(item));

				var bl = this.inputOnlyNum(item);
				if (bl) {
					this.showSelectedCard();
				}
				return bl
			},
			inputOnlyNum(item) {
				//by hanbin
				var createType = this.payData["PO_HEADER_DTO"]["createType"];
				//是否对供应商抵用券的使用数量进行限制（0:限制，否则不限制）ADD BY ZHANGXING 2017-9-14 15:31:06
				var venVouFlag = this.payData["PO_HEADERS_JSON"]["VEN_VOU_FLAG"];

				var rest;
				var tpN = 0; //使用4G补贴券的总金额
				var zcV = 0; //使用的供应商专用券
				var cjq = 0; //使用的酬金券总金额
				var zd5gV = 0; //使用的终端公司5G金币专用券总金额
				var zd5gC = 0; //使用的终端公司5G金币专用券个数
				var venCount = 0;
				var venAmount = 0;
				var checkSel = this.couponList;
				//计算当前类型卡券使用情况
				for (var s = 0; s < checkSel.length; s++) {
					var tpVal = checkSel[s].FACE_VALUE; //券面值
					var zcVouType = checkSel[s].VOU_TYPE; //券类型
					var couponUseNum = checkSel[s].VOU_USED_QTY; // 用券数量
					if (zcVouType != "8" && zcVouType != "12") {
						//酬金券不抵扣，只是作为经分系统发券依据，排除8：酬金券，12：5g金币全
						tpN = tpN + Number(tpVal) * Number(couponUseNum);
					}
					if (zcVouType == "8") {
						cjq = cjq + Number(tpVal) * Number(couponUseNum);
					}
					if (zcVouType == "5") {
						zcV = zcV + Number(tpVal) * Number(couponUseNum);
					}
					if (zcVouType == "12") {
						zd5gC = zd5gC + Number(couponUseNum);
						zd5gV = zd5gV + Number(tpVal) * Number(couponUseNum);
					}
					/**
					 * 渠道在订购机器时，每台机器至多使用一张供货商抵用券，
					 * 且不受省公司4G补贴券/积分电子券单订单支付比例及单台最高额限制
					 * ADD BY ZHANGXING 2017-9-11 17:00:36
					 */
					if (venVouFlag == "0") {
						if (zcVouType == "6") {
							//---平台专用
							venCount = venCount + Number(couponUseNum);
							venAmount = venAmount + Number(tpVal) * Number(couponUseNum);
						}
					}
				}

				//加上其他卡券类型已使用金额和数量
				var tmpUsedtpn = this.usedtpN + tpN;
				var tmpUsedzcV = this.usedzcV + zcV;
				var tmpUsedcjq = this.usedcjq + cjq;
				var tmpUsedzd5gV = this.usedzd5gV + zd5gV;
				var tmpUsedzd5gC = this.usedzd5gC + zd5gC;
				var tmpUsedvenCount = this.usedvenCount + venCount;
				var tmpUsedvenAmount = this.usedvenAmount + venAmount;
				//验证合计后使用是否超标
				if (tmpUsedzd5gV > this.coinVouLimit) {
					this.$refs.uToast.show({
						title: "使用终端公司5G金币专用券的总金额（" +
							tmpUsedzd5gV +
							"）不能超过订单金额的30%（" +
							this.coinVouLimit +
							"）",
						type: "error",
					});
					return false;
					// item.VOU_USED_QTY = item.VOU_USED_QTY - 1 > 0 ? item.VOU_USED_QTY - 1 : 0;
				}

				var orderCount = 0;
				var poLines = this.payData["PO_LINES_ARRAY"];
				for (var v in poLines) {
					var poLine = poLines[v];
					orderCount += poLine["QUANTITY"];
				}
				//获取订单数量
				if (tmpUsedvenCount > orderCount) {
					this.$refs.uToast.show({
						title: "供货商抵用券的使用数量（" +
							venCount +
							"）不能超过订单数量（" +
							orderCount +
							"）！",
						type: "error",
					});
					return false;
					// item.VOU_USED_QTY = item.VOU_USED_QTY - 1 > 0 ? item.VOU_USED_QTY - 1 : 0;
				}

				if (
					tmpUsedtpn + tmpUsedcjq - tmpUsedzcV - tmpUsedvenAmount >
					Number(this.useVouLimit)
				) {
					var tmpV = tmpUsedtpn + tmpUsedcjq;
					this.$refs.uToast.show({
						title: "使用券的总金额（" +
							tmpV +
							"）不能超过券的最大使用金额（" +
							this.useVouLimit +
							"）",
						type: "error",
					});
					return false;
					// item.VOU_USED_QTY = item.VOU_USED_QTY - 1 > 0 ? item.VOU_USED_QTY - 1 : 0;
				} else {
					this.maxUsedShow = true;
					this.couponInfo.mostUseMoney = this.useVouLimit;
					this.couponInfo.totalUsedMoney =
						tmpUsedtpn + tmpUsedcjq - tmpUsedzcV - tmpUsedvenAmount;
				}

				//PC端重置支付金额方法，H5该页面不做重置
				rest = Number(this.pay) - tmpUsedtpn - this.fanliUseData - tmpUsedzd5gV;
				if (Number(rest) <= 0) {
					//先检查总金额和优惠{
					this.$refs.uToast.show({
						title: "选择的券、返利合计金额不能超过应付款金额",
						type: "error",
					});
					return false;
					// item.VOU_USED_QTY = item.VOU_USED_QTY - 1 > 0 ? item.VOU_USED_QTY - 1 : 0;
				}
				return true;
				// this.couponList[index] = item;
				// this.flag = Math.random();
			},
			pushItem() {
				if (this.couponType != "rebate") {
					var coupon = {};
					coupon.vouTypeName = this.couponTypeName;
					coupon.vouType = this.couponType;
					coupon.amound = this.couponInfo.currentUseMoney;
					var couponsInfo = this.getmylist(this.couponsList, this.couponType, "vouType");
					this.couponsList = this.replaceMyList(
						this.couponsList,
						this.couponType,
						"vouType",
						coupon
					);
				}
				this.checkPay(this.payData["PO_HEADERS_JSON"]);
				this.initSumCoupon();
				this.showPopup = false;
			},
			initSumCoupon() {
				this.usedtpN = 0;
				this.usedcjq = 0;
				this.usedzcV = 0;
				this.usedzd5gC = 0;
				this.usedzd5gV = 0 ;
				
				for (var di in this.couponDatas) {
					var datai = this.couponDatas[di];
					var _couponType = datai["VOU_TYPE"];
					var _usedNum = datai["VOU_USED_QTY"];
					var _facePrice = datai["FACE_VALUE"];

					//根据用券类型，赋值给对应的变量，后期用来控制券的使用
					if (_couponType != "8" && _couponType != "12") {
						//酬金券不抵扣，只是作为经分系统发券依据，排除8：酬金券，12：5g金币全
						this.usedtpN += Number(_usedNum) * Number(_facePrice);
					}
					if (_couponType == "8") {
						this.usedcjq += Number(_usedNum) * Number(_facePrice);
					}
					if (_couponType == "5") {
						this.usedzcV += Number(_usedNum) * Number(_facePrice);
					}
					if (_couponType == "12") {
						this.usedzd5gC += Number(_usedNum);
						this.usedzd5gV += Number(_usedNum) * Number(_facePrice);
					}
				}
			},
			setCouponNumPara() {
				var faceValue = "";
				var usedQty = "";
				var hid = "";
				var vouType = "";
				for (var i in this.couponDatas) {
					var couponInfo = this.couponDatas[i];
					var vouUsedQty = couponInfo["VOU_USED_QTY"];
					if (vouUsedQty > 0) {
						faceValue += couponInfo["FACE_VALUE"] + "-";
						usedQty += vouUsedQty + "-";
						hid += couponInfo["HEADER_ID"] + "-";
						vouType += couponInfo["VOU_TYPE"] + "-";
					}
				}
				this.mainForm.faceValue = faceValue.substring(0, faceValue.length - 1);
				this.mainForm.usedQty = usedQty.substring(0, usedQty.length - 1);
				this.mainForm.vouchersId = hid.substring(0, hid.length - 1);
				this.mainForm.vouType = vouType.substring(0, vouType.length - 1);
				this.mainForm.amount = this.realityPayamount;

				var orderCount = 0;
				var poLines = this.payData["PO_LINES_ARRAY"].length;
				for (var v in poLines) {
					var poLine = poLines[v];
					orderCount += poLine["QUANTITY"];
				}
				this.mainForm.buyNum = orderCount;
				this.mainForm.channelType = 2;
				this.mainForm.createType = this.payData["PO_HEADER_DTO"]["createType"];
				this.mainForm.gatherOrder = this.gatherOrder;
				this.mainForm.payAmount = this.needPayAmound;
				this.mainForm.paymentBankSelect = 12; //支付方式
				this.mainForm.poHeaderId = this.payData["PO_HEADERS_JSON"]["PO_HEADER_ID"];
				this.mainForm.segment1 = this.payData["PO_HEADERS_JSON"]["SEGMENT1"];
				this.mainForm.vendorType = this.vendorType;
				this.mainForm.rebateFace = this.fanli;
				console.log("this.mainForm " + JSON.stringify(this.mainForm));
			},
			getPayInfo() {
				var data = {
					gatherOrder: this.gatherOrder,
					isAgain: this.isAgain,
					channelType: "2",
				};
				gatherPay(data).then((res) => {
					if (res != null && "0" == res.code) {
						this.payData = res.data;
						this.createtype = this.payData["PO_HEADER_DTO"]["createType"];
						//是否对供应商抵用券的使用数量进行限制（0:限制，否则不限制）ADD BY ZHANGXING 2017-9-14 15:31:06
						this.venVouFlag = this.payData["PO_HEADERS_JSON"]["VEN_VOU_FLAG"];
						//验证是否有微信或支付宝的支付方式
						this.payType = this.payData["PAY_PLATFORM_DATA"];
						var wepayNum = this.getmylist(this.payType, "12", "CODE").length;
						if (wepayNum == 0) {
							this.payBtnDis = true;
						} else {
							this.payBtnDis = false;
						}

						if (JSON.stringify(this.payData) != "{}") {
							this.initHeaderData(this.payData["PO_HEADERS_JSON"]); //初始化页面信息
							this.initCouponData(this.payData["COUPON_TYPE"]);
							this.couponDatas = this.payData["COUPON_DATA"];
							this.checkPay(this.payData["PO_HEADERS_JSON"]);
							this.setCouponNumPara();
						}
					} else {
						this.payData = res.data;
						this.$refs.uToast.show({
							title: "操作失败：" + this.payData["message"],
							type: "error",
						});
					}
				});
			},
			async toPay() {
				var payamount = Number(this.needPayAmound);
				if (payamount == "0" && this.createType != "36") {
					this.$refs.uToast.show({
						title: "支付金额为零，不允许支付！",
						type: "error",
					});
					return;
				}
				this.setCouponNumPara();
				var data = this.mainForm;
				data.act = "H5_ONLINE_PAY";
				payHandleServlet(data).then((result) => {
					var retMsg = result.retMsg;
					if (retMsg.startsWith("http")) {
						uni.setStorageSync("PAY_IMG_URL:" + this.gatherOrder, retMsg);
						uni.navigateTo({
							url: "/pages/goods/pay-result?gatherOrder=" + this.gatherOrder,
							animationType: "pop-in",
							animationDuration: 200,
						});
					} else {
						this.$refs.uToast.show({
							title: result.retMsg,
							type: "error",
						});
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.index {
		padding: 30rpx;
		height: 100vh;

		.order-pay {
			height: 100%;

			.img {
				height: 60rpx;

				image {
					width: 100%;
					height: 60rpx;
				}
			}

			.pay-content {
				height: calc(100% - 60rpx);
				padding: 0 25rpx 120rpx;
				overflow: hidden;
			}
		}

		.btn {
			width: 690rpx;
			position: fixed;
			bottom: 50rpx;
			z-index: 66;
		}

		.popup-card {
			position: relative;

			.popup-card-header {
				background-color: #fff;
				width: 100%;
				height: 88rpx;
				padding: 0 30rpx;
				@include flex-center(space-between, center);

				.header-left,
				.header-right {
					color: #2d8cf0;
				}

				.header-title {
					font-weight: 700;
					font-size: 36rpx;
				}
			}

			.popup-card-desc {
				.desc-item {
					padding: 10rpx 40rpx;
				}
			}

			.popup-card-body {
				padding: 0 20rpx;
				height: 460rpx;

				.card-fanli {
					@include flex-center(flex-start, center);
					margin-bottom: 50rpx;
				}

				.icon {
					top: 60rpx;
					font-size: 28rpx;
				}

				.icon-fanli {
					font-size: 80rpx;
				}
			}
		}

		.stepper {
			@include flex-center(space-between, center);
			background: #fff;
			width: 170rpx;
			height: 40rpx;
			margin-top: 20rpx;

			.stepper-input {
				width: 80rpx;
				height: 40rpx;
				font-size: 28upx;
				background: #f2f3f5;
				opacity: 1;
				border-radius: 12upx;
				text-align: center;
				color: #000;
			}

			.stepper-minus,
			.stepper-plus {
				@include flex-center(center, center);
				height: 40rpx;
				width: 40rpx;
				background: #f2f3f5;
			}

			.u-icon-disabled {
				color: #c8c9cc;
				background: #f7f8fa;
			}
		}
	}
</style>
