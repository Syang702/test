/*
 * 自定义封装http请求
 */

const baseUrl = process.env.NODE_ENV === "development" ? "http://39.98.38.108:8080/" : "http://39.98.38.108:8080/";

const request = ({ url, method, data, isToken = true }) => {
    const requestOptions = {
        url: baseUrl + url,
        data: data || null,
        method: method,
        header: {
            // "Content-Type": "application/x-www-form-urlencoded",
            "Content-Type": "application/json; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            // Token: "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjhhZjhjZmIwLTY5N2MtNDQ2ZS1iODBkLWQ0MjU2NTAzMTI3OCJ9.CK9nQtuxha3GHlFvjC49sJ7higVNcMSzbkuT0C2mOAOPPge2Rnm3WmsYWCL08jh4lRjFJbpY5GtmAY59yHDMCg",
            // Authorization: uni.getStorageSync("Authorization"),
            Authorization: "abcdefghijklmnopqrstuvwxyz",
        },
        dataType: "json",
    };
    // if (isToken) {
    //     if (!uni.getStorageSync("token")) {
    //         return uni.redirectTo({
    //             url: "/pages/login/login",
    //         });
    //     } else {
    //         // requestOptions.header["Token"] = uni.getStorageSync("token");
    //         // requestOptions.header["Authorization"] = uni.getStorageSync("token");
    //     }
    // }
    uni.showLoading({
        title: "努力加载中...",
    });
    return new Promise((resolve, reject) => {
        uni.request({
            ...requestOptions,
            success: (res) => {
                // uni.hideLoading();
                switch (res.data.code) {
                    case 401:
                        uni.showToast({
                            title: res.data.msg || "认证失败，无法访问系统资源!",
                            icon: "none",
                            duration: 5000,
                        });
                        // uni.redirectTo({
                        //     url: "/pages/login/login",
                        // });
                        break;
                    case 403:
                        uni.showToast({
                            title: res.data.msg || "当前操作没有权限!",
                            icon: "none",
                            duration: 5000,
                        });
                        break;
                    case 404:
                        uni.showToast({
                            title: res.data.msg || "访问资源不存在!",
                            icon: "none",
                            duration: 5000,
                        });
                        break;
                    case 500:
                        uni.showToast({
                            title: res.data.msg || "系统未知错误，请反馈给管理员!",
                            icon: "none",
                            duration: 5000,
                        });
                        break;
                    default:
                        break;
                }
                resolve(res);
            },
            fail: (error) => {
                // uni.hideLoading();
                uni.showToast({
                    title: "接口请求失败",
                    icon: "none",
                });
                reject(error);
            },
            complete() {
                // 接口调用结束的回调函数（调用成功、失败都会执行）
                uni.hideLoading();
            },
        });
    });
    /*     return new Promise((resolve, reject) => {
        uni.request(requestOptions)
            .then((res) => {
                uni.hideLoading();
                console.log("then", res);
                switch (res[1].data.code) {
                    case 401:
                        uni.showToast({
                            title: res[1].data.msg || "认证失败，无法访问系统资源!",
                            icon: "none",
                            duration: 2000,
                        });
                        // uni.redirectTo({
                        //     url: "/pages/login/login",
                        // });
                        break;
                    case 403:
                        uni.showToast({
                            title: res[1].data.msg || "当前操作没有权限!",
                            icon: "none",
                            duration: 2000,
                        });
                        break;
                    case 404:
                        uni.showToast({
                            title: res[1].data.msg || "访问资源不存在!",
                            icon: "none",
                            duration: 2000,
                        });
                        break;
                    case 500:
                        uni.showToast({
                            title: res[1].data.msg || "系统未知错误，请反馈给管理员!",
                            icon: "none",
                            duration: 2000,
                        });
                        break;
                    default:
                        break;
                }
                resolve(res[1]);
            })
            .catch((error) => {
                uni.hideLoading();
                uni.showToast({
                    title: "接口请求失败",
                    icon: "none",
                });
                reject(error);
            });
    }); */
};

export default request;
