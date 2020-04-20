---
title: CSS规范-BEM
date: 2019-06-20 14:09:59
tags: [CSS]
categories: [Lint]
---
#### CSS样式规范：BEM格式

##### BEM: Block(块) Element(元素__) Modifier(修饰符_)

Block（块）

> * 该块名称描述它的目的（“这是什么？”-menu or buttons等）,而不是它的形状或状态
> * 该块不影响其环境，这意味着您不应该设置块的外部几何（边距）或定位
> * 功能独立的页面组件, 可重复使用

<!-- more -->

Element（元素__）

> * 该元素的名称描述它的目的（"这是什么？"-item or text等）,而不是它的形状或状态
> * 元素全名的结构: blcok-name__element-name.使用双下划线__与块名称分割
> * 元素始终是块的一部分, 而不是另一个元素, 所以元素不能定义层级结构, 不能出现`block__elem1__elem2`这种写法

Modifier (修饰符_)

> * 该修饰符名称描述其外观或者状态或者行为
> * 修饰符的结构: block-name__elementName_ModifierName or block-name_modifier-name 使用_连接

<div align="center">
  <img src="/images/BEM/bem.png">
</div>

* 根据BEM方法，块结构应平整，不需要反映块的嵌套DOM结构

``` html
  <style>
    .block {}
      .block__elem1 {}
      .block__elem2 {}
      .block__elem3 {}
  </style>

  <div class="block">
    <div class="block__elem1">
      <div class="block__elem2"></div>
    </div>
    <div class="block__elem3"></div>
  </div>
```

常见写法:

``` html
<!-- block, block__item, block_modifier, block__item_modifier -->
<ul class="menu menu_active">
  <li class="menu__item menu__item_active">Menu Item1</li>
  <li class="menu__item">Menu Item2</li>
  <li class="menu__item">Menu Item3</li>
</ul>
```

* 外部几何和定位，通过父块设置负责外部几何和定位的样式
  
``` html
  <style>
    .button {}
    .header__button {
      margin: ;
      padding: ;
      position: ;
      ....
    }
  <style>

  <header class="header">
    <button class="button header__button"></button>
  </header>
```

<font face="微软雅黑" size="3" color="#f03326">了解更多：</font><https://en.bem.info/methodology/quick-start/>
