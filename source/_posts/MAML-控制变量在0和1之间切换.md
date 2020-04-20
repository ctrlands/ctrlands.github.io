---
title: MAML-控制变量在0和1之间切换
date: 2019-07-09 14:11:55
tags: [MAML]
categories: [MIUI]
---

实现目标：一个开关按钮, 点击实现文本颜色切换, 解锁后保持状态不变.
<!-- more -->
以前多在config.xml里面进行主题变量的配置, eg：

``` xml
<Group text="锁屏文本颜色">
	<NumberChoice text="文本颜色选择" id="color_style" default="0">
		<Item value="1" text="白色-适用于深色类壁纸"/>
		<Item value="0" text="黑色-适用于浅色类壁纸"/>
	</NumberChoice>
</Group>
```
根据这种写法, 就可以在manifest.xml使用`@color_style`动态获取到该值. 根据这种写法唯一的缺点就是用户需要打开锁屏自定义设置界面能进行设置, 然鹅大多数用户估计都不知道还有锁屏自定义设置功能存在. 所以现在想在锁屏界面中直接进行变量的控制.

代码如下：

``` xml
<!-- 开关关闭状态x坐标 -->
<var name="circle_x" expression="92" const="true" />
<Button x="32" y="800" w="200" h="100" algin="left" alignV="top">
  <Normal>
      <!-- 绘制开关 -->
      <!-- 开关边框 -->
      <Rectangle name="rec" algin="left" alignV="top" x="32" y="800" w="200" h="100" cornerRadius="50,50" strokeColor="#ff1e1e1e" fillColor="#4cffffff" weight="4" cap="round" dash="0" strokeAlign="center">
      </Rectangle>
      <!-- 开关关闭状态圆圈 -->
      <Circle visibility="!(#toggle_state)" name="toggle_off" algin="left" alignV="top" x="#circle_x" y="850" r="40" strokeColor="#ffffffff" fillColor="#ff1e1e1e" weight="2" cap="round" dash="0" strokeAlign="center">
      </Circle>
      <!-- 开关开启状态圆圈 -->
      <Circle visibility="#toggle_state" name="toggle_on" algin="left" alignV="top" x="#circle_x+70" y="850" r="40" strokeColor="#ffffffff" fillColor="#ffefefef" weight="2" cap="round" dash="0" strokeAlign="center">
      </Circle>
  </Normal>
  <Triggers>
      <Trigger action="down">
          <!-- 中间变量temp, 此时toggle_state未赋值, 默认为0 -->
          <VariableCommand name="temp" expression="#toggle_state" persist="true" const="true"/>
          <!-- 当temp为1时, toggle_state为0 -->
          <VariableCommand name="toggle_state" expression="0" condition="eq(#temp,1)" persist="true"/>
          <!-- 当temp为0时, toggle_state为1 -->
          <VariableCommand name="toggle_state" expression="1" condition="eq(#temp,0)" persist="true"/>
          <!-- @vr_value 这个值就是我们需要的值 -->
          <VariableCommand name="vr_value" expression="ifelse(#toggle_state,'#ffffffff','#ff000000')" type="string" const="true" persist="true"/>
      </Trigger>
  </Triggers>
</Button>
<!-- 调试文本, 可删 -->
<Text name="vrs" size="32" color="#f03326" x="100" y="400" format="vr_value %s" paras="@vr_value" />
<Text name="vdrs" size="32" color="#f03326" x="100" y="500" format="toggle_state %d" paras="#toggle_state" />
<Text name="rs" size="32" color="#f03326" x="100" y="600" format="toggle_off %d" paras="#toggle_off.visibility" />
<Text name="ras" size="32" color="#f03326" x="100" y="700" format="toggle_on %d" paras="#toggle_on.visibility" />
```
