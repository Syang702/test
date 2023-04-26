// const mixinSmsCode = {
// 	data() {
// 		return {
// 			smsCode: {
// 				countDownTime: 60,
// 				isGetting: false,
// 				getted: false,
// 				timer: null
// 			}
// 		}
// 	},
// 	methods: {
// 		// 获取验证码方法
// 		getCode(PHONE_KEY, callBack) {
// 			if (!this[PHONE_KEY]) {
// 				uni.showToast({
// 					icon: 'none',
// 					title: '请输入手机号'
// 				});
// 				return;
// 			}
// 			uni.showLoading({
// 				title: '正在获取验证码'
// 			});
// 			callBack()
// 		},

// 		// 验证码请求后续
// 		getSmsCodeOver() {
// 			uni.hideLoading();
// 			this.smsCode.isGetting = true;
// 			this.smsCode.getted = true;
// 			this.smsCode.timer = setInterval(() => {
// 				if (this.smsCode.countDownTime > 0 && this.smsCode.countDownTime <= 60) {
// 					this.smsCode.countDownTime--;
// 				} else {
// 					this.resetCountDown(false);
// 				}
// 			}, 1000);
// 		},

// 		// 倒计时初始化
// 		resetCountDown(isInit) {
// 			clearInterval(this.smsCode.timer);
// 			this.smsCode = {
// 				countDownTime: 60,
// 				isGetting: false,
// 				getted: isInit ? false : true,
// 				timer: null
// 			};
// 			this.$forceUpdate();
// 		},
// 	}
// }
// export default mixinSmsCode
const daysRemaining = {
    /**
     * 计算指定日期到今天的天数差
     */
    diff_day(time) {
        let now = new Date();
        return parseInt((now.getTime() - new Date(time).getTime()) / (1000 * 60 * 60 * 24));
    },
    isLeapyear(year) {
        if (year / 4 == 0 && year / 100 != 0) {
            return true;
        } else if (year / 400 == 0) {
            return true;
        } else {
            return false;
        }
    },
    dayOfMonth(year, month) {
        let days = 31;
        switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
                days = 30;
                break;
            case 2:
                days = this.isLeapyear(year) ? 29 : 28;
                break;
        }
        return days;
    },
};

const dropSign = (str) => {
    // 丢弃多余的符号
    let arr = str.split("");
    // 数组:符号对应下标
    let idxArr = [];
    // 数组:丢弃符号下标
    let lostArr = [];
    for (let idx in arr) {
        if (this.signArr.indexOf(arr[idx]) >= 0) {
            idxArr.push(Number(idx));
        }
    }
    if (idxArr.length > 1) {
        idxArr.reduce(function (x, y) {
            if (Number(y) - Number(x) === 1) {
                lostArr.push(Number(x));
            }
            return y;
        });
    }
    lostArr.reverse().forEach((item) => {
        arr.splice(item, 1);
    });
    return arr.reduce(function (x, y) {
        return String(x) + y;
    });
};

const cutStr = (str) => {
    // 将字符串分割成数字和符号的数组
    let newArr = [];
    let tempStr = "";
    for (let i = 0; i < str.length; i++) {
        if (i === str.length - 1) {
            tempStr += str.charAt(i);
            newArr.push(tempStr);
        } else {
            if (this.signArr.indexOf(str.charAt(i)) >= 0) {
                // 是符号且为减号
                if (str.charAt(i) === "-") {
                    if (tempStr.indexOf("-") < 0) {
                        if (tempStr !== "") {
                            newArr.push(tempStr);
                        }
                        tempStr = "-";
                    } else {
                        if (tempStr === "-") {
                            tempStr = "";
                        } else {
                            newArr.push(tempStr);
                            newArr.push(str.charAt(i));
                            tempStr = "";
                        }
                    }
                } else {
                    if (tempStr !== "") {
                        newArr.push(tempStr);
                    }
                    newArr.push(str.charAt(i));
                    tempStr = "";
                }
            } else {
                tempStr += str.charAt(i);
            }
        }
    }
    // 最后将减号变负数留下的空隙补'+'
    let idxArr = [];
    for (let i = 0; i < newArr.length; i++) {
        if (!isNaN(Number(newArr[i - 1])) && !isNaN(Number(newArr[i]))) {
            idxArr.push(i);
        }
    }
    idxArr.reverse().forEach((item) => {
        newArr.splice(item, 0, "+");
    });
    return newArr;
};

const copyByUniapp = (data, msg = "已复制到剪贴板") => {
    //复制到剪贴板方法
    uni.setClipboardData({
        data: data.toString(),
        success: function () {
            uni.showToast({
                title: msg,
                icon: "none",
            });
        },
    });
};
const noMultipleClicks = (methods, info) => {
    // 防止处理多次点击
    // methods是需要点击后需要执行的函数， info是点击需要传的参数
    let that = this;
    if (that.noClick) {
        // 第一次点击
        that.noClick = false;
        if (info && info !== "") {
            // info是执行函数需要传的参数
            methods(info);
        } else {
            methods();
        }
        setTimeout(() => {
            that.noClick = true;
        }, 3000);
    } else {
        // 这里是重复点击的判断
    }
};
export { daysRemaining, dropSign, cutStr, copyByUniapp, noMultipleClicks };
