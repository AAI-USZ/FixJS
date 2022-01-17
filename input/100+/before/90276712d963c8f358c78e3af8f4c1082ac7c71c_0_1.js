function (selector, context) {
        var dom = this.get(0)
            ,td = baidu.dom(dom);
        
        if (!dom) { return td;}

        do {
            td[0] = dom;

            if (td.is(selector, context)) return td;
        } while (dom = dom.parentNode);

        return baidu.dom();
    }