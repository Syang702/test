import Vue from "vue";
import App from "./App";
Vue.config.productionTip = false;
import store from "./store/index.js";
Vue.prototype.$store = store;
App.mpType = "app";
import uView from "uview-ui";
Vue.use(uView);
// 如此配置即可
uni.$u.config.unit = "rpx";
// 图标库
// uview-ui对小程序分享的mixin封装
let mpShare = require("uview-ui/libs/mixin/mpShare.js");
Vue.mixin(mpShare);

// 全局组件
import Navbar from "@/components/navbar/navbar.vue";
Vue.component("Navbar", Navbar);
import NoData from "@/components/no-data.vue";
Vue.component("NoData", NoData);

// 引入全局主题变量
// import appTheme from "@/theme.scss";
// Vue.prototype.$appTheme = appTheme;

const app = new Vue({
    ...store,
    ...App,
});
