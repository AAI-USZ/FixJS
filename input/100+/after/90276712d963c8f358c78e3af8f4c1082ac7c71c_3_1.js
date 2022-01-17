function (filter) {
        var array = [];

        baidu.each(this, function(dom) {
            var a = [];
            while (dom = dom.previousSibling) dom.nodeType == 1 && a.push(dom);

            baidu.merge(array, a.reverse());
        });
        array = baidu.array( array ).unique();

        return baidu.dom(typeof filter == "string" ? baidu.dom.match(array, filter) : array);
    }