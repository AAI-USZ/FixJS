function(node) {
            if (node.children.length) {
                return scorm_lastchild(node.children[node.children.length-1]);
            } else {
                return node;
            }
        }