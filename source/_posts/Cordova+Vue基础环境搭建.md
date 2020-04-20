---
layout: cordova
title: Cordvoa+Vue基础环境搭建
date: 2019-09-02 16:39:49
categories: [Vue]
tags: [Cordvoa]
---

#### 安装Cordova

``` bash
npm i -g cordova
```
这里不建议使用cnpm方式安装, 今天通过cnpm安装初始化项目的时候总是失败.

#### 初始化Cordova项目

``` bash
cordova create projectFileName packageName appName
```
for more info: [官方文档](http://cordova.axuer.com/docs/zh-cn/latest/guide/cli/index.html "")

<!-- More -->

#### 设置平台(已Android为例)

``` bash
cordova platfrom add android
```

#### 搭建Vue项目

在cordova项目同级目录创建vue项目, 放在同级目录方便管理

``` bash
vue init webpack projectname
```

### Vue项目配置

``` bash
修改 projectname/config/index.js
build: {
  // Template for index.html
  index: path.resolve(__dirname, '../../www/index.html'),

  // Paths
  assetsRoot: path.resolve(__dirname, '../../www'),
  assetsSubDirectory: './static',
  assetsPublicPath: './',
}
```
### Vue项目打包

``` bash
npm run build
```
项目打包完成后, 在cordova项目目录中的www文件夹里面会自动生成打包过后的文件

### Cordova打包

Cordova打包需要Android开发环境, 可参考[AndroidStudio环境搭建](http://www.ctrlands.com/2019/07/16/React-Native%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/ "")
``` bash
cordova run build
```

执行命令后, 可能会遇到以下问题:
1. 下载gradle-4.10.3-all(以你的版本为准)失败
解决办法：根据提示的下载链接, 手动下载文件并解压, 然后放在(你的AndroidStudio安装文件位置)AndroidStudio/gradle/gradle-4.10.3/解压后的文件
2. 编译失败
如图所示:
![编译失败](/images/Cordova/builderr.png)</br>
解决办法：这个问题引起的原因是网络的问题, 正常情况下我们是无法访问谷歌的, 所以我们无法获取其资源. 因为我们可以借助相关软件访问谷歌的资源或者修改相关文件. 在

`
projectFileName/platforms/android/build.gradle, projectFileName/platforms/android/app/build.gradle, projectFileName/platforms/android/CordovaLib/build.gradle
`

这几个文件中找到所有的 `repositories`, 修改为(添加maven)：

``` bahs
repositories {
  jcenter()
    maven {
      url "http://maven.aliyun.com/nexus/content/groups/public/"
  }
}
```

打包成功的文件会放在
`
projectFileName/platforms/android/app/build/outputs/apk/debug/app-debug.apk
`

### Cordova调试

``` bash
cordova run android
```
我们可以通过数据线将手机连接电脑, 实现调试查看效果, 也可通过adb远程调试, 摆脱数据线的束缚.

电脑和手机处于同一局域网, 现将手机通过数据线连接电脑, 打开控制窗口执行:

``` bash
adb tcpip 5555
adb connect your-Phone-Wifi-Ip:5555
```

连接成功后会提示

``` bash
connected to 192.168.1.xxx:5555
```

此时就可以拔掉数据线了, 此时就可以通过

``` bash
cordova run android
```

直接调试了.

### 查看控制台

打开谷歌浏览器, 地址栏输入: `chrome://inspect/#devices`, 在这个界面你可以看到运行的项目, 点击 `inspectinspect` 或者 `fallback` 就可以看到控制台了.

### 其他

1. 在Cordova中不会出现跨域的情况, 因此我们可以直接访问. eg: 我们之前的访问接口为: `http://localhost:8080/xxx`, 现在就可以直接用http://192.168.1.xx:8080/xxx进行访问.
2. 当我们使用http进行访问的时候, 可能会遇到访问失败的情况, 提示 `net::ERR_CLEARTEXT_NOT_PERMITTED`, 原因是从Android 6.0开始引入了对Https的推荐支持, 与以往不同, Android P的系统上面默认所有Http的请求都被阻止了.
解决办法: 修改 `projectFileName/platforms/android/app/src/main/AndroidManifest.xml`, 在 `<application></application>` 添加 `android:usesCleartextTraffic="true"`, 修改为

``` bash
<application android:hardwareAccelerated="true" android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:supportsRtl="true" android:usesCleartextTraffic="true">
```