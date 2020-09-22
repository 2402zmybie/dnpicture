<template>
	<scroll-view class="album-scroll-view" scroll-y @scrolltolower="handleToLower">
		<!-- swiper -->
		<view class="album-swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in banner" :key="item.id">
					<view class="swiper-item">
						<image :src="item.thumb" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表 -->
		<view class="album-list">
			<view class="album-item" v-for="item in album" :key="item.id" @tap="handleItemClick(item)">
				<view class="item-left">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="item-right">
					<view class="item-right-top">
						{{ item.name }}
					</view>
					<text class="item-right-middle">
						{{ item.desc }}
					</text>
					<view class="item-right-bottom-wrap">
						<view class="item-right-bottom">+ 关注</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					limit:30,
					order:"new",
					skip:0
				},
				hasMore:true,
				banner:[],
				album:[]
			}
		},
		mounted() {
			//修改页面的标题
			uni.setNavigationBarTitle({
				title:"专辑"
			})
			this.getList()
		},
		methods:{
			getList() {
				this.request({
					url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
					data:this.params
				})
				.then((result)=> {
					if(this.banner.length === 0) {
						this.banner = result.res.banner
					}
					
					if(result.res.album.length === 0) {
						this.hasMore = false
						uni.showToast({
							title:"没有更多数据了",
							icon:"none"
						})
						return
					}
					this.album = [...this.album,...result.res.album]
				})
			},
			//上拉加载更多
			handleToLower() {
				if(this.hasMore) {
					this.params.skip += this.params.limit
					this.getList()
				}else {
					uni.showToast({
						title:"没有更多数据了",
						icon:"none"
					})
				}
			},
			handleItemClick(item) {
				uni.navigateTo({
					//绝对路径,  只有绝对路径才能跳转
					url:`/pages/album/index?id=${item.id}`
				});
				console.log(item.id)
			}
		}
	}
</script>

<style lang="scss">
// 动态计算除了tab栏的滚动高度
.album-scroll-view {
	height: calc(100vh - 36px);
}	
	
.album-swiper {
	swiper {
		//2.3 是因为图片宽高比为 2.3, 所以动态计算swiper的高度
		height: calc(750rpx / 2.3);
		image {
			height: 100%;
		}
	}
}

.album-list {
	padding: 10rpx;
	.album-item {
		border-bottom: 1rpx solid #EEEEEE;
		display: flex;
		padding: 10rpx 0;
		.item-left {
			flex: 1;
			flex-shrink: 0;
			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
		.item-right {
			flex: 2;
			margin-left: 20rpx;
			overflow: hidden;
			.item-right-top {
				font-size: 32rpx;
				padding: 10rpx 0;
				color: #000000;
			}
			.item-right-middle {
				font-size: 24rpx;
				padding: 10rpx 0;
				//设置字体只显示一行
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.item-right-bottom-wrap {
				display: flex;
				padding: 10rpx 0;
				// 子组件靠右边显示
				justify-content: flex-end;
				.item-right-bottom {
					font-size: 32rpx;
					color: $color;
					border: 1rpx solid $color;
					padding: 10rpx;
				}
			}
		}
	}
}
</style>
