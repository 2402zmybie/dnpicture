<template>
	<view>
		<view class="album-swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in banner" :key="item.id">
					<view class="swiper-item">
						<image :src="item.thumb" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					limit:30,
					order:"new",
					skip:0
				},
				banner:[],
				album:[]
			}
		},
		mounted() {
			//修改页面的标题
			uni.setNavigationBarTitle({
				title:"专辑"
			})
			this.getList()
		},
		methods:{
			getList() {
				this.request({
					url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
					data:this.params
				})
				.then((result)=> {
				
					this.banner = result.res.banner
					this.album = result.res.album
					console.log(this.banner.length)
				})
			}
		}
	}
</script>

<style lang="scss">
.album-swiper {
	swiper {
		//2.3 是因为图片宽高比为 2.3, 所以动态计算swiper的高度
		height: calc(750rpx / 2.3);
		image {
			height: 100%;
		}
	}
}
</style>
