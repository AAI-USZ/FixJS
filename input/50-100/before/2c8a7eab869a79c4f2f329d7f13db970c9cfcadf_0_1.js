function(node, i){

            scrollHeight = node.get('scrollHeight');

            paginator.cards[i] = {
                maxScrollY: scrollHeight - widgetHeight,
                node: node,
                scrollX: 0,
                scrollY: 0
            };

        }