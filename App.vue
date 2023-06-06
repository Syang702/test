<script>
    export default {
        globalData: {
            // 胶囊距上距离
            menuTop: 0,
            // 导航栏高度
            navBarHeight: 0,
            // 胶囊距右方间距（方保持左、右间距一致）
            menuRight: 0,
            // 胶囊距底部间距（保持底部间距一致）
            menuBotton: 0,
            // 胶囊高度（自定义内容可与胶囊高度保证一致）
            menuHeight: 0,
            // 状态栏高度
            statusBarHeight: 0,
            // 安全距离
            safeAreaHeight: 0,
            // 胶囊宽度
            menuWidth: 0,
        },
        onLaunch(options) {
            // 获取系统信息
            const systemInfo = uni.getSystemInfoSync();
            let menuButtonInfo = {};
            // 胶囊按钮位置信息
            // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
            menuButtonInfo = uni.getMenuButtonBoundingClientRect();
            // {   获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
            //     bottom: 95;
            //     height: 32;
            //     left: 334;
            //     right: 421;
            //     top: 63;
            //     width: 87;
            // }
            // #endif
            // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
            this.globalData.menuTop = menuButtonInfo.top - systemInfo.statusBarHeight;
            this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
            this.globalData.menuWidth = menuButtonInfo.width;
            this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + 4 + menuButtonInfo.height + systemInfo.statusBarHeight;
            this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
            this.globalData.menuHeight = menuButtonInfo.height;
            this.globalData.statusBarHeight = systemInfo.statusBarHeight;
            this.globalData.safeAreaHeight = systemInfo.safeAreaInsets.bottom;
            // #ifdef APP-PLUS || H5
            // this.globalData.navBarHeight = 44;
            // #endif
        },
    };
</script>

<style lang="scss">
    @import "uview-ui/index.scss";
    /* 解决小程序和app滚动条的问题 */
    /* #ifdef MP-WEIXIN || APP-PLUS */
    ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
        color: transparent;
    }

    /* #endif */

    /* 解决H5 的问题 */
    /* #ifdef H5 */
    uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
        /* 隐藏滚动条，但依旧具备可以滚动的功能 */
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
        color: transparent;
    }

    /* #endif */
</style>
