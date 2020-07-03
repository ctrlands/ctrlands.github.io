---
layout: cordova
title: Android Studio SQLite快捷调试
date: 2020-07-02 17:48:33
categories: [Vue]
tags: [Cordvoa]
---

#### WHY

最近在做cordova & vue 混合开发的时候, 部分数据需要储存在本地数据库(SQLite). 每次调试的时候感觉特别麻烦, 通过真机调试的话, 手机又需要root后才能查看到数据库里面的内容, 后来搜索相关文档后发现通过Android Studio的模拟器 + SQLiteStudio就可以快捷的查看数据内容.

<!-- More -->

#### SQLiteStudio

进入[SQLiteStudio](https://sqlitestudio.pl/)官网下载工具, 下载后解压直接运行 `SQLiteStudio.exe` 打开.

1. 点击菜单栏中的 工具(tools)-打开配置对话框(Open configuration dialog), 在弹窗内容中找到 `Android SQLite`, 将其打勾并确认.
![Android SQLite配置](/images/Cordova/Android-SQLite.png)

2. 在cordova项目中找到 `yourproject/platforms/android/app/src/main/AndroidManifest.xml` 打开添加内容 `<uses-permission android:name="android.permission.INTERNET" />`

3. 点击菜单栏中的 工具(tools)-Get Android Connector Jar file, 选择 `yourproject/platforms/android/app/libs` 确认.
![Get AndroidConnector Jar file配置](/images/Cordova/Get-Android-Connector-Jar-file.png)

4. 打开Android Studio, 在项目位置处右键找到 `Open Module Settings`, 点击 `Dependencies` 点击 '+' 号添加, 选择 `Jar Dependency`, 然后在step1的下拉弹窗内容中选择 `libs\SQLiteStudioRemote.jar`, 然后点击ok-apply.
![项目添加SQLite jar](/images/Cordova/Add-SQLite-jar.png)

5. 找到项目入口文件 `MainActivity.java`, 添加内容 `SQLiteStudioService.instance().start(this);`
![项目添加启动代码](/images/Cordova/Add-SQLite-Code.png)

#### 模拟器调试

1. 在模拟器中运行项目, 打开Android Studio的`AVD Manager`, 选择需要运行的模拟器, 在actions的下拉框中选择 `Cold Boot Now`, 等待模拟器开机, 然后在cordova项目根文件中执行`cordova emulate android`.

2. 打开SQLiteStudio, 点击菜单栏中的 数据库(Database)-添加数据库(Add a Database), 数据类型选择 `Android SQLite`, 然后在Device中选取运行中的模拟器, 确认.
![选择Android SQLite](/images/Cordova/SQLite-database-1.png)
![选择模拟器](/images/Cordova/SQLite-database-2.png)

3. 在SQLiteStudio首页左侧就可以看到正在使用的数据库了.
![查看数据](/images/Cordova/SQLite-database.png)

### 在Android Studio中查看项目的SQLite文件

1. 在Android Studio中打开Cordova项目, 待项目依赖文件加载完成, 运行(调试)项目后, 点击菜单栏中的 `View - Tool Windows - Device File Explorer`, `data/data/yourpackage name/databases`这个文件加里面就是存放的数据库文件, 可以右键将其保存到其他路径用SQLiteStudio进行查看.
![sql文件](/images/Cordova/Android-Studio-SQL-file.png)
