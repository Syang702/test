/* 登录 */
<template>
    <view class="login">
        <view class="login-logo">
            <image src="http://192.168.10.115:7001/h5/static/images/login/logo.png" />
        </view>
        <view class="form">
            <u-form :model="form">
                <u-form-item>
                    <u-input v-model="form.loginName" placeholder="账号" />
                </u-form-item>
                <u-form-item>
                    <u-input v-model="form.password" placeholder="密码" type="password" />
                </u-form-item>
                <u-form-item v-if="show">
                    <u-input v-model="form.enterRandomPwd" placeholder="短信验证码" />
                    <view slot="right" class="get-msg" @tap="getCode()"> 获取验证码 </view>
                </u-form-item>
                <view class="btn-group">
                    <u-checkbox v-model="isSave" shape="circle">记住账号</u-checkbox>
                    <view class="register" @click="toResetPassword">忘记密码</view>
                </view>
                <u-button type="primary" shape="circle" @click="login()">登录</u-button>
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
    // import { login, getUserTokenData, getCode } from "../../config/api.js";
    // import md5 from "../../static/js/md5.min.js"; //  MD5
    // import VerifySlide from "../components/verify-slide.vue"; // 滑块验证
    export default {
        data() {
            return {
                show: true,
                form: {},
                isSave: true,
            };
        },
        components: {
            // VerifySlide,
        },
        methods: {
            toResetPassword() {
                //忘记密码
                uni.navigateTo({
                    url: "/pages/login/reset-password",
                });
            },
            getCode() {
                if (this.form.loginName == "" || this.form.loginName == undefined) {
                    this.$refs.uToast.show({
                        title: "请先输入用户名",
                        type: "error",
                    });
                    return;
                }
                this.$refs.verifyElement.show();
                return;
            },
            verifyResult(res) {
                if (res) {
                    var ran = Math.random() * 100000000000000000;
                    var param = {};
                    param.loginName = this.form.loginName;
                    param.ran = ran;
                    param.cspanStr = md5("RSA_0123" + ran);
                    param.loginType = "h5";
                    param.forward = "GET_RANDOM_PASSWORD_H5";
                    // this.$refs.uToast.show({
                    //     title: '请求失败,请稍后再试',
                    //     type: 'error'
                    // })
                    // return
                    getCode(param).then((res) => {
                        console.log("获取验证码返回值" + res);
                        var resTxt = res.split("====");
                        if (!resTxt[0]) {
                            this.$refs.uToast.show({
                                title: "生成动态密码时系统出错!",
                                type: "error",
                            });
                            return;
                        } else {
                            if (resTxt[0] == "Y") {
                                if (resTxt[1] == "WARN_MSG") {
                                    this.show = false;
                                    this.$refs.uToast.show({
                                        title: "请登录!",
                                        type: "success",
                                    });
                                    return;
                                } else {
                                    this.$refs.uToast.show({
                                        title: "验证码已发送!",
                                        type: "success",
                                    });
                                    return;
                                }
                            } else {
                                this.$refs.uToast.show({
                                    title: "请求失败,请稍后再试",
                                    type: "error",
                                });
                                return;
                            }
                        }
                    });
                }
            },
            login() {
                if (this.form.loginName == "" || this.form.loginName == undefined) {
                    this.$refs.uToast.show({
                        title: "请输入用户名",
                        type: "error",
                    });
                    return;
                } else if (this.form.password == "" || this.form.password == undefined) {
                    this.$refs.uToast.show({
                        title: "请输入密码",
                        type: "error",
                    });
                    return;
                }
                if (this.show == true) {
                    if (this.form.enterRandomPwd == "" || this.form.enterRandomPwd == undefined) {
                        this.$refs.uToast.show({
                            title: "请输入短信验证码",
                            type: "error",
                        });
                        return;
                    }
                }
                var data = {};
                var ran = Math.random() * 100000000000000000;
                var cspanStr = md5("RSA_0123" + ran);
                data.act = "login";
                data.parm =
                    "{'loginName':'" +
                    this.form.loginName +
                    "','password':'" +
                    md5(this.form.password) +
                    "','source':'app','dzLoginSystme':'wx','cspanStr':'" +
                    cspanStr +
                    "','random':'" +
                    ran +
                    "'}";
                console.log(data);
                login(data).then((res) => {
                    uni.removeStorageSync("sessionId");
                    console.log(res);
                    if (res.msg == "1") {
                        uni.setStorageSync("sessionId", res.data.sessionId);
                        getUserTokenData();
                        this.$refs.uToast.show({
                            title: "登录成功,前往首页",
                            type: "success",
                            callback: function () {
                                uni.switchTab({
                                    url: "/pages/home/home",
                                    // url: '/pages/goods/goods-detail?vendorId=116555&vendorType=1&createType=1&headerId=12098&lineId=7820&itemId=1000174761&orderType=1&price=2500&oldPrice=2500'
                                });
                            },
                        });
                    } else {
                        this.$refs.uToast.show({
                            title: res.msg,
                            type: "error",
                        });
                        return;
                    }
                });
            },
            toRegister() {
                uni.navigateTo({
                    url: "/pages/account/register",
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
            padding: 120rpx 0 80rpx;
            @include flex-center;

            image {
                width: 310rpx;
                height: 146rpx;
            }
        }

        .form {
            width: 100%;
            padding: 50rpx;

            .get-msg {
                color: #33acfb;
            }

            .btn-group {
                height: 110rpx;
                @include flex-center(space-between, center);
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
