function(data) {
            // Unfortunately, we can't use applyMov because the coweb API must use an insert/delete pair.
            var node = this.domTree_map[data.value.id];
            var p = node.parent;
            if ("insert" == data.type) {
                if (p.children)
                    p.children.splice(data.position, 0, node);
                else
                    p.children = [node];
            } else if ("delete" == data.type) {
                // Remove node from parent's children array.
                p.children.splice(data.position, 1);
                if (0 == p.children.length)
                    p.children = null;
            }
        }