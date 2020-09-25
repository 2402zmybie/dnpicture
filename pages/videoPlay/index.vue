<template>
	<view class="video-play">
		<image :src="videoObj.img" mode=""></image>
		<!-- 工具栏 -->
		<view class="video-tool">
			<view :class="['iconfont', muted? 'iconjingyin':'iconshengyin']" @tap="handleMuted"></view>
			<view class="iconfont iconzhuanfa" >
				<button open-type="share">转发</button>
			</view>
		</view>
		<!-- 视频 -->
		<view class="video-wrap">
			<video :src="videoObj.video" 
			controls
			objectFit="fill"
			:muted="muted"
			></video>
		</view>
		<!-- 下载 -->
		<view class="download">
			<view class="download-btn" @tap="handleDownload">下载高清</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoObj:{},
				//是否静音
				muted:false
			};
		},
		onLoad() {
			this.videoObj = getApp().globalData.video
		},
		methods:{
			//控制是否静音
			handleMuted() {
				this.muted = !this.muted
			},
			//下载视频
			async handleDownload() {
				await uni.showLoading({
					title:"下载中"
				})
				// 1将远程文件下载到小程序内存中
				const result =  await uni.downloadFile({url:this.videoObj.video})
				const {tempFilePath} = result[1]
				// 2将内存中的文件下载到本地上
				await uni.saveVideoToPhotosAlbum({
					filePath:tempFilePath
				});
				uni.hideLoading()
				await uni.showToast({
					title:"下载成功"
				})
			}
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
		.iconzhuanfa {
			position: relative;
			//button的宽高和父元素一样,并且透明度一样
			button {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
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
