(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"017a":function(e,t,n){"use strict";var r=n("9836"),o=n.n(r);o.a},"3cc1":function(e,t,n){"use strict";n.r(t);var r=n("96b1"),o=n("7bd6");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("017a");var a,u=n("f0c5"),s=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"0879a34d",null,!1,r["a"],a);t["default"]=s.exports},"7bd6":function(e,t,n){"use strict";n.r(t);var r=n("a0bf"),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},"96b1":function(e,t,n){"use strict";var r={uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"abc1"))},uCellGroup:function(){return n.e("uview-ui/components/u-cell-group/u-cell-group").then(n.bind(null,"d880"))},uCellItem:function(){return n.e("uview-ui/components/u-cell-item/u-cell-item").then(n.bind(null,"0420"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"721e"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"fa45"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"3e8a"))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-picker/u-picker")]).then(n.bind(null,"1bfe"))},uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"4e82"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"d4bb"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,(Number(e.orderPrice)+Number(e.courierFee)).toFixed(2));e._isMounted||(e.e0=function(t){e.timeShow=!0},e.e1=function(t){e.payShow=!0}),e.$mp.data=Object.assign({},{$root:{g0:n}})},i=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}))},9836:function(e,t,n){},a0bf:function(e,t,n){"use strict";(function(e){function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{list:{},timeShow:!1,deliveryTime:"",timeArray:[["今天","明天"],["09:00~09:29","09:30~09:59","10:00~10:29","10:30~10:59","11:00~11:29","11:30~11:59","12:00~12:29","12:30~12:59","13:00~13:29","13:30~13:59","14:00~14:29","14:30~14:59","15:00~15:29","15:30~15:59","16:00~16:29","16:30~16:59","17:00~17:29","17:30~17:59","18:00~18:29","18:30~18:59","19:00~19:29","19:30~19:59","20:00~20:29","20:30~20:59"]],remark:"",payShow:!1,payArray:["零钱"],payMethod:"",courierFee:"8",payMoneyShow:!1,payMoney:{}}},methods:{selectAddress:function(){e.navigateTo({url:"/pages/address/address"})},orderList:function(){e.navigateTo({url:"/pages/orderList/orderList"})},changeTime:function(e){this.deliveryTime=this.timeArray[0][e[0]]+this.timeArray[1][e[0]]},changePay:function(e){this.payMethod=this.payArray[e[0]]},toCoupon:function(){this.$refs.uToast.show({title:"当前无可用优惠券",type:"default"})},submitOrder:function(){var t=this;if(!this.list.id)return e.showModal({title:"提示",content:"请选择配送地址",showCancel:!1}),!1;if(""==this.deliveryTime)return e.showModal({title:"提示",content:"请选择配送时间",showCancel:!1}),!1;var n={order_address:this.list,order_time:this.deliveryTime,order_order:this.order,order_price:this.orderPrice,order_delivery:this.courierFee,order_payment:this.payArray[0],allPrice:(Number(this.orderPrice)+Number(this.courierFee)).toFixed(2),order_message:this.remark};this.requestByToken("index/addOrder","post",n).then((function(n){0==n.data.code?(t.payMoney=n.data.data,t.payMoneyShow=!0,t.$store.commit("removeCar")):e.showModal({title:"提示",content:"订单提交失败",showCancel:!1,success:function(t){t.confirm&&e.switchTab({url:"/pages/car/car"})}})}))},pay:function(){this.requestByToken("index/addPays","post",r({},this.payMoney)).then((function(t){0===t.data.code?e.showModal({title:"提示",content:"支付成功",success:function(t){t.confirm&&e.switchTab({url:"/pages/car/car"})}}):e.showModal({title:"提示",content:"支付失败",success:function(t){t.confirm&&e.switchTab({url:"/pages/my/my"})}})}))},closePay:function(){e.switchTab({url:"/pages/my/my"})}},onLoad:function(e){var t=this;this.requestByToken("index/searchAddress","get",{}).then((function(n){e.id?n.data.data.forEach((function(n){e.id==n.id&&(t.list={id:n.id,tel:n.address_phone,name:n.address_name,address:n.address_province+n.address_city+n.address_county+n.address_addressDetail})})):t.list={id:n.data.data[0].id,tel:n.data.data[0].address_phone,name:n.data.data[0].address_name,address:n.data.data[0].address_province+n.data.data[0].address_city+n.data.data[0].address_county+n.data.data[0].address_addressDetail}})),this.payMethod=this.payArray[0]},computed:{order:function(){return this.$store.state.checkCars},orderPrice:function(){return this.$store.state.allPrice}}};t.default=i}).call(this,n("543d")["default"])},d845:function(e,t,n){"use strict";(function(e){n("ebb8");r(n("66fd"));var t=r(n("3cc1"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["d845","common/runtime","common/vendor"]]]);