/*
 * 自定义封装http请求
 * 建议基于uniapp的request进行封装，请勿使用其他三方非uniapp请求
 */

const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8800/b2bcloud/" : "http://10086b2b.com/b2bcloud/";

function request({ url, method, data, isToken = true }) {
    const requestOptions = {
        url: baseUrl + url,
        data: data || null,
        method: method,
        // header: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     "X-Requested-With": "XMLHttpRequest",
        //     Accept: "application/json",
        //     Authorization: uni.getStorageSync("Authorization"),
        // },
        dataType: "json",
    };
    if (isToken) {
        if (!!uni.getStorageSync("token")) {
            uni.redirectTo({
                url: "/pages/login/login",
            });
            return;
        } else {
            // token
            requestOptions.header["Authorization"] = uni.getStorageSync("token");
        }
    }
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: "努力加载中...",
        });
        uni.request(requestOptions)
            .then((data) => {
                uni.hideLoading();
                switch (res.data.code) {
                    case 401:
                        uni.showToast({
                            title: res.data.msg || "认证失败，无法访问系统资源!",
                            icon: "none",
                            duration: 1500,
                        });
                        uni.redirectTo({
                            url: "/pages/login/login",
                        });
                        break;
                    case 403:
                        uni.showToast({
                            title: res.data.msg || "当前操作没有权限!",
                            icon: "none",
                            duration: 1500,
                        });
                        break;
                    case 404:
                        uni.showToast({
                            title: res.data.msg || "访问资源不存在!",
                            icon: "none",
                            duration: 1500,
                        });
                        break;
                    case 500:
                        uni.showToast({
                            title: res.data.msg || "系统未知错误，请反馈给管理员!",
                            icon: "none",
                            duration: 1500,
                        });
                        break;
                    default:
                        break;
                }
                resolve(res.data);
            })
            .catch((error) => {
                uni.showToast({
                    title: "接口请求失败",
                    icon: "none",
                });
                uni.hideLoading();
                reject(error);
            });
    });
}

export default request;
/* export function xxx(data) {
	return request({
		url: "XXX",
		method: "XX",
		data,
	});
} */
