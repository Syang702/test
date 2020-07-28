<template>
	<!-- 分类 -->
	<view class="classify">
		<view class="status_bar"><!-- 状态栏 --></view>
		<view class="contentBox">
			<view class="search"><u-search placeholder="请输入搜索内容" v-model="keyword" :show-action="false"></u-search></view>
			<view class="classify-scroll">
				<scroll-view scroll-y="true" class="classify-scroll-left">
					<view
						class="classify-scroll-left-list"
						v-for="item in classAll"
						:key="item.id"
						:style="item.id == indexs && 'background: #FFFFFF;'"
						@click="infoClassify(item.id)"
					>
						{{ item.name }}
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" class="classify-scroll-right">
					<view class="classify-scroll-right-list" v-for="(item, index) in goodsAll" :key="index">
						<view class="classify-scroll-right-list-left" @click="toDetail(item.id)"><image :src="item.propaganda[0].url"></image></view>
						<view class="classify-scroll-right-list-right">
							<view class="classify-scroll-right-list-right-name" @click="toDetail(item.id)">{{ item.name }}</view>
							<view class="classify-scroll-right-list-right-nameTwo" @click="toDetail(item.id)">{{ item.bewrite }}</view>
							<view class="classify-scroll-right-list-right-news">
								<view class="classify-scroll-right-list-right-news-left" @click="toDetail(item.id)">
									<view class="classify-scroll-right-list-right-news-pick">￥ {{ item.price }}</view>
									<view class="classify-scroll-right-list-right-news-vip" v-show="parseFloat(item.vip_price) > 0">
										￥ {{ item.vip_price }}
										<text>绿卡价</text>
									</view>
								</view>
								<view class="classify-scroll-right-list-right-news-right" @click="addCars(item)">
									<u-icon size="60" name="shopping-cart" color="#3bb86a"></u-icon>
								</view>
							</view>
						</view>
					</view>

					<!-- 暂无数据 -->
					<view class="classify-scroll-right-404">拉到底部了~</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			keyword: '',
			classAll: [],
			indexs: -1, //定义变量动态改变左侧style
			goodsAll: []
		};
	},
	onLoad() {
		this.indexs = this.$store.state.classIndexs;
		this.allClass();
	},
	onShow() {
		//监听页面显示
		// onLoad 页面只触发一次,tab切换后再从首页分类进入,进行分类id监听
		if (this.$store.state.classIndexs != -1) {
			this.indexs = this.$store.state.classIndexs
			this.infoGoods(this.$store.state.classIndexs);
		}
	},
	methods: {
		allClass() {
			//所有分类
			this.request('nottoken/getAllClass', 'get', {}).then(res => {
				this.classAll = res.data.data.class;
				//页面初始化 默认选中第一个分类  后台只返回第一个分类下商品
				if (this.indexs == -1) {
					this.indexs = res.data.data.class[0].id;
					this.goodsAll = res.data.data.goods.map(item => {
						item.propaganda = JSON.parse(item.propaganda);
						return item;
					});
				} else {
					this.infoGoods(this.indexs);
				}
			});
		},
		infoGoods(id) {
			//分类下所有商品
			this.request('nottoken/getOneAllGoods', 'get', {
				id: id
			}).then(res => {
				this.goodsAll = res.data.data.map(item => {
					item.propaganda = JSON.parse(item.propaganda);
					return item;
				});
			});
		},
		infoClassify(id) {
			this.infoGoods(id);
			this.indexs = id;
		},
		//详情页
		toDetail(id) {
			uni.navigateTo({
				url: '/pages/detail/detail?id=' + id,
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		addCars(data) {
			let carGoods = {
				id: data.id,
				name: data.name,
				number: 1,
				url: data.propaganda[0].url,
				price: parseFloat(data.price), //解析一个字符串，并返回一个浮点数。
				checked: false,
				val: '0'
			};
			this.$store.commit('addCars', carGoods);
			uni.showToast({
				title: '成功添加购物车',
				icon: 'success',
				duration: 2000
			});
			this.carNumber = this.$store.state.carList.length;
		}
	}
};
</script>

<style lang="scss" scoped>
.classify {
	width: 100%;
	height: 100%;
	background: #ffffff;
	.status_bar {
		//自动计算导航栏高度
		height: var(--status-bar-height);
		width: 100%;
		color: #ffffff;
	}
	.contentBox {
		width: 100%;
		height: calc(100% - var(--status-bar-height));
		.search {
			width: 100%;
			height: 92rpx;
			padding: 10rpx;
			display: flex;
			justify-content: center;
			align-items: flex-start;
		}
		.classify-scroll {
			width: 100%;
			height: calc(100% - 92rpx);
			display: flex;
			justify-content: space-between;
			.classify-scroll-left {
				width: 30%;
				height: 100%;
				background: #f7f7f7;
				.classify-scroll-left-list {
					width: 100%;
					border-top: 1px solid #efefef;
					box-sizing: border-box;
					font-size: 24rpx;
					text-align: center;
					line-height: 110rpx;
					height: 110rpx;
					color: #3e3d3d;
				}
			}
			.classify-scroll-right {
				width: 70%;
				height: 100%;
				padding-left: 20rpx;
				box-sizing: border-box;
				.classify-scroll-right-list {
					width: 100%;
					height: 270rpx;
					border-bottom: 1px solid #efefef;
					display: flex;
					justify-content: space-between;
					.classify-scroll-right-list-left {
						width: 156rpx;
						height: 270rpx;
						padding: 50rpx 0;
						box-sizing: border-box;
						image {
							width: 156rpx;
							height: 100%;
						}
					}
					.classify-scroll-right-list-right {
						width: 410rpx;
						height: 270rpx;
						padding: 25rpx 20rpx 0 22rpx;
						box-sizing: border-box;
						.classify-scroll-right-list-right-name {
							width: 100%;
							height: 38rpx;
							color: #373737;
							font-size: 26rpx;
							line-height: 38rpx;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.classify-scroll-right-list-right-nameTwo {
							width: 100%;
							height: 34rpx;
							color: #8c8c8c;
							font-size: 22rpx;
							line-height: 34rpx;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.classify-scroll-right-list-right-news {
							width: 100%;
							height: 140rpx;
							display: flex;
							justify-content: space-between;
							.classify-scroll-right-list-right-news-left {
								flex: 1;
								height: 140rpx;
								padding-top: 40rpx;
								.classify-scroll-right-list-right-news-pick {
									width: 100%;
									height: 60rpx;
									font-size: 28rpx;
									line-height: 60rpx;
									color: #ff4f67;
									font-weight: 600;
								}
								.classify-scroll-right-list-right-news-vip {
									width: 100%;
									height: 30rpx;
									font-size: 22rpx;
									line-height: 30rpx;
									color: #4abc69;
									font-weight: 600;
									padding-left: 10rpx;
									box-sizing: border-box;
									text {
										background: #4abc69;
										color: #ffffff;
										font-size: 16rpx;
										padding: 5rpx 10rpx;
										margin-left: 10rpx;
									}
								}
							}
							.classify-scroll-right-list-right-news-right {
								width: 60rpx;
								padding-top: 36rpx;
								box-sizing: border-box;
							}
						}
					}
				}
				.classify-scroll-right-404 {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 26rpx;
					color: #999999;
				}
			}
		}
	}
}
</style>
