<template>
	<view class="video-play">
		<image :src="videoObj.img" mode=""></image>
		<!-- 工具栏 -->
		<view class="video-tool">
			<view class="iconfont iconshengyin"></view>
			<view class="iconfont iconzhuanfa"></view>
		</view>
		<!-- 视频 -->
		<view class="video-wrap">
			<video :src="videoObj.video" 
			controls
			objectFit="fill"></video>
		</view>
		<view>
		                <video id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
		                   controls></video>
		            </view>
		<!-- 下载 -->
		<view class="download">
			<view class="download-btn">下载高清</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoObj:{}
			};
		},
		onLoad() {
			this.videoObj = getApp().globalData.video
		}
	}
</script>

<style lang="scss">
.video-play {
	position: relative;
	image {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		//css3 滤镜
		filter: blur(20px);
	}
	.video-tool {
		height: 80rpx;
		display: flex;
		justify-content: flex-end;
		.iconfont {
			width: 80rpx;
			color: #FFFFFF;
			font-size: 50rpx;
			border-radius: 40rpx;
			background-color: rgba($color: #000000, $alpha: 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
		}
	}
	.video-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		video{
			width: 360rpx;
			height: 600rpx;
			
		}
	}
	.download {
		display: flex;
		justify-content: center;
		.download-btn {
			width: 360rpx;
			height: 80rpx;
			border-radius: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			background-color: rgba($color: #000000, $alpha: 0.2);
			border: 4upx solid #FFFFFF;
			margin-top: 18rpx;
		}
	}
}
</style>
