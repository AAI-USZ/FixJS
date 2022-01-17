function del(node) {
                var id = node.item.id[0];
                var p = node.getParent();
                var children = p.getChildren();
                var item = node.item;
				/* Position for all children of the original node we are deleteing will
				   always be 0 since we delete in post-order traversal. */
                toDel.push([item,p.item.id[0],0,id]);
            }