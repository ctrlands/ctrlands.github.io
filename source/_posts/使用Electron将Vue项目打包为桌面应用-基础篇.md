---
title: 使用Electron将Vue项目打包为桌面应用-基础篇
date: 2019-08-30 16:02:44
categories: [Vue]
tags: [Electron]
---

一天下午, 我正吹着空调, 带着耳机, 愉快的扮演着代码搬运工, 突然我的组长告诉我, 让我把一个vue项目打包成桌面应用. (ps: 啥, vue项目还能打包成桌面应用, 请自行脑补我的黑人脸问号), 后来组长发给我一条消息: Electron+Vue. 抱着try yi try的态度, 打开了搜索引擎, 跟着相关文档step by step, 哎哟, 不错哦, 还真阔以, 牛beer. 运行一看, 居然还阔以f12, 再一看, 不就是那二锅头兑的那白开水嘛, 不好意思, 拿错剧本了, 不就是一个桌面应用的壳子套个浏览器嘛. 不过还是牛beer. 本着技多不压身(实之吾恐忘之), 特此以文档记之.
<!-- more -->

使用Electron将Vue项目打包成桌面应用有两种方式(就目前而言, 我就只知道这两种2333), 一种是将vue项目打包扔进Electron项目中, 另外一种就是在Vue项目引入Electron, 然后在Vue中打包为桌面应用. 话不多说, 开整.

本文以第二种方式为例:

### 先创建一个Electron-Vue项目

``` bash
vue init simulatedgreg/electron-vue yourprojectname
```
Electron-Vue模板为我们封装好了相关Electron配置, 拿来即用. 然后根据自己需求选择配置, 打包方式我选的'builder'. 模板下载完成后, 进入文件, 下载相关依赖包. 
``` bash
cnpm install
```
<font color=#f03326>(重要: 不要使用npm, 使用cnpm, 原因: npm: 下载速度=树懒的速度, cnpm: 比npm的速度稍微快一点)</font>.因为一些Electron的相关依赖包在墙外, 使用npm有很大几率会下载失败, 当时我不知道, 使用的npm, 结果把我卡在这儿了, 这也下载失败, 那也下载失败, 忍不住想大吼一句ZnVjaw==相关依赖下载完成后, 运行
``` bash
npm run dev
```
就可以看到界面了. 大概就是下图的样子
![首页](/images/Electron/index.png)</br>
下方就是浏览器中的控制台.

### 打包Vue项目为桌面应用

打包命令为:
``` bash
npm run build
```
执行命令后, 然后就会下载相关Electron的相关依赖包进行打包, 然而就在下载相关依赖包的时候问题就接踵而至了, 由于不可抗力因素原因, 我们无法通过cnpm方式下载相关依赖包, 所以我们需要手动去下载相关依赖包, 然后放在相关文件夹中. 需要的无法下载的相关依赖包我们可以在执行npm run build的时候看到.
需要的相关依赖包可能涉及到(以windows为例, 以你所需的Electron为准):

`electron-v2.0.18-win32-x64.zip`

可在这里下载[淘宝镜像站](https://npm.taobao.org/mirrors/electron/ ""), 或在这里下载[官方git仓库](https://github.com/electron/electron/releases "")
放在C:\Users\username\ .electron\electron-v2.0.18-win32-x64.zip(不需解压)
同时放在
C:\Users\username\AppData\Local\electron\Cache\electron-v2.0.18-win32-x64.zip(不需解压)

所需文件

`nsis-3.0.3.2.7z nsis-resources-3.3.0.7z winCodeSign-2.4.0.7z app-builder-v0.6.1-x64.7z(可能需要)`

主路径: 

`C:\Users\username\AppData\Local\electron-builder\Cache\`

C:\Users\username\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.3.2.7z(需解压)
C:\Users\username\AppData\Local\electron-builder\Cache\nsis\nsis-resources-3.3.0.7z(需解压)
C:\Users\username\AppData\Local\electron-builder\Cache\winCodeSign\winCodeSign-2.4.0.7z(需解压)
C:\Users\username\AppData\Local\electron-builder\Cache\app-builder\app-builder-v0.6.1-x64.7z(可能需要, 需解压)

文件结构如下:

``` file
electron
    Cache
        electron-v2.0.18-win32-x64.zip
        SHASUMS256.txt-2.0.18
electron-builder
    cache
        app-builder
            app-builder-v0.6.1-x64
                解压app-builder-v0.6.1-x64.7z所得文件
        nsis
            nsis-3.0.3.2
                解压nsis-3.0.3.2.7z所得文件
            nsis-resources-3.3.0
                解压nsis-resources-3.3.0.7z所得文件
        winCodeSign
            winCodeSign-2.4.0
                解压winCodeSign-2.4.0.7z所得文件
```

相关依赖包下载安装完成后, 就等打包, 打包完成后的文件放在项目根目录/dist文件下.
![打包完成的桌面应用文件](/images/Electron/build.png)</br>
图中箭头指示的就是打包完成的桌面应用文件.

### 其他

1. 跨域问题
修改 `yourprojectname/.electron-vue/dev-runner.js`, 添加一下内容:

``` bash
const httpProxyMiddleware = require('http-proxy-middleware')
function startRenderer () {
    return new Promise((resolve, reject) => {
        # target为跨域的访问接口地址, eg: 后台接口为: http://localhost:8999/getuser, 在vue中我们使用/getuser即可
        server.use(httpProxyMiddleware({
            target: 'http://localhost:8999',
            changeOrigin: true
        }))
    })
}
```


