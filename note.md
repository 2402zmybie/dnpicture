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