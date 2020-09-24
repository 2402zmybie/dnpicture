/**
 * 1 slot
 * 2 对外提供数据 滑动的方向
 */
<template>
	<view
		@touchstart="handleTouchstart"
		@touchend="handleTouchend">
		<slot></slot>
	</view>
</template>

<script>
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
				if(Math.abs(this.endY - this.startY) > 10) {
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
					this.$emit("swiperAction",{direction})
				}
	
			}
		}
	}
</script>

<style lang="scss">

</style>
