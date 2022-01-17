function(node) {
                var pos;
                var id = node.item.id[0];
                var p = node.getParent();
                var children = p.getChildren();
                var item = node.item;
                for(var i=0; i<children.length; i++){
                    if(children[i].item.id[0] == id)
                        pos = i;
                }
                // delete item from store & save
                toDel.push([item,p.item.id[0],pos,id]);
            }