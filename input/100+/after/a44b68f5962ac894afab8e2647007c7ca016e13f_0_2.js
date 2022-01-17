function(e) {
        var paginator = this,
            host = paginator._host,
            bb = paginator._bb,
            widgetHeight = bb.get('offsetHeight');
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size();

        paginator.set(TOTAL, size);

        // Inefficient.  Should not reinitialize every card every syncUI
        pageNodes.each(function(node, i){

            var scrollHeight = node.get('scrollHeight'),
                maxScrollY = scrollHeight - widgetHeight;

            if (maxScrollY < 0) {
                maxScrollY = 0;
            } 

            // Don't initialize any cards that already have been.
            if (!paginator.cards[i]) {
                paginator.cards[i] = {
                    maxScrollY: maxScrollY,
                    node: node,
                    scrollX: 0,
                    scrollY: 0
                };
            } else {
                paginator.cards[i].maxScrollY = maxScrollY;
            }

        });
    }