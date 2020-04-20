---
title: React Native环境搭建
date: 2019-07-16 11:14:40
tags: [React Native]
categories: [React Native]
---

具体安装步骤[参考文档](https://reactnative.cn/docs/getting-started/ "")
本文记录一下安装过程中遇到的一些问题.
根据文档, 先安装相关依赖, Node(>=10.x), react-native-cli, Python(2.x), JDK(1.8), Android Studio. 
<!-- more -->

目前我的电脑上只有react-native-cli和Android Studio还未安装,所以先安装这两个依赖.

### 安装react-native-cli

``` bash
npm install -g react-native-cli
```

### 安装Android Studio

安装AS时下载相关文件时需要翻墙, 我们可以曲线救国, 在[chinaz](http://ping.chinaz.com/dl.google.com "")这个网站里面选取一个延迟较低的ip地址(文本发布时我使用的ip为203.208.40.97), 然后`C:\Windows\System32\drivers\etc`路径下找到`host`文件,添加203.208.40.97 dl.google.com, 然后就可以正常下载相关文件了.
第一次运行AS的时候会提示添加Proxy配置,我们因为修改了host,直接选择Auto就可以了.
当相关依赖都正常安装完成后, 创建RN项目`react-native init yourprojectname`,创建成功后运行`react-native run-android`,在运行的时候报错：
``` bash
info Running jetifier to migrate libraries to AndroidX. You can disable it using "--no-jetifier" flag.
error Failed to run jetifier. Run CLI with --verbose flag for more details.
Error: spawnSync C:\Users\LJ\Desktop\React\AwesomeProject\node_modules\jetifier\bin\jetify ENOENT
```
后来在github中project的issue中找到解决方案：
`react-native run-android --no-jetifier`
