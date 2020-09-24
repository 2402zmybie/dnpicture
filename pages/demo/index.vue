<template>
	<view 
	@touchstart="handleTouchstart"
	@touchend="handleTouchend"
	>学习触屏事件</view>
</template>

<script>
	/**
	 * 1 给容器绑定两个触事件: @touchstart @touchend
	 * 2 按下屏幕事件:
	 *   1 记录按下时间
	 * 	 2 记录按下坐标
	 * 3 离开屏幕事件
	 * 	 1 记录离开时间
	 * 	 2 记录离开坐标
	 * 	 3 根据两个时间判断 用户按下时间是否合法
	 *   4 根据两对坐标 判断距离是否合法 判断滑动方向
	 */
	export default {
		data() {
			return {
				startTime:0,
				startX:0,
				startY:0,
				endTime:0,
				endX:0,
				endY:0
			}
		},
		methods:{
			handleTouchstart(event) {
				// console.log("手指按下")
				// console.log("按下:" + event.changedTouches[0].clientX);
				// console.log("按下:" + event.changedTouches[0].clientY);
				this.startTime = new Date().getTime()
				this.startX = event.changedTouches[0].clientX
				this.startY = event.changedTouches[0].clientY
			},
			handleTouchend(event) {
				// console.log("手指离开")
				// console.log("离开:" + event.changedTouches[0].clientX);
				// console.log("离开:" + event.changedTouches[0].clientY);
				this.endTime = new Date().getTime()
				this.endX = event.changedTouches[0].clientX
				this.endY = event.changedTouches[0].clientY
				
				var clickTime = this.endTime - this.startTime
			
				if(clickTime > 2000) {
					return;
				}
				//上下滑动距离过长
				if(Math.abs(this.endY - this.startY) > 50) {
					return
				}
				//滑动方向
				let direction = ""
				if(Math.abs(this.endX - this.startX) > 10) {
					//滑动距离合法
					if(this.endX - this.startX > 0) {
						console.log("右滑")
						direction = "right"
					}else if(this.endX - this.startX < 0) {
						console.log("左滑")
						direction = "left"
					}
				}

			}
		}
	}
</script>

<style>
view {
	width: 100%;
	height: 500rpx;
	background: aqua;
}
</style>
