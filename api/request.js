let baseUrl = "http://dingdong-api.nodebook.top/h5/";
// if (process.env.NODE_ENV === 'development') {
// 	baseUrl = ''
// } else {
// 	baseUrl = ''
// };
//从本地缓存中同步获取指定 key 对应的内容
let token = uni.getStorageSync('token') || null;
//封装request方法 无token
const request = (url, method, data) => {
	var promise = new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...'
		})
		//网络请求
		uni.request({
			url: baseUrl + url,
			data: data,
			method: method,
			header: {
				// 'custom-header': 'hello' //自定义请求头信息
				//'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				uni.hideLoading()
				//服务器返回数据
				if (res.statusCode == 200) {

					if (res.data.code === 0 && res.data.msg) {
						uni.showToast({
							title: res.data.msg,
							icon: 'success',
							duration: 2000
						})
					} else if (res.data.code != 0 && res.data.msg) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}

					resolve(res);
				} else {
					//返回错误提示信息
					reject(res.data);
				}
			},
			fail: function(e) {
				uni.hideLoading()
				uni.showToast({
					title: '网络连接错误',
					icon: 'loading',
					duration: 2000
				});
				reject('网络出错');
			}
		})
	});
	return promise;
}
//封装request 含token
const requests = (url, method, data = {}) => {
	var promise = new Promise((resolve, reject) => {
		if (!token || token === null) {
			uni.showModal({
				title: '温馨提示',
				content: '请先登陆',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					} else if (res.cancel) {
						uni.switchTab({
							url: '/pages/home/home'
						});
					}
				}
			});
			return false;
		}
		uni.showLoading({
			title: '加载中...'
		})
		//网络请求
		uni.request({
			url: baseUrl + url,
			data: data,
			header: {
				"Authorization": token //'Bearer '+
			},
			method: method,
			success: function(res) {
				uni.hideLoading()
				//服务器返回数据
				if (res.statusCode == 200) {
					if (res.data.code === 400) {
						uni.showModal({
							title: '提示',
							content: '登陆超时,请重新登陆',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/login/login'
									});
								}
							}
						});
						return false;
					}
					if (res.data.code === 0 && res.data.msg) {
						uni.showToast({
							title: res.data.msg,
							icon: 'success',
							duration: 2000
						})
					} else if (res.data.code != 0 && res.data.msg) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}

					resolve(res);
				} else {
					console.log("请求错误")
					//返回错误提示信息
					reject(res.data);
				}
			},
			fail: function(e) {
				uni.hideLoading()
				uni.showToast({
					title: '网络连接错误',
					icon: 'loading',
					duration: 2000
				});
				reject('网络出错');
			}
		})
	});
	return promise;
}
module.exports = {
	request: request,
	requests: requests
}

// import httpRequest from './request.js'
// function getBannerList (data){
// 	return httpRequest({
// 		url:'/api/leju/front/home/banners',
// 		method:'GET',
// 		data
// 	})
// }
// export default{
// 	getBannerList,
// }
