function (e) {
        // console.log('_afterHostRender');
        var paginator = this,
            host = paginator._host,
            bb = paginator._bb,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size(),
            widgetHeight = host.get('height'),
            scrollHeight;

        pageNodes.each(function(node, i){

            scrollHeight = node.get('scrollHeight');

            paginator.cards[i] = {
                maxScrollY: scrollHeight - widgetHeight,
                node: node,
                scrollX: 0,
                scrollY: 0
            };

        });

        bb.addClass(CLASS_PAGED);
        paginator.set(TOTAL, size);
        paginator._optimize();
    }