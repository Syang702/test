const systemInfo = uni.getSystemInfoSync();
// 胶囊按钮位置信息
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
// 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
that.globalData.menuTop = menuButtonInfo.top - systemInfo.statusBarHeight;
that.globalData.menuWidth = menuButtonInfo.width;
that.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
that.globalData.menuHeight = menuButtonInfo.height;
that.globalData.statusBarHeight = systemInfo.statusBarHeight;
that.globalData.safeAreaHeight = systemInfo.safeAreaInsets.bottom;
