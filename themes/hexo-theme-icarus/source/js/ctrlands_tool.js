// var scrollFunc = function (e) {
//   e = e || window.event;
//   if (e.wheelDelta) {
//     if (e.wheelDelta > 0) {
//       var odom = document.getElementById("article-toc-inner");
//       var scrollTop = window.pageYOffset //用于FF
//       || document.documentElement.scrollTop
//       || document.body.scrollTop
//       || 0;
//       if (scrollTop <= 100) {
//         odom.style.top = "100px";
//       } else {
//         odom.style.top = "10px";
//       }
//     }
//     if (e.wheelDelta < 0) {
//       var odom = document.getElementById("article-toc-inner");
//       var scrollTop = window.pageYOffset //用于FF
//       || document.documentElement.scrollTop
//       || document.body.scrollTop
//       || 0;
//       if (scrollTop >= 0) {
//         odom.style.top = "10px";
//       } else {
//         odom.style.top = "100px";
//       }
//     }
//   } else if (e.detail) {
//     if (e.detail > 0) {
//       var odom = document.getElementById("article-toc-inner");
//       var scrollTop = window.pageYOffset //用于FF
//       || document.documentElement.scrollTop
//       || document.body.scrollTop
//       || 0;
//       if (scrollTop <= 100) {
//         odom.style.top = "100px";
//       } else {
//         odom.style.top = "10px";
//       }
//     }
//     if (e.detail < 0) {
//       var odom = document.getElementById("article-toc-inner");
//       var scrollTop = window.pageYOffset //用于FF
//       || document.documentElement.scrollTop
//       || document.body.scrollTop
//       || 0;
//       if (scrollTop >= 0) {
//         odom.style.top = "10px";
//       } else {
//         odom.style.top = "100px";
//       }
//     }
//   }
// }

// if (document.addEventListener) {
//   document.addEventListener("DOMMouseScroll", scrollFunc, false);
// }

// window.onmousewheel = document.onmousewheel = scrollFunc;


function getScrollTop(){
  　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　　if(document.body){
  　　　　bodyScrollTop = document.body.scrollTop;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollTop = document.documentElement.scrollTop;
  　　}
  　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　　return scrollTop;
  }
  //文档的总高度
  function getScrollHeight(){
  　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　　if(document.body){
  　　　　bodyScrollHeight = document.body.scrollHeight;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollHeight = document.documentElement.scrollHeight;
  　　}
  　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　return scrollHeight;
  }
  function getWindowHeight(){
  　　var windowHeight = 0;
  　　if(document.compatMode == "CSS1Compat"){
  　　　　windowHeight = document.documentElement.clientHeight;
  　　}else{
  　　　　windowHeight = document.body.clientHeight;
  　　}
  　　return windowHeight;
  }
  window.onscroll = function(){
    var odom = document.getElementById("article-toc-inner");
    if (odom) {
      if (getScrollTop() >= 100) {
        odom.style.top = "10px";
      } else {
        odom.style.top = "100px";
      }
      if(getScrollTop() + getWindowHeight() + 123 >= getScrollHeight()) {
        odom.style.height = "calc(100% - 244px)";
      } else {
        odom.style.height = "calc(100% - 104px)";
      }
    }
  };