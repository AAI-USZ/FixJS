function(node) {
            var node = scorm_tree_node.getHighlightedNode();
            if (node.depth > 0) {
                return node.parent;
            }
            return null;
        }