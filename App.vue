<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入全局样式 */
	@import './styles/base.wxss';
	/* 引入字体图标库 */
	@import './styles/iconfont.wxss';
</style>
