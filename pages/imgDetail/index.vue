<template>
	<view>
		<view class="user-info">
			<view class="user-icon">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user-desc">
				<view class="user-name">{{ imgDetail.user.name }}</view>
				<view class="user-time">{{ imgDetail.cnTime }}</view>
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
		<!-- 专辑 -->
		<view class="album-wrap">
			<view class="album-title">相关</view>
			<view class="album-list">
				<view class="album-item" v-for="(item,index) in album">
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
		<view class="comment hot">
			<view class="comment-title">
				<text class="iconfont iconhot1"></text>
				<text class="comment-test">最热评论</text>
			</view>
			<view class="comment-list">
				<view class="comment-item" v-for="(item,index) in comment" :key="item.id">
					<view class="comment-user">
						<view class="user-avater-wrap">
							<image :src="item.user.avatar" mode="widthFix"></image>
						</view>
						<view class="user-wrap">
							<text class="user-name">{{ item.user.name }}</text>
							<text class="user-time">{{ item.atime }}</text>
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
	</view>
</template>

<script>
	import moment from '../../utils/moment.js'
	//设置语言为中文
	moment.locale("zh-cn")
	export default {
		onLoad() {
			//页面挂载完毕的时候 打印一下全局存储的数据
			console.log(getApp().globalData.imgList)
			//解构全局存储的数据
			const { imgList,imgIndex} = getApp().globalData
			this.imgDetail= imgList[imgIndex]
			//imgDetail有数据了才处理图片
			this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>',360);
			//xxx年前的数据(时间格式化)
			this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow();
			
			const url = `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${imgList[imgIndex].id}/comment`;
			console.log(url)
			
			this.request({
				"url":url
			})
			.then((result)=> {
				this.album = result.res.album
				this.hot = result.res.hot
				this.comment = result.res.comment
				console.log(`最热评论条数:${this.hot.length}`)
				console.log(`最新评论条数:${this.comment.length}`)
			})
		},
		data() {
			return {
				//图片信息对象 包含着用户头像等
				imgDetail: {},
				album:[],
				hot:[],
				comment:[]
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
</style>
