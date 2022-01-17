function(data) {
            // Unfortunately, we can't use applyMov because the coweb API must use an insert/delete pair.
            var node;
            var p;
            if ("insert" == data.type) {
                node = this.domTree_map[data.value.id];
                p = this.domTree_map[data.value.newParent];
                node.parent = p;
                node.depth = p.depth + 1;
                if (p.children)
                    p.children.splice(data.position, 0, node);
                else
                    p.children = [node];
            } else if ("delete" == data.type) {
                p = this.domTree_map[data.value.oldParent];
                // Remove node from parent's children array.
                p.children.splice(data.position, 1);
                if (0 == p.children.length)
                    p.children = null;
            }
        }