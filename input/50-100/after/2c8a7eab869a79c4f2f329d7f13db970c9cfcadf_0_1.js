function(node, i){

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

        }