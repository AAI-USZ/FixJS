function (filter) {
        var array = [];

        baidu.each(this, function(dom) {
            (dom = dom.parentNode) && dom.nodeType == 1 && array.push(dom);
        });
        array = baidu.array( array ).unique();

        return baidu.dom(typeof filter == "string" ? baidu.dom.match(array, filter) : array);
    }