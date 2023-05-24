import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import pageChat from "../views/chat/pageChat.vue";

// 获取原型对象push函数
const originalPush = Router.prototype.push;

// 获取原型对象replace函数
const originalReplace = Router.prototype.replace;

// 修改原型对象中的push函数
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

// 修改原型对象中的replace函数
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch((err) => err);
};

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "登录页",
            component: Login,
            hidden: true,
        },
        {
            path: "/home",
            name: "首页",
            component: Home,
            hidden: true,
            children: [
                {
                    path: "/chat",
                    name: "聊天页",
                    component: pageChat,
                    hidden: true,
                },
            ],
        },
    ],
});
