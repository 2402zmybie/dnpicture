<template>
	<view class="home-category">
		<view class="category-item" v-for="(item,index) in category" :key="item.id" @tap="itemClick(item.id)">
			<image :src="item.cover" mode="aspectFill"></image>
			<text>{{ item.name }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			//修改页面的标题
			uni.setNavigationBarTitle({
				title:"分类"
			})
			this.getList()
		},
		data() {
			return {
				category: []
			}
		},
		methods: {
			getList() {
				this.request({
					url:"http://157.122.54.189:9088/image/v1/vertical/category"
				})
				.then(result=> {
					this.category = result.res.category
				})
			},
			itemClick(id) {
				uni.navigateTo({
					url: `/pages/imgCategory/index?id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
.home-category {
	display: flex;
	flex-wrap: wrap;
	.category-item {
		width: 33.33%;
		border: 5rpx solid #FFFFFF;
		position: relative;
		image{
			height: 240rpx;
		}
		text{
			position: absolute;
			width: 100%;
			height: 50rpx;
			bottom: 0;
			left: 0;
			color: #FFFFFF;
			font-size: 40rpx;
			//文字渐变 css3渐变
			background-image: linear-gradient(to right top, rgba(0,0,0,.2),rgba(0,0,0,0));
			display: flex;
			align-items: center;
			padding-left: 20rpx;
		}
	}
}	
</style>
