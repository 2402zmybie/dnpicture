<template>
	<scroll-view @scrolltolower="handleToLower" class="recommend-view" scroll-y v-if="recommends.length > 0">
		<!-- 推荐列表 -->
		<view class="recommend-list">
			<navigator class="recommend-wrap" v-for="(item,index) in recommends" :key="item.id" :url="`/pages/album/index?id=${item.target}`">
				<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>
		<!-- 月份 -->
		<view class="months-wrap">
			<view class="months-title">
				<view class="months-title-info">
					<view class="months-info">
						<text> {{ months.DD }} </text>
						/ {{ months.MM }} 月
					</view>
					<view class="months-text"> {{ months.title }}</view>
				</view>
				<view class="months-title-more">更多 ></view>
			</view>
			<view class="months-content">
				<view class="months-item" v-for="(item,index) in months.items" :key="item.id">
					<go-detail :list="months.items" :index="index">
						<image :src="item.img + item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
					</go-detail>
					
				</view>
			</view>
		</view>
		
		<!-- 热门 -->
		<view class="hots-wrap">
			<view class="hots-title">
				<text>热门</text>
			</view>
			<view class="hots-content" >
				<view class="hots-content-item" v-for="(item,index) in hots" :key="item.id">
					<go-detail :list="hots" :index="index">
						<image :src="item.thumb" mode="widthFix" ></image>
					</go-detail>
					
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from '../../../utils/moment.js'
	import goDetail from '../../../components/goDetail.vue'
	export default {
		components:{
			goDetail
		},
		data() {
			return {
				recommends: [],
				months:{},
				hots:[],
				// 后期要修改的参数 提取出来 放在data中
				params:{
					limit:30,
					order:"hot",
					skip:0
				},
				hasMore:true
			}
		},
		mounted() {
			//修改页面的标题
			uni.setNavigationBarTitle({
				title:"推荐"
			})
			this.getList()
		},
		methods:{
			getList() {
				this.request({
					url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
					data: this.params
				})
				.then((result)=> {
					//判断还有没有下一页的数据了
					if(result.res.vertical.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: '没有更多数据了',
							icon:"none"
						});
						return;
					}
					
					if(this.recommends.length === 0) {
						//推荐模块
						this.recommends = result.res.homepage[1].items
						//月份模块
						this.months = result.res.homepage[2];
						//将时间磋改成 18号/月 moment.js
						this.months.MM = moment(this.months.stime).format("MM");
						this.months.DD = moment(this.months.stime).format("DD");
					}
				
					//热门模块(累加数组)
					this.hots = [...this.hots, ...result.res.vertical]
					
				})
			},
			//上拉加载事件
			handleToLower() {
				/**
				 * 1 修改参数 skip+=limit;
				 * 2 重新发送请求
				 * 3 请求回来成功 hots数据叠加
				 */
				if(this.hasMore) {
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
	}
</script>

<style lang="scss" scoped>
	
.recommend-view {
	// 计算除了tab栏之外滚动区域的高度
	height: calc( 100vh - 36px);
}
	
.recommend-list {
	display: flex;
	flex-wrap: wrap;
	.recommend-wrap {
		width: 50%;
		border: 5rpx solid #FFFFFF;
	}
}

.months-wrap {
	.months-title {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		.months-title-info {
			display: flex;
			font-weight: 600;
			.months-info {
				color: $color;
				font-size: 24rpx;
				text{
					font-size: 30rpx;
				}
			}
			.months-text {
				font-size: 34rpx;
				color: #666;
				margin-left: 30rpx;	
			}
		}
		.months-title-more{
			color: $color;
		}
	}
	.months-content {
		display: flex;
		flex-wrap: wrap;
		.months-item {
			width: 33.33%;
			border: 5rpx solid #FFFFFF; 
		}
	}
}


.hots-wrap {
	padding: 20rpx;
	.hots-title {
		padding-bottom: 10rpx;
		text{
			font-size: 34rpx;
			border-left: 8rpx solid $color;
			font-weight: 600;
			padding-left: 20rpx;
		}
	}
	.hots-content {
		display: flex;
		flex-wrap: wrap;
		.hots-content-item {
			width: 33.33%;
			border: 5rpx solid #FFFFFF;
			image{
				
			}
		}
	}
}
</style>
