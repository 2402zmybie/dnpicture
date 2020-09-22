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
				wallpaper:[]
				
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
					this.album = result.res.album
					this.wallpaper = result.res.wallpaper
				})
			}
		},
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
</style>
