---
title: Markdown Lint
date: 2019-06-19 09:49:36
tags: [Markdown Lint]
categories: [Lint]
toc: true
---
<script type="text/javascript" src="/js/ctrlands_tool.js"></script>

Markdown文档规范
运行环境：Visual Studio Code + [markdownlink插件](https://github.com/DavidAnson/vscode-markdownlint "")
以该markdownlink插件为标准, 例举自己编写md文档时出现的不规范行为.
新建markdownlint自定义配置文件：.markdownlink.json
<!-- more -->

### MD001

MD001-Heading levels should only increment by one level at a time(标题级别默认只能逐级增加)

### MD010

MD010-Hard Tabs(默认tab与space不允许混用)
修改.markdownlink.json, 添加

``` json
{
  "MD010": false
}
```

### MD013

MD013-Line length(默认不超过80)
修改.markdownlink.json, 添加

``` json
{
  "MD013": false
}
```

### MD022

MD022-Headings should be surrounded by blank lines(标题前后应换行)

``` markdown
## Title

Some Text...
```

### MD030

MD030-Spaces after list markers(列表标记(例如' -'，' *'，' +'或' 1.')与列表项文本之间的空格数, 默认为1)

### MD031

MD031-Fenced code blocks should be surrounded by blank lines(代码部分前后换行)

### MD033

MD033-Inline HTML(默认: 标记时不允许使用原始HTML)
修改.markdownlink.json, 添加

``` json
{
  "MD033": false
}
```

### MD034

MD034-Bare URL used(使用了纯URL, 应使用<URL>)
eg:

`for more infomation, see http://ctrlands.com`

you should use:

`for more infomation, see <http://ctrlands.com>`

### MD038

MD038-Spaces inside code span elements(代码块范围不建议包含空格)
eg:

``` markdown
` some text... `
```

you should use:

``` markdown
`some text...`
```

### MD047

MD047-Files should end with a single newline character(文档结束处空一行)
