---
title: 如何搭建一个简易Node.js服务器
date: 2019-06-21 14:29:26
tags: [Node.js]
categories: [Node.js]
toc: true
---
<script type="text/javascript" src="/js/ctrlands_tool.js"></script>
在这个前后端分离的时代, 前台页面数据的渲染往往依托于后台, 我们不能等后台代码编写完成才来编写前台页面, 因此我们可以自己搭建一个简易的后台服务, 或者使用postman来模拟获取后台数据. 今天我们选择使用Node.js + express 来搭建一个简易的后台服务.
<!-- more -->

既然选择使用Node, 那么Node环境肯定是需要安装的, 至于如何安装Node, 这里就不做多的介绍了.

### 安装express

命令行界面, 全局安装express:

``` bash
npm install express-generator -g
```

### 初始化项目

选择项目生成文件位置, eg: D:/Express, 在此目录下进入命令行

``` bash
express projectname
```

等待相应文件生成后,

``` bash
cd projectname
npm install
```

### 运行项目

相关npm依赖安装完成后, 命令行输入:

``` bash
npm start
```

浏览器输入: localhost:3000 查看, 默认端口号可在 projectname/bin/www 文件中查看.

### 修改默认模板引擎

express默认页面模板引擎为jade, 我不习惯这种style, 所以我选择ejs, ejs模板引擎对html的结构改动较小.
或者在创建express项目的时候就指定ejs为默认模板引擎.`express -v ejs projectname`
首先安装ejs:

``` bash
npm install ejs -save
```

修改projectname/app.js

``` javascript
// view engine setup
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');
```

### 跨域配置

修改projectname/app.js

``` javascript
// 允许跨域设置
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);
```

### 路由管理

目前系统中的所有路由都写在了app.js里面, 随着路由的增多, app.js 也变得臃肿起来, 所以我们需要对路由进行集中管理.
当我们使用Node.js + express搭建项目的时候, 前台有多个路由, 后台管理也有多个多个路由, 我们可以将其分开统一管理.
首先, 我们修改 app.js

``` javascript
// 路由管理
// 前台页面访问的路由 /xxx
app.use('/', require('./route/web/index.js'));
// 后台管理访问的路由 /cms/xxx
app.use('/cms/', require('./route/cms/index.js'));
```

在route文件目录下新建"web"和"cms"两个文件夹, 分别在两个文件下新建文件"index.js"

``` javascript
// /web/index.js
const express = require('express');
module.exports = function () {
  let router = express.Router();
  router.get('/', (req, res) => {
    res.render('web/index.ejs', {});
  });

  router.use('/xxx', require('./xxx')());
  // router.use('/route1', require('./route1')());
  // router.use('/route2', require('./route2')());
  // ......  more ......
  return router;
}
```

``` javascript
// /cms/index.js
const express = require('express');
module.exports = function () {
  let router = express.Router();
  router.get('/', (req, res) => {
    res.render('cms/index.ejs', {});
  });

  router.use('/xxx', require('./xxx')());
  // router.use('/route1', require('./route1')());
  // router.use('/route2', require('./route2')());
  // ......  more ......
  return router;
}
```

### 连接Mysql

首先安装mysql

``` bash
npm install mysql -save
```
