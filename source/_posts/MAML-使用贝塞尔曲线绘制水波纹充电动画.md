---
title: MAML-使用贝塞尔曲线绘制水波纹充电动画
date: 2019-07-10 15:36:40
tags: [MAML]
categories: [MIUI]
---

MAML官方文档中有一段关于贝塞尔曲线的介绍, 奈何说明文档介绍有限, 只好依葫芦画瓢整了一个水波纹充电动画效果, 代码如下(主题插件格式)：
<!-- more -->
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<Lockscreen version="2" frameRate="60" screenWidth="1080">
	<!-- 波长 -->
	<var name="wave_width" type="number" expression="#move_x" />
	<!-- 水波纹位置- 由电量控制 -->
	<var name="wave_y" type="number" expression="(2*valueholder_circle_r+valueholder_wave_height)*(1-#battery_level/100)" />

	<!-- 振幅 -->
	<ValueHolder name="valueholder_wave_height" type="param" description="振幅" defaultValue="50" />
	<!-- 圆半径 -->
	<ValueHolder name="valueholder_circle_r" type="param" description="圆半径" defaultValue="380" />
	<!-- group位置x -->
	<ValueHolder name="valueholder_group_x" type="param" description="x坐标" defaultValue="175" />
	<!-- group位置y -->
	<ValueHolder name="valueholder_group_y" type="param" description="y坐标" defaultValue="#screen_height/2-80" />
	<!-- 水波纹颜色-circle -->
	<ValueHolder name="valueholder_wave_color" type="param" description="水波纹颜色" defaultValue="#ff00ff00" />
	<!-- 圆颜色- -->
	<ValueHolder name="valueholder_circle_color" type="param" description="圆颜色" defaultValue="#ffffffff" />
	<!-- 水波纹颜色-paint 本来这里想使用#ffffffff的格式控制颜色, 没有实验成功-->
	<ValueHolder name="valueholder_paint_wave_color_r" type="param" description="圆颜色(R)" defaultValue="255" />
	<ValueHolder name="valueholder_paint_wave_color_g" type="param" description="圆颜色(G)" defaultValue="255" />
	<ValueHolder name="valueholder_paint_wave_color_b" type="param" description="圆颜色(B)" defaultValue="255" />
	<!-- 圆透明度- -->
	<ValueHolder name="valueholder_circle_alpha" type="param" description="透明度" defaultValue="125" />
	<!-- 文本颜色- -->
	<ValueHolder name="valueholder_text_color" type="param" description="文本颜色" defaultValue="#fffefefe" />
	<!-- 动画时长 -->
	<!-- <Var name="time_count" type="number" expression="3000" />
	<Var name="ani_time" type="number" expression="#move_x" />	-->
	<Var name="crg_val" expression="ifelse(eq(1, #battery_state)||eq(3, #battery_state), 1, 0)" />
	<Var name="crg" expression="#crg_val" threshold="1">
		<Trigger>
			<Command target="move_x.animation" value="play" delay="1000"/>
		</Trigger>
	</Var>
	<Var name="move_x">
		<VariableAnimation loop="true" initPause="true">
			<Item value="#screen_width" time="0" />
			<Item value="0" time="1500" />
			<Item value="-#screen_width" time="3000" />
		</VariableAnimation>
	</Var>

	<!-- 先初始化 -->
	<ExternalCommands>
		<Trigger action="init">
			<!-- scale_mum：CanvasDrawer是独立的，先计算在其它分辨率下的缩放比 -->
			<VariableCommand name="scale_mum" expression="int(#raw_screen_width/1.08)/1000" />
			<!-- 水波纹path -->
			<MethodCommand targetType="ctor" class="android.graphics.Path" return="pathWave" returnType="object"/>
			<!-- moveTo -->
			<MethodCommand target="pathWave" targetType="var" method="moveTo" paramTypes="float,float" params="-#move_x,0"/>
			<!-- quadTo -->
			<MethodCommand target="pathWave" targetType="var" method="quadTo" paramTypes="float,float,float,float" params="-0.75*#wave_width,valueholder_wave_height,-#wave_width/2,0"/>
			<MethodCommand target="pathWave" targetType="var" method="quadTo" paramTypes="float,float,float,float" params="-0.25*#wave_width,-valueholder_wave_height,0,0"/>
			<MethodCommand target="pathWave" targetType="var" method="quadTo" paramTypes="float,float,float,float" params="#wave_width/4,valueholder_wave_height,#wave_width/2,0"/>
			<MethodCommand target="pathWave" targetType="var" method="quadTo" paramTypes="float,float,float,float" params="0.75*#wave_width,-valueholder_wave_height,#wave_width,0"/>
			<MethodCommand target="pathWave" targetType="var" method="quadTo" paramTypes="float,float,float,float" params="#wave_width*1.25,valueholder_wave_height,#wave_width*1.5,0"/>
			<MethodCommand target="pathWave" targetType="var" method="quadTo" paramTypes="float,float,float,float" params="1.75*#wave_width,-valueholder_wave_height,#wave_width*2,0"/>
			<!-- lineTo -->
			<MethodCommand target="pathWave" targetType="var" method="lineTo" paramTypes="float,float" params="#wave_width*2,-#wave_y"/>
			<MethodCommand target="pathWave" targetType="var" method="lineTo" paramTypes="float,float" params="-#wave_width,-#wave_y"/>
			<MethodCommand target="pathWave" method="close" />
			<!-- 水波纹style -->
			<MethodCommand targetType="ctor" class="android.graphics.Paint" return="paintWave" returnType="object"/>
			<MethodCommand targetType="var" class="miui.maml.util.ReflectionHelper" method="getEnumConstant" paramTypes="String,String" params="'android.graphics.Paint$Style','FILL'" return="style" returnType="object"/>
			<MethodCommand target="paintWave" targetType="var" method="setStyle" paramTypes="android.graphics.Paint$Style" params="'style'"/>
			<!-- 这里应该使用paint的xfermodel进行资源的剪裁, 依旧实验失败...只好曲线救国了, 通过maml的xfermodel剪裁 -->
		</Trigger>
	</ExternalCommands>
	<Group visibility="eq(#battery_state,1)||eq(#battery_state,3)" alignV="top" align="left" x="valueholder_group_x+2+#defaultScreen_x" y="valueholder_group_y" scale="#scale_mum" w="valueholder_circle_r*2+4" h="valueholder_circle_r*2+4" layered="true">
		<CanvasDrawer x="#move_x" y="#wave_y-valueholder_wave_height">
			<Triggers>
				<Trigger action="draw">
					<MethodCommand target="paintWave" targetType="var" method="setARGB" paramTypes="int,int,int,int" params="255,valueholder_paint_wave_color_r,valueholder_paint_wave_color_g,valueholder_paint_wave_color_b"/>
					<!-- <MethodCommand target="paintWave" targetType="var" method="setColor" paramTypes="String" params="'@'"/>
					<MethodCommand target="paintWave" targetType="var" method="setColor" paramTypes="int" params="#paint_wave_color_v"/>-->
					<MethodCommand target="__objCanvas" targetType="var" method="drawPath" paramTypes="android.graphics.Path,android.graphics.Paint" params="'pathWave','paintWave'"/>
				</Trigger>
			</Triggers>
		</CanvasDrawer>
		<!-- <Rectangle x="2" y="0" w="valueholder_circle_r*2+4" h="#wave_y-2*valueholder_wave_height" fillColor="valueholder_circle_color">
		</Rectangle> -->
		<Text x="valueholder_circle_r+2-68" align="left" y="valueholder_circle_r*2-100" size="68" color="valueholder_text_color" textExp="#battery_level+'%'"/>
		<!-- 充电背景色 -->
		<Circle alpha="valueholder_circle_alpha" alignV="top" align="left" x="valueholder_circle_r+2" y="valueholder_circle_r" r="valueholder_circle_r" strokeColor="valueholder_wave_color" weight="valueholder_circle_r" cap="round" dash="1,1,1,1" strokeAlign="inner" xfermodeNum="10">
		</Circle>
	</Group>
</Lockscreen>
```
