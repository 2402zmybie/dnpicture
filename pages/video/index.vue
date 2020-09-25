<template>
	<view class="home-tab">
		<view class="home-tab-title">
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
		<view class="home-tab-content">
			视频
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{title:"推荐"},
					{title:"娱乐"},
					{title:"最新"},
					{title:"热门"},
					{title:"分类"}
				],
				current: 1
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss">
.home-tab-title {
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
.home-tab-content {
	
}
</style>
