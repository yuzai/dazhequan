// 创建一个新的  iframe, 然后将其 `contentWindow` 中的属性值
// 与当前 window 中的属性值对比, 不在其中的就是自定义对象
;(function() {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';//不显示iframe
    iframe.onload = function() {
        // 使用 Object.keys() 获取对象的所有属性名
        Object.keys(window).forEach(function(key) {
            // 如果存在 window 中,而 iframe 中却没有
            if(!(key in iframe.contentWindow)) {
                // 输出到控制台,也可以加入数组,自己处理
                window.console && console.log && console.log(key);
            }
        });
    };
    // 必须在 设置 src 属性之前添加 onload 事件。
    // 在 onload 里面 contentWindow 才变得可用!
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);
    //唯一的问题就是因为chrome的扩展程序也会污染全局变量。这里不好对这些进行检测
})();
