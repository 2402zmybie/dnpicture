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
			<view v-if="current === 0">
				<home-recommend></home-recommend>
			</view>
			<view v-if="current === 1">
				<home-category></home-category>
			</view>
			<view v-if="current === 2">
				<home-new></home-new>
			</view>
			<view v-if="current === 3">
				<home-album></home-album>
			</view>
		</view>
	</view>
</template>

<script>
	import homeAlbum from './home-album/index.vue'
	import homeCategory from './home-category/index.vue'
	import homeNew from './home-new/index.vue'
	import homeRecommend from './home-recommend/index.vue'
	export default {
		components: {
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommend
		},
		data() {
			return {
				items: [
					{title:"推荐"},
					{title:"分类"},
					{title:"最新"},
					{title:"专辑"}
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
