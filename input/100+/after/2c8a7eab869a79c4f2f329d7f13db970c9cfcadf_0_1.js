function (e) {
        // console.log('_afterHostRender');
        var paginator = this,
            host = paginator._host,
            bb = paginator._bb,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size(),
            widgetHeight = bb.get('offsetHeight');

        pageNodes.each(function(node, i){

            var scrollHeight = node.get('scrollHeight'),
                maxScrollY = scrollHeight - widgetHeight

            if (maxScrollY < 0) {
                maxScrollY = 0;
            } 

            paginator.cards[i] = {
                maxScrollY: maxScrollY,
                node: node,
                scrollX: 0,
                scrollY: 0
            };

        });

        bb.addClass(CLASS_PAGED);
        paginator.set(TOTAL, size);
        paginator._optimize();
    }