<template>
	<view @tap="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			list:Array,
			index:Number
		},
		//组件挂载完毕的时候,对父组件传递的数据做打印
		mounted() {
			
		},
		methods: {
			handleClick() {
				//1 将数据缓存下来
				getApp().globalData.imgList = this.list;
				getApp().globalData.imgIndex = this.index
				//2 再实现点击跳转页面
				uni.navigateTo({
					url: '/pages/imgDetail/index'
				});
			}
		}
	}
</script>

<style>
</style>
