/* 重置密码 */
<template>
    <view class="login">
        <view class="login-logo"> 重置密码 </view>
        <view class="form">
            <u-form :model="form">
                <view v-if="formStep == 1">
                    <u-form-item prop="loginName">
                        <u-input v-model="form.loginName" placeholder="输入登录名" @blur="getPhoneNum()" />
                    </u-form-item>
                    <u-form-item prop="enterRandomPwd" v-if="mobilFlag">
                        <u-input v-model="form.mobilenum" placeholder="绑定手机号" />
                    </u-form-item>
                    <u-form-item prop="enterRandomPwd" v-if="show">
                        <u-input v-model="form.enterRandomPwd" placeholder="短信验证码" />
                        <view slot="right" class="get-msg" @click="getCode()"> 获取验证码 </view>
                    </u-form-item>
                    <u-button type="primary" shape="circle" @click="nextStep()">下一步</u-button>
                </view>
                <view v-if="formStep == 2">
                    <view class="setpass">请重新设置您账号的密码</view>
                    <u-form-item prop="password">
                        <u-input v-model="form.password" placeholder="输入密码" type="password" />
                    </u-form-item>
                    <u-form-item prop="re_password">
                        <u-input v-model="form.re_password" placeholder="输再次输入密码" type="password" />
                    </u-form-item>
                    密码必须8到16个字符，含数字和字母，且有一个字母大写。 例如：1B2C3D4G
                    <u-button type="primary" shape="circle" @click="updatePassword()">提交</u-button>
                </view>
            </u-form>
        </view>
        <u-toast ref="uToast" />
        <view class="login-footer">
            <view>中国移动通信集团河南有限公司</view>
            <view>京ICP备14019613号-2</view>
            <view>热线:0371-60880301 转920或964</view>
            <view>Email:liyi01@sinoprof.com</view>
        </view>
        <VerifySlide @result="verifyResult" ref="verifyElement" />
    </view>
</template>

<script>
    import { changePasswordServlet } from "../../config/api.js";
    // import md5 from '../../static/js/md5.min.js'
    import VerifySlide from "../components/verify-slide.vue"; // 滑块验证
    export default {
        data() {
            return {
                show: true,
                form: {},
                isSave: true,
                formStep: 1,
                mobilFlag: false,
            };
        },
        components: {
            VerifySlide,
        },
        onReady() {},
        methods: {
            nextStep() {
                //下一步
                if (this.form.loginName == "" || this.form.loginName == undefined) {
                    this.$refs.uToast.show({
                        title: "请输入用户名",
                        type: "error",
                    });
                    return;
                }
                if (this.form.mobilenum == "" || this.form.mobilenum == undefined) {
                    this.$refs.uToast.show({
                        title: "登录名错误或未关联手机",
                        type: "error",
                    });
                    return;
                }
                if (this.form.enterRandomPwd == "" || this.form.enterRandomPwd == undefined) {
                    this.$refs.uToast.show({
                        title: "请输入短信验证码",
                        type: "error",
                    });
                    return;
                }
                var parm = {
                    loginName: this.form.loginName,
                    validate: this.form.enterRandomPwd,
                };
                var data = {};
                data.act = "CHECK_RANDOM";
                data.parm = JSON.stringify(parm);
                changePasswordServlet(data).then((res) => {
                    console.log("下一步返回" + JSON.stringify(res));
                    if (res.code == 1) {
                        this.formStep = 2;
                    } else {
                        this.$refs.uToast.show({
                            title: "出现错误！\n\r" + res.msg,
                            type: "error",
                        });
                    }
                });
            },
            getPhoneNum() {
                if (this.form.loginName != "" && this.form.loginName != undefined) {
                    var parm = {
                        loginName: this.form.loginName,
                    };
                    var data = {};
                    data.act = "VERIFY_USER";
                    data.parm = JSON.stringify(parm);
                    changePasswordServlet(data).then((res) => {
                        if (res.code == 1) {
                            this.form.mobilenum = res.msg;
                        } else {
                            this.$refs.uToast.show({
                                title: "出现错误！\n\r" + res.msg,
                                type: "error",
                            });
                        }
                    });
                }
            },
            verifyResult(res) {
                console.log(res);
                if (res) {
                    var ran = Math.random() * 100000000000000000;
                    var cspanStr = md5("RSA_0123" + ran);
                    var parm = {
                        loginName: this.form.loginName,
                        cspanStr: cspanStr,
                        ran: ran,
                    };
                    var data = {};
                    data.act = "GET_VALIDATE_H5";
                    data.parm = JSON.stringify(parm);
                    changePasswordServlet(data).then((res) => {
                        uni.removeStorageSync("sessionId");
                        console.log("获取验证码返回值" + JSON.stringify(res));
                        if (res.code == 1) {
                            uni.setStorageSync("sessionId", res.data.sessionId);
                            this.$refs.uToast.show({
                                title: res.msg,
                                type: "success",
                            });
                        } else {
                            this.$refs.uToast.show({
                                title: "出现错误！\n\r" + res.msg,
                                type: "error",
                            });
                        }
                    });
                }
            },
            getCode() {
                if (this.form.loginName == "" || this.form.loginName == undefined) {
                    this.$refs.uToast.show({
                        title: "请输入用户名",
                        type: "error",
                    });
                    return;
                }
                this.$refs.verifyElement.show();
                return;
            },
            updatePassword() {
                if (this.form.password == "" || this.form.password == undefined) {
                    this.$refs.uToast.show({
                        title: "请输入密码",
                        type: "error",
                    });
                    return;
                }
                if (this.form.re_password == "" || this.form.re_password == undefined) {
                    this.$refs.uToast.show({
                        title: "请再次输入密码",
                        type: "error",
                    });
                    return;
                }

                if (this.form.password != this.form.re_password) {
                    this.$refs.uToast.show({
                        title: "两次密码不一致",
                        type: "error",
                    });
                    return;
                }
                var reg1 = /^[A-Z].*[0-9]|[0-9].*[A-Z]$/g;
                var reg2 = /^([\w\W]){8,16}$/g;
                if (!reg1.test(this.form.password) && !reg2.test(this.form.password)) {
                    this.$refs.uToast.show({
                        title: "密码不符合规则",
                        type: "error",
                    });
                    return;
                }

                var parm = {
                    loginName: this.form.loginName,
                    password: this.form.password,
                };
                var data = {};
                data.act = "UPDATE_ACTION";
                data.parm = JSON.stringify(parm);
                changePasswordServlet(data).then((res) => {
                    console.log("更新密码返回值" + JSON.stringify(res));
                    if (res.code == 1) {
                        this.$refs.uToast.show({
                            title: "密码修改成功",
                            type: "success",
                            callback: function () {
                                uni.navigateBack({
                                    url: "/pages/login/login",
                                });
                            },
                        });
                    } else {
                        this.$refs.uToast.show({
                            title: "出现错误！\n\r" + res.msg,
                            type: "error",
                        });
                    }
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .login {
        height: 100vh;
        background-color: #fff;

        .login-logo {
            padding: 140rpx 0;
            @include flex-center;
            font-size: 56rpx;
        }

        .form {
            width: 100%;
            padding: 50rpx;

            .get-msg {
                color: #33acfb;
            }

            .setpass {
                font-size: 36rpx;
            }

            .u-btn {
                margin-top: 50rpx;
            }
        }

        .login-footer {
            width: 100%;
            position: absolute;
            bottom: 100rpx;
            font-size: 24rpx;
            text-align: center;
            color: #808080;
        }
    }
</style>
