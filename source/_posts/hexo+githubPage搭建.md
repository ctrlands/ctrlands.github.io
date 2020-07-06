---
title: hexo + github page 搭建
date: 2019-06-15 14:09:59
categories: [hexo]
---
安装环境前提：Node + Git

## I. hexo安装

### 1. 使用npm安装hexo

``` bash
npm install -g hexo-cli
```
<!-- more -->

### 2. hexo初始化

``` bash
hexo init folderName
cd folderName
npm install
```

![hexo 初始化](/images/HexoGithubPageBuild/hexo-init.png)

### 3. 启动服务

``` bash
hexo server
```

![hexo 服务启动](/images/HexoGithubPageBuild/hexo-server-cmd.png)
浏览器输入地址：localhost:4000查看.
![hexo 服务启动](/images/HexoGithubPageBuild/hexo-server-img.png)

### 4. github page

git上新建仓库, 项目名为： yourusername.github.io, 记住仓库的地址后面需要部署到这个仓库里面来.

### 5. 配置git

***根目录/_config.yml***

``` json
{
  deploy:
    type: git
    repository: https://github.com/ctrlands/ctrlands.github.io.git
    branch: master
    message: message
}
```

了解更多：[hexo deploy](https://hexo.io/zh-cn/docs/deployment "")

### 6. 更换主题

选择自己喜欢的主题下载，然后将主题文件放在 ***根目录/themes*** 文件下，默认主题(landspace)可删掉.
然后在 ***根目录/_config.yml***

``` json
{
  theme: hexo-theme-icarus
}
```

![hexo 更换主题](/images/HexoGithubPageBuild/hexo-theme.png)
查看更多主题：[hexo theme](https://hexo.io/themes/ "")

### 7. 生成静态页面

``` bash
hexo generate
```

可简写为:

``` bash
hexo g
```

![hexo generate](/images/HexoGithubPageBuild/hexo-generate.png)
生成的文件位于 ***根目录/Public*** 文件夹里面.

### 8. 部署

``` bash
hexo deploy
```

可简写为:

``` bash
hexo d
```

![hexo deploy](/images/HexoGithubPageBuild/hexo-deploy.png)
若遇到提示：ERROR: Deployer not fonud git.
执行命令安装：
`npm install hexo-deployer-git --save`
安装成功后初次提交会输入用户名和密码, 若不想每次提交输入验证, 需添加ssh key, [git添加ssh key](https://www.liaoxuefeng.com/wiki/896043488029600/896954117292416)

### 9. 域名解析

在 ***根目录/themes/your theme/source*** 根目录中添加CNAME文件,无任何后缀名，文件内容为你的域名(eg: www.ctrlands.com).

## Ⅱ. 域名解析绑定

在域名提供商控制台页面添加域名解析记录：
		记录类型选CNAME
		记录值填username.github.io.
![hexo deploy](/images/HexoGithubPageBuild/domain.png)

## Ⅲ. 其他

hexo中的 ***根目录/_config.yml*** 为站点**配置文件**.<br/>
***根目录/theme/downloadTheme*** 中的_config.yml为**主题配置文件**.<br/>
设置语言为中文：修改 站点配置文件 中的 language: zh-Hans,若未生效，将主题配置文件language文件中的zh-CN.yml改为zh-Hans.yml.<br/>
hexo deploy时添加自定义commit信息：

``` bash
hexo d -message "the info of commit"
```

可简写为：

``` bash
hexo d -m "the info of commit"
```

新建文档并上传流程:
``` bash
hexo new 'document name'
hexo generate
hexo d -m 'commit message'
```
