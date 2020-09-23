<template>
	<view>
		<view class="album-info">
			<image :src="album.cover" mode="widthFix"></image>
			<view class="album-bottom-wrap">
				<view class="album-bottom-left">{{ album.name }}</view>
				<view class="album-bottom-right">关注专辑</view>
			</view>
		</view>
		<!-- 专辑作者 -->
		<view class="album-author">
			<view class="album-author-info">
				<image :src="album.user.avatar" mode="aspectFill"></image>
				<view> {{ album.user.name }} </view>
			</view>
			<text class="album-author-desc">
				{{ album.desc }}
			</text>
		</view>
		<!-- 列表图片 -->
		<view class="album-list">
			<view class="album-item" v-for="(item,index) in wallpaper" :key="item.id">
				<image :src="item.thumb + item.rule.replace('$<Height>',360)" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					limit:30,
					order:"new",
					skip:0,
					first:1
				},
				id:-1,
				album:{},
				wallpaper:[],
				hasMore:true
				
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data:this.params
				})
				.then((result)=> {
					if(Object.keys(this.album).length === 0) {
						//album是个空对象
						this.album = result.res.album
						
					}
					
					if(result.res.wallpaper.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: '没有更多数据了',
							icon:"none"
						});
						return;
					}
					this.wallpaper = [...this.wallpaper, ...result.res.wallpaper]
				})
			}
		},
		//整个页面触底回调
		onReachBottom() {
			if(this.hasMore) {
				this.params.first = 0;
				this.params.skip += this.params.limit;
				this.getList()
			}else {
				uni.showToast({
					title: '没有更多数据了',
					icon:"none"
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.album-info {
	position: relative;
	.album-bottom-wrap {
		position: absolute;
		width: 100%;
		bottom: 10rpx;
		right: 0;
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		.album-bottom-left {
			font-size: 32rpx;
			font-weight: 600;	
		}
		.album-bottom-right {
			padding: 10rpx;
			font-size: 24rpx;
			font-weight: 600;
			background: $color;
			border-radius: 10rpx;
		}
	}
}


.album-author {
	padding: 20rpx;
	.album-author-info {
		display: flex;
		image {
			width: 60rpx;
			height: 60rpx;
		}
		view {
			margin-left: 10rpx;
			color: #000000;
			font-size: 26rpx;
			font-weight: 600;
		}
		margin-bottom: 16rpx;
	}
	.album-author-desc {
		
	}
}

.album-list {
	//父盒子成flex盒子并且换行
	display: flex;
	flex-wrap: wrap;
	.album-item {
		width: 33.33%;
		border: 3rpx solid #FFFFFF;
		image {
			
		}
	}
}
</style>
