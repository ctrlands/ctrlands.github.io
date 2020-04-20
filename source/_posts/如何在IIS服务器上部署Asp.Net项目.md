---
title: 如何在IIS服务器上部署Asp.Net项目
date: 2019-06-17 09:14:45
tags: [Asp.Net]
categories: [Asp.Net]
---

## I. 项目发布

使用工具及环境: Visual Studio 2017 + Windows Server 2008

1. 项目解决方案右键选择"**批生成**"</br>
<!-- more -->
![批生成](/images/AspNetRealease/批生成.png)</br>
2. 弹窗中"**全选**"后"**重新生成**"</br>
![全选-重新生成](/images/AspNetRealease/全选-重新生成.png)</br>
3. 找到项目启动文件, 右键"**发布**"</br>
![发布](/images/AspNetRealease/发布.png)</br>
4. 启动->在新弹窗中选择"IIS、FTP发布"->创建配置文件->发布方法选择"文件系统"->选择发布文件存放的位置</br>
![IIS、FTP发布](/images/AspNetRealease/发布配置.png)</br>
![发布方法选择"文件系统"](/images/AspNetRealease/发布配置-1.png)</br>
![存放位置](/images/AspNetRealease/发布配置-2.png)</br>
![配置选择"Release"](/images/AspNetRealease/发布配置-3.png)</br>
5. 新界面点击"发布"</br>
![发布](/images/AspNetRealease/发布配置-4.png)

## I. 项目部署

1. Win+R, 输入mstsc远程登陆服务器, 以Windows Server 2008为例, 填写服务器地址, 用户名Administrator(默认), 密码.
2. 服务器桌面, "我的电脑"右键"管理"->打开"服务器管理器"->"角色"->"添加角色"->下一步, 选择"Web服务器(IIS)"->下一步, 勾选"应用程序开发(Asp.Net, .NET扩展, ISAPI扩展, ISAPI筛选器), 常用HTTP功能(静态内容,默认文档,HTTP错误,HTTP重定向)"->下一步, "安装"->等待安装完成, 浏览器输入"127.0.0.1"查看是否安装成功.
3. "开始"菜单->Internet信息服务(IIS)管理器->"网站"右键"添加网站"->填写"网站名称", "物理路径"选择刚才发布文件的位置, 填写"端口"号(购买的服务器需要开放该端口)

## Ⅲ. 其他

IIS中, 选择你的网站项目添加"绑定"(右侧), 端口号填写80, 填写其他端口会导致通过域名访问时的页面是iis默认的首页, 而不是项目的首页. 绑定值添加两条记录yourdomain.com, www.yourdomain.com, 这样就可以通过两种方式访问了.(如果只添加了yourdomain.com, 当你通过www.yourdomain.com访问的时候就页面就会显示404).
SQL Server运行需要.Netframework和VS2015环境, SQL Server TCP端口1433可能未设置. 打开SQL Server配置管理器, SQLEXPRESS的协议->TCP/IP右键->IPALL->TCP端口1433
