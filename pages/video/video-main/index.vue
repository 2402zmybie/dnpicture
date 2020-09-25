<template>
	<scroll-view 
	scroll-y
	enable-flex
	class="video-main"
	@scrolltolower="handleScrolltolower"
	>
		<view class="video-item" v-for="(item,index) in videowp" :key="index">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props:{
			urlobj:Object
		},
		watch:{
			//由于mounted 是组件挂载的时候执行的, 所以无法区分四个组件
			//使用 urlobj监听请求参数的变化
			urlobj() {
				// console.log("参数发生了变化")
				// console.log(this.urlobj)
				//请求参数发生变化 ,就是点击了不同的tab标题, 清空数组, 重新请求数据
				this.videowp = [];
				this.getList()
			}
		},
		mounted() {
			// console.log(this.urlobj)
			//第一次挂载的时候 请求数据
			this.getList()
		},
		data() {
			return {
				videowp: [],
				hasMore:true
			}
		},
		methods:{
			getList() {
				this.request({
					url:this.urlobj.url,
					data:this.urlobj.params
				})
				.then(result=> {
					if(result.res.videowp.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: '没有更多数据了',
							icon:"none"
						});
						return;
					}
					this.videowp = [...this.videowp,...result.res.videowp]
				})
			},
			//分页事件
			handleScrolltolower() {
				if(this.hasMore) {
					this.urlobj.params.skip += this.urlobj.params.limit;
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
.video-main {
	display: flex;
	flex-wrap: wrap;
	height: calc(100vh - 36px);
	width: 100%;
	.video-item {
		width: 33.33%;
		border: 5rpx solid #FFFFFF;
	}
}
</style>
