1 在App.vue中引入公共样式, 不支持使用@
  要使用绝对路径,如
  @import './styles/iconfont.wxss';
2 微信小程序不支持通配符, 故base.wxss中写法特殊

3 
水平居中和transform: translateY(-50%) 实现元素垂直居中效果
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>垂直居中</title>
    <style>
    * {
        margin: 0;
        padding: 0;
    }
     
    .center {
        width: 960px;
        height: 500px;
        margin: 0 auto;
        background: #1879D9;
    }
     
    .center p {
        background: #fff;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100px;
    }
    </style>
</head>
<body>
    <div class="center">
        <p>垂直居中内容</p>
    </div>
</body>
</html>
 
原理 transform: translateY(-50%); 让div 沿Y轴平移自身高度的一半
　　效果如图：


4 uni-app封装请求
 为什么要封装: 
	1 原生的请求不支持promise
	2 uni-api的请求不能够方便的添加 请求中(loading)效果
	3 uni-api的请求返回值是个数组,不方便
 封装思路:
	1 基于原生的promise来封装
	2 挂载到Vue的原型上
	3 通过this.request的方式来使用
	

复习: 
	常用生命周期: 
		1 uni-app框架的生命周期结合了vue和微信小程序的生命周期
		2 全局App中使用onLaunch表示应用启动时
		3 页面中使用onLoad或者onShow分别表示 页面加载完毕时和页面显示时
		4 组件 中使用 mounted组件挂在完毕时, 其他的没有效果
		


5 分页功能分析: 
	1 使用scroll-view标签充当分页的容器
	2 绑定滚动条触底事件 scrolltolower
	3 实现分页逻辑
	
	
6 swiper
	默认的高度 150px
  image
	默认的宽度 320px =>基本样式中重置了100%
	默认的高度240px
	网页布局的时候 希望容器的高度由内容撑开, 但是swiper不行,解决方案:
	计算图片的宽度和高度的比例,把图片的比例也写到swiper标签样式中
	
	
7 封装手势滑动组件
  1 实现插槽slot功能
  2 向父组件传递滑动方向
  

8 下载图片
   //下载图片
   async handleDownload() {
   	await uni.showLoading({
   		title:"下载中"
   	})
   	//1 将远程文件下载到小程序内存中 tempFilePath
   	const result1 = await uni.downloadFile({url:this.imgDetail.img})
   	const {tempFilePath} = result1[1];
   	//2 将小程序内存中的临时文件下载到本地上
   	const result2 = uni.saveImageToPhotosAlbum({filePath:tempFilePath})
   	// console.log(result2)
   	// console.log("下载成功")
   	uni.hideLoading();
   	await uni.showToast({
   		title:"下载成功"
   	})
   }
   
 
9: 
	精美视频:
	点击标题的时候, 传递对应的接口路径和参数给内容组件
	需要在组件中使用 watch来监控接收的参数发生了变化
	内容组件接收参数,发送请求渲染页面
	
10: 
	视频播放功能分析:
		页面渲染
		播放视频
		开关声音
		转发
		下载视频
	注: 伸缩盒子的子项, 高度默认是和父盒子一样
		
  

