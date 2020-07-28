import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		classIndexs: -1,
		carList: [],
		allPrice: 0.00,
		checkCars: [] //要结算的商品
	},
	mutations: {
		toClassify(state, id) {
			//首页跳转分类页面,通过传id定位到哪个分类
			state.classIndexs = id
		},
		addCars(state, goods) { //加购物车
			let sameGoods = state.carList.some(item => {
				return item.id == goods.id //返回true false
			})
			if (sameGoods) {
				state.carList.forEach(item => {
					if (item.id == goods.id) {
						item.number = item.number + 1
					}
				})
			} else {
				state.carList.push(goods)
			}
		},
		changeCarsNum(state, data) { //商品数量
			let moneyPrice = 0
			state.carList.forEach(item => {
				if (item.id == data.id) {
					item.number = data.number
				}
				if (item.checked == true) {
					moneyPrice += item.price * item.number
				}
			})
			state.allPrice = moneyPrice
		},
		changeCheck(state, data) { //单个选中
			let moneyPrice = 0
			state.carList.forEach(item => {
				if (item.id == data.id) {
					item.checked = data.check
				}
				if (item.checked == true) {
					moneyPrice += item.price * item.number
				}
			})
			state.allPrice = moneyPrice
		},
		allCheck(state, checkStatus) { //全选
			let moneyPrice = 0
			state.carList.forEach(item => {
				item.checked = checkStatus
				if (item.checked == true) {
					moneyPrice += item.price * item.number
				} else {
					moneyPrice = 0.00
				}
			})
			state.allPrice = moneyPrice
		},
		addOrder(state, data) { //提交订单
			state.checkCars = data
		},
		removeCar(state) { //清空购物车
			state.carList = [],
				state.allPrice = 0.00,
				state.checkCars = []
		}
	},
	actions: {

	},
	getters: {

	}
})

export default store
