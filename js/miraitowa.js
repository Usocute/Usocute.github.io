//滚动条自动隐藏
var t1 = 0;
var t2 = 0;
var timer = null; // 定时器
document.styleSheets[0].addRule('*::-webkit-scrollbar-thumb','display:none;');

// scroll监听
document.onscroll = function() {
  clearTimeout(timer);
  timer = setTimeout(isScrollEnd, 1000);
  t1 = document.documentElement.scrollTop || document.body.scrollTop;
  document.styleSheets[0].addRule('*::-webkit-scrollbar-thumb','display:block;');
}

function isScrollEnd() {
  t2 = document.documentElement.scrollTop || document.body.scrollTop;
  if(t2 == t1){
    document.styleSheets[0].addRule('*::-webkit-scrollbar-thumb','display:none;');
  }
}

console.log(" %c %c", "padding: 40px 120px;margin-left: 100px;background: url('https://miraitowa.oss-cn-chengdu.aliyuncs.com/img/miraitowa-console-logo.png') no-repeat;background-size: 100%;", "color: pink;font-size: 20px");