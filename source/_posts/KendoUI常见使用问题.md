---
title: Kendo UI常见使用问题
date: 2019-06-17 17:12:02
tags: [Kendo UI]
categories: [Kendo UI]
toc: true
---

<script type="text/javascript" src="/js/ctrlands_tool.js"></script>

## I. grid

### grid传参读取数据

<!-- more -->

``` razor
@(Html.Kendo.Grid(Model)
      .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(reaad => read.Action("Method","ControllerName").Data("QueryParams"))
        // 下面这种方式适用于val为已知值, 不能动态设置其值
        //.Read(reaad => read.Action("Method","ControllerName"), new {param1: val1, param2: val2})
      )
)
<script type="text/javascript">
  function QueryParams () {
    return {
      param1: "val1",
      param2: "val2"
    }
  }
</script>
```

### grid添加行checkbox及序号

``` asp.net
@(Html.Kendo().Grid(Model)
      .Name("GridName")
      .Columns(columns =>
        {
          columns.Select().Width(30).HtmlAttributes(new { @class = "select-checkbox" });
          columns.Template(@<text></text>).ClientTemplate("<span class='row-number'></span>").Title("序号").Width(55);
        })
      .ToolBar(toolbar => {
        toolbar.Custom.Text("删除").HtmlAttributes(new {
          @class = "del_btn"
        }).Url("javascript:void(0)");
      })
      .Events(events =>
        {
          events.DataBound("onDataGridBound");
        })
)
<script type="text/javascript">
    // grid 编号
    function onDataGridBound() {
        var $grid = $("#GridName").data("kendoGrid");
        if ($grid) {
            var rows = $grid.items();
            //连续编号
            $(rows).each(function () {
                var index = $(this).index() + 1 + ($grid.dataSource.pageSize() * ($grid.dataSource.page() - 1));
                var rowLabel = $(this).find(".row-number");
                $(rowLabel).text(index);
            });
        }
    }

    // 删除
    $(".del_btn").click(function () {
      var $grid = $("#GridName").data("kendoGrid");
      var idArr = [];
      $grid.select.each(function (index, row) {
        var item = $grid.dataItem(row);
        if (item) {
          idArr.push({Id: item.Id});
        }
      })
      if (idArr.length > 0) {
        ComfirmAlert("是否删除所选数据！", function () {
          $.ajax({
            url: '@Url.Action("Method", "ControllerName")',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(idArr),
            error: function (err) {

            },
            success: function (data) {
              MessageAlert(data.message);
              // 重新加载grid
              $grid.dataSource.read();
            }
          })
        })
      }
    })

</script>
```

### grid自定义列模版

``` asp.net
// setTemplate(data) 用data可以获取整行数据
columns.Bound(m => m.StateStr).Title("状态").Width(100).ClientTemplate("#= setTemplate(data) #");
// svgCircle(Progress) 用具体列名则获取当前列名数据
columns.Bound(p => p.Progress).ClientTemplate("#= svgCircle(Progress) #").Width(120);
<script type="text/javascript">
  function setTemplate(item){
  // item.StateStr  item.xxx 这里可以进行计算
  return "'<span>'+item.StateStr+'</span>";
  }
  // gird添加圆环进度条(svg)fromat
  function svgCircle(val) {
      var setCircleVal = Math.floor(2 * Math.PI * 15) * (val/100);
      return "<div style='text-align: center;'>" +
          "<div class='header_circle_text'>" +
          "<span>" + val + "%</span>" +
          "</div>" +
          "<svg xmlns='http://www.w3.org/200/svg' style='width:50px;height:50px;position:absolute;margin-left:-25px;margin-top:-35px;'>" +
          "<circle cx='25' cy='25' r='15' fill='none' stroke='rgb(233,233,233)' stroke-width='2' stroke-linecap='round' />" +
          "<circle class='J_demo3' cx='25' cy='25' r='15' fill='none' stroke='rgb(70,128,254)' stroke-width='2' stroke-dasharray='" + setCircleVal +",10000' />" +
          "</svg>" +
          "</div>"
  }
```

### 修改grid中的popUp弹窗标题

``` razor
@(Html.Kendo().Grid(Model)
    .Editable(editable => {
      editable.Mode(GridEditMode.PopUp);
      editable.TemplateName("_YourEditTemplateName").Window(m => { m.Width(980); });
    })
    .Events(events => {
      events.Edit("eventsOfEdit");
    })
  )
<script type="text/javascript">
  function eventsOfEdit (e) {
    if (e && e.model && e.model.isNew()) {
      $(".k-window-title").text("your new title, eg: add";
    } else {
      $(".k-window-title").text("your new title, eg: edit");
    }
  }
</script>
```

### gird添加toolbar

需求: 用户可以搜索查询指定字段的数据.
实现: toolbar元素可以通过append方式追加元素 (添加一个按钮，通过js在这个按钮append元素) 或者使用template(不过需要重写按钮的方法,比较麻烦)

``` razor
@(Html.Kendo.Grid(Model)
    .Name("GridName")
    .ToolBar(toolbar => {
      toolbar.Custom.Text("搜索").HtmlAttribute(new {
        @class = "search_label"
      }).Url("javascript:void(0)");
    })
)
<script type="text/javascript">
    $(document).ready(function () {
      $(".search_label").before("<input placeholder='请输入内容' id='search_keyword' class='search_keyword' />")
    })
    $(".search_label").click(function () {
      var key_word = $("#search_keyword").val();
      var $grid = $("#GridName").data("kendoGrid");
      if ($grid) {
        $grid.dataSource.filter({
          field: "Name",
          operator: "contains",
          value: keyword
        })
      }
    })
</script>
```

## Ⅱ. TreeView

### 自动选中某个节点

``` javascript
var treeview = $("#Treeview").data("kendoTreeView");
var getitem = treeview.dataSource.get("id"); // id为节点数据的id值
if (typeof (getitem) != "undefined") {
  var selectitem = treeview.findByUid(getitem.uid);
  if (typeof (selectitem) != "undefined") {
    // 使用treeview.select()可获取到当前选中的节点
    // 根据一个节点获取它的父级节点treeview.parent(node)
    treeview.select(selectitem); // 设置选中的节点
    treeview.expandTo(treeview.dataItem(selectitem)); // 展开到选中节点
  }
}

```
