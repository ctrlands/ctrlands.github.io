---
title: 'centeros8安装gitlab'
date: 2020-07-16 11:20:06
categories: [Server]
tags: [服务器]
---

#### I. 环境准备

模拟环境：虚拟机(centeros8), 虚拟机内存4G以上

#### II. 安装

- 安装依赖

``` bash
yum install -y curl policycoreutils-python openssh-server
```

centeros8中没有policycoreutils-python的yum源, 暂时不用理会
<!-- More -->

- 启动ssh并设置为开机自启

``` bash
systemctl enable sshd
systemctl start sshd
```

- 添加http服务到firewalld,pemmanent表示永久生效，若不加--permanent系统下次启动后就会失效

``` bash
systemctl start firewalld
firewall-cmd --permanent --add-service=http
systemctl reload firewalld
```

- 启动postfix

``` bash
systemctl enable postfix
systemctl start postfix
```

- 下载gitlab

``` bash
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el8/gitlab-ce-12.10.1-ce.0.el8.x86_64.rpm
```

文件源一定要选对(e18对应centeros8, e17对应centeros7)

- 安装

``` bash
rpm -i gitlab-ce-12.10.1-ce.0.el8.x86_64.rpm
```

- 设置访问ip地址及端口

``` bash
vim /etc/gitlab/gitlab.rb
```

添加 `erternal_url: 'http://127.0.0.1:9527'`, ip:端口号

``` bash
gitlab-ctl reconfigure
gitlab-ctl restart
```

- 访问端口查看是否成功, 如果不能访问, 关闭防火墙

``` bash
systemctl stop firewalld
```

- 第一次访问需要设置密码, 用户名为root

- 其他

``` bash
gitlab-ctl start
gitlab-ctl stop
```
