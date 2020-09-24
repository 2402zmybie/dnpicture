<template>
	<view class="catetory-tab">
		<view class="catetory-tab-title">
			<view class="title-inner">
				<uni-segmented-control
				:current="current" 
				:values="items.map(v=> v.title)" 
				@clickItem="onClickItem" 
				style-type="text" 
				active-color="#d4237a"
				></uni-segmented-control>
			</view>
			<view class="iconfont iconsearch"></view>
		</view>
		<scroll-view scroll-y enable-flex  class="catetory-tab-content" @scrolltolower="handleScrolltolower">
			<view class="img-content" v-for="(item,index) in vertical" :key="index">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.id = options.id;
			this.getList()
		},
		data() {
			return {
				items: [
					{title:"最新",order:"new"},
					{title:"热门",order:"hot"},
				],
				current: 0,
				params: {
					limit:30,
					skip:0,
					order:"new"
				},
				id:0,
				vertical:[],
				hasMore:true
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					this.params.order = this.items[this.current].order
					console.log("选择的order:" + this.params.order)
					this.params.skip = 0;
					this.vertical = []
					this.hasMore = true
					this.getList()
				}
			},
			getList() {
				this.request({
					url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data:this.params
				})
				.then(result=> {
					if(result.res.vertical.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: '没有更多数据了',
							icon:"none"
						});
						return
					}
					this.vertical = [...this.vertical, ...result.res.vertical]
				})
			},
			//加载更多
			handleScrolltolower() {
				if(this.hasMore) {
					this.params.skip += this.params.limit
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

<style lang="scss">
.catetory-tab-title {
	position: relative;
	// 块级元素水平居中
	.title-inner {
		width: 60%;
		margin: 0 auto;
	}
	// 块级元素定位并且垂直居中
	.iconsearch {
		position: absolute;
		top: 50%;
		right: 5%;
		transform: translateY(-50%);
	}
}
.catetory-tab-content {
	height: calc(100vh - 36px);
	display: flex;
	flex-wrap: wrap;
	.img-content {
		width: 33.33%;
		border: 5rpx solid #FFFFFF;
	}
}
</style>
