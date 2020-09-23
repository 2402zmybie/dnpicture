<template>
	<view>
		<view class="user-info">
			<view class="user-icon">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user-desc">
				<view class="user-name">{{ imgDetail.user.name }}</view>
				<view class="user-time">{{ imgDetail.atime }}</view>
			</view>
		</view>
		<view class="image-wrap">
			<image :src="imgDetail.newThumb" mode="widthFix"></image>
		</view>
		<view class="rank-collection">
			<view class="rank">
				<view class="iconfont icondianzan">{{ imgDetail.rank }}</view>
			</view>
			<view class="collection">
				<view class="iconfont iconshoucang"> 收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			//页面挂载完毕的时候 打印一下全局存储的数据
			console.log(getApp().globalData.imgList)
			//解构全局存储的数据
			const { imgList,imgIndex} = getApp().globalData
			this.imgDetail= imgList[imgIndex]
			this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>',360);
		},
		data() {
			return {
				//图片信息对象 包含着用户头像等
				imgDetail: {}
			}
		},
	}
</script>

<style lang="scss" scoped>
.user-info {
	display: flex;
	padding: 20rpx;
	.user-icon {
		padding: 0 20rpx;
		image {
			width: 88rpx;
			border-radius: 50%;
		}
	}
	.user-desc {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.user-name {
			font-weight: 600;
			font-size: 30rpx;
			color: #000000;
		}
		.user-time {
			font-size: 24rpx;
			color: #CCCCCC;
		}
	}
}

.rank-collection {
	display: flex;
	border-bottom: 1rpx solid #AAAAAA;
	color: #AAAAAA;
	padding: 20rpx 0;
	.rank,.collection {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
