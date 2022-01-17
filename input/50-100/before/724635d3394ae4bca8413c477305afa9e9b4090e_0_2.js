function(node) {
            if (node.previousSibling && node.previousSibling.children.length) {
                return scorm_lastchild(node.previousSibling);
            }
            return scorm_skipprev(node);
        }