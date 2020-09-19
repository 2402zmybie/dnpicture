1 在App.vue中引入公共样式, 不支持使用@
  要使用绝对路径,如
  @import './styles/iconfont.wxss';
2 微信小程序不支持通配符, 故base.wxss中写法特殊