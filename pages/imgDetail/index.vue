<template>
	<view class="container">
		<view class="user-info">
			<view class="user-icon">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user-desc">
				<view class="user-name">{{ imgDetail.user.name }}</view>
				<view class="user-time">{{ imgDetail.cnTime }}</view>
			</view>
		</view>
		<!-- 高清大图 -->
		<view class="image-wrap">
			<swiper-action @swiperAction="handleSwiperAction">
				<image :src="imgDetail.thumb" mode="widthFix"></image>
			</swiper-action>
		</view>
		<view class="rank-collection">
			<view class="rank">
				<view class="iconfont icondianzan">{{ imgDetail.rank }}</view>
			</view>
			<view class="collection">
				<view class="iconfont iconshoucang"> 收藏</view>
			</view>
		</view>
		<!-- 专辑 -->
		<view class="album-wrap" v-if="album.length">
			<view class="album-title">相关</view>
			<view class="album-list">
				<view class="album-item" v-for="(item,index) in album" :key="index">
					<view class="album-avater">
						<image :src="item.cover" mode="aspectFill"></image>
					</view>
					<view class="album-desc">
						<view class="album-desc-icon">专辑</view>
						<view class="album-desc-name">{{ item.name }}</view>
					</view>
					<view class="iconfont iconiconfontjiantou4"></view>
				</view>
			</view>
		</view>
		<!-- 最热评论 -->
		<view class="comment hot" v-if="hot.length">
			<view class="comment-title">
				<text class="iconfont iconhot1"></text> 
				<text class="comment-test">最热评论</text>
			</view>
			<view class="comment-list">
				<view class="comment-item" v-for="(item,index) in hot" :key="item.id">
					<view class="comment-user">
						<view class="user-avater-wrap">
							<image :src="item.user.avatar" mode="widthFix"></image>
						</view>
						<view class="user-wrap">
							<text class="user-name">{{ item.user.name }}</text>
							<text class="user-time">{{ item.cnTime }}</text>
						</view>
						<view class="user-badge">
							<image 
								mode="widthFix"
								v-for="item2 in item.user.title"
								:key="item2.icon"
								:src="item2.icon" 
								></image>
						</view>
					</view>
					<view class="comment-desc">
						<view class="comment-content">{{ item.content }}</view>
						<view class="comment-like">
							<text class="iconfont icondianzan">{{ item.size }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 最新评论 -->
		<view class="comment new" v-if="comment.length">
			<view class="comment-title">
				<text class="iconfont iconpinglun"></text> 
				<text class="comment-test">最新评论</text>
			</view>
			<view class="comment-list">
				<view class="comment-item" v-for="(item,index) in comment" :key="item.id">
					<view class="comment-user">
						<view class="user-avater-wrap">
							<image :src="item.user.avatar" mode="widthFix"></image>
						</view>
						<view class="user-wrap">
							<text class="user-name">{{ item.user.name }}</text>
							<text class="user-time">{{ item.cnTime }}</text>
						</view>
						<view class="user-badge">
							<image 
								mode="widthFix"
								v-for="item2 in item.user.title"
								:key="item2.icon"
								:src="item2.icon" 
								></image>
						</view>
					</view>
					<view class="comment-desc">
						<view class="comment-content">{{ item.content }}</view>
						<view class="comment-like">
							<text class="iconfont icondianzan">{{ item.size }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下载 -->
		<view class="download">
			<view class="download-btn" @tap="handleDownload">下载图片</view>
		</view>
	</view>
</template>

<script>
	import moment from '../../utils/moment.js'
	//设置语言为中文
	moment.locale("zh-cn")
	import swiperAction from '../../components/swiperAction.vue'
	export default {
		components:{
			swiperAction
		},
		onLoad() {
			//页面挂载完毕的时候 打印一下全局存储的数据
			console.log(getApp().globalData.imgList)
			//解构全局存储的数据
			const { imgIndex} = getApp().globalData
			this.imgIndex = imgIndex
			this.getData()
		},
		data() {
			return {
				imgList:[],
				//图片信息对象 包含着用户头像等
				imgDetail: {},
				album:[],
				hot:[],
				comment:[],
				//图片的索引
				imgIndex:0
			}
		},
		methods:{
			//给当前页面赋值
			getData() {
				const { imgList } = getApp().globalData
				this.imgList = imgList
				this.imgDetail= imgList[this.imgIndex]
				
				//xxx年前的数据(时间格式化)
				this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow();
				
				//获取评论数据
				this.getComments(this.imgDetail.id)
			},
			getComments(id) {
				const url = `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`;
				console.log(url)
				
				this.request({
					"url":url
				})
				.then((result)=> {
					this.album = result.res.album
					//给hot数组中的对象添加一个时间属性 xxx月前
					result.res.hot.forEach(v=>v.cnTime=moment(v.atime*1000).fromNow())
					this.hot = result.res.hot
					//给comment数组中的对象添加一个时间属性 xxx月前
					result.res.comment.forEach(v=>v.cnTime=moment(v.atime*1000).fromNow())
					this.comment = result.res.comment
					console.log(`最热评论条数:${this.hot.length}`)
					console.log(`最新评论条数:${this.comment.length}`)
				})
			},
			//滑动事件
			handleSwiperAction(e) {
				/**
				 * 用户左滑 imgIndex++
				 * 用户右滑 imgIndex--
				 */
				if(e.direction === "left" && this.imgIndex < this.imgList.length -1) {
					this.imgIndex++;
					this.getData()
				}else if(e.direction === "right" && this.imgIndex > 0) {
					this.imgIndex--;
					this.getData()
				}else {
					uni.showToast({
						title: '没有数据了',
						icon:"none"
					});
				}
			},
			//下载图片
			async handleDownload() {
				await uni.showLoading({
					title:"下载中"
				})
				//1 将远程文件下载到小程序内存中 tempFilePath
				const result1 = await uni.downloadFile({url:this.imgDetail.img})
				const {tempFilePath} = result1[1];
				//2 将小程序内存中的临时文件下载到本地上
				const result2 = uni.saveImageToPhotosAlbum({filePath:tempFilePath})
				// console.log(result2)
				// console.log("下载成功")
				uni.hideLoading();
				await uni.showToast({
					title:"下载成功"
				})
			}
		}
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

.album-wrap {
	.album-title {
		padding-top: 20rpx;
		font-size: 30rpx;
		color: #000000;
	}
	.album-list {
		.album-item {
			padding: 20rpx;
			border-bottom: 1rpx solid #EEEEEE;
			display: flex;
			position: relative;
			.album-avater {
				image {
					width: 180rpx;
					height: 180rpx;
				}
			}
			.album-desc {
				margin-left: 20rpx;
				.album-desc-icon {
					width: 100rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: $color;
					color: #FFFFFF;
					font-weight: 600;
					font-size: 24rpx;
					
				}
				.album-desc-name {
					padding-top: 10rpx;
					font-size: 30rpx;
				}
			}
			.iconfont {
				position: absolute;
				top: 50%;
				right: 40rpx;
				transform: translateY(-50%);
			}
		}
	}
}

//最热评论
.comment {
	.comment-title {
		padding: 20rpx;
		.iconfont {
			font-size: 32rpx;
			color: $color;
		}
		.comment-test {
			margin-left: 10rpx;
			font-size: 28rpx;
			color: #AAAAAA;
		}
	}
	.comment-list {
		.comment-item {
			padding: 10rpx 6rpx;
			border-bottom: 6rpx solid #CCCCCC;
			.comment-user {
				display: flex;
				.user-avater-wrap {
					border: 1upx solid yellow;
					width: 10%;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 90%;
					}
				}
				.user-wrap {
					margin-left: 20rpx;
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					.user-name {
						font-size: 24rpx;
						color: #000000;
					}
					.user-time {
						font-size: 20rpx;
						color: #AAAAAA;
					}
				}
				.user-badge {
					image {
						width: 30rpx;
						display: inline-block;
					}
				}
			}
			
			.comment-desc {
				margin-left: 10%;
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				.comment-desc {
					color: #000000;
					font-size: 30rpx;
					font-weight: 600;
				}
				.comment-like {
					font-size: 24rpx;
					color: #CCCCCC;
				}	
			}
		}
	}
}

//最新评论
.new {
	.comment-title {
		.iconpinglun {
			color: green !important;
		}
	}
	
}

// 下载图片
.container {
	padding-bottom: 105rpx;
	.download {
		position: fixed;
		background: #FFFFFF;
		bottom: 0;
		right: 0;
		height: 100rpx;
		width: 750rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.download-btn{
			width: 90%;
			height: 80%;
			background: $color;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
		}
	}
}

</style>
