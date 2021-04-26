---
title: Github与Gitlab共存
date: 2021-04-26 16:34:21
tags: [Dev]
categories: [Dev]
---
## Git

### 配置多个SSH Key

1. 首先清除git的全局用户信息

```bash
git config --global --unset user.name 'your name'

git config --global --unset user.email 'your email'
```

<!-- more -->

2. 生成新的 SSH key

- gitlab的SSK Key

``` bash
// 在.ssh文件目录下生成一个id_rsa.gitlab文件

ssh-keygen -t rsa -f ~/.ssh/id_rsa.gitlab -C "your gitlab email"
```

- github的SSH Key

``` bash
// 在.ssh文件目录下生成一个id_rsa.github文件

ssh-keygen -t rsa -f ~/.ssh/id_rsa.github -C "your github email"
```

3. 添加可被识别的SSH Key

默认只读取 id_rsa，为了让 SSH 识别新的私钥，需要将新的私钥加入到到ssh-agent的高速缓存中.

``` bash
ssh-agent bash

ssh-add ~/.ssh/id_rsa.gitlab

ssh-add ~/.ssh/id_rsa.github
```

4. 添加多账号配置文件

``` bash
// 创建配置文件

touch ~/.ssh/config
```

修改配置文件

```
# gitlab
Host 10.10.4.1
# gitlab地址
HostName 10.10.4.1
User git
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitlab
# Port *** gitlab端口号

# github
Host github.com
User git
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github
```

5. 在gitlab和github的个人中心设置中添加对应的SSK Key.

6. 测试

```bash
// gitlab 测试 10.10.4.1你的gitlab地址, 连接成功会看到'Welcome to GitLab, @${your gitlab name}!'
ssh -T git@10.10.4.1
// github 测试 连接成功会看到'Hi ${your github name}! You've successfully authenticated, but GitHub does not provide shell access.
!'
ssh -T git@github.com
```

7. 设置提交者信息

由于我们之前把github的全局用户信息给清除了, 所以第一次提交数据时会让你输入用户名, 我们可以在项目中直接设置本项目中你的提交名字

```bash
// 在该项目中你的提交者姓名就会变为xxx
git config --local user.name 'xxxx'
```
