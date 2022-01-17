function(node) {
                var i;
                var children = node.getChildren();
                for (i = 0; i < children.length; ++i) {
                    postOrder(children[i]);
                }
                del(node);
            }