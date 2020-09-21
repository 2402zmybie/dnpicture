<template>
	<view>
		<!-- 推荐列表 -->
		<view class="recommend-list">
			<view class="recommend-wrap" v-for="(item,index) in recommends" :key="item.id">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
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
				<view class="months-item" v-for="(item,index) in months.items" :index="item.id">
					<image :src="item.img + item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from '../../../utils/moment.js'
	export default {
		data() {
			return {
				recommends: [],
				months:{}
			}
		},
		mounted() {
			this.request({
				url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
				data: {
					limit:30,
					order:"hot",
					skip:0
				}
			})
			.then((result)=> {
				//推荐模块
				this.recommends = result.res.homepage[1].items
				//月份模块
				this.months = result.res.homepage[2];
				//将时间磋改成 18号/月 moment.js
				this.months.MM = moment(this.months.stime).format("MM");
				this.months.DD = moment(this.months.stime).format("DD");
			})
		}
	}
</script>

<style lang="scss" scoped>
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
			width: 33%;
			border: 5rpx solid #FFFFFF; 
		}
	}
}
</style>
