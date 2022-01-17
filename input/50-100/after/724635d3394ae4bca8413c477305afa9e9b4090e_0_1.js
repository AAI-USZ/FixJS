function(node, update_launch_sco) {
            var node = scorm_tree_node.getHighlightedNode();
            if (node.depth > 0 && typeof scoes_nav[launch_sco].parentscoid != 'undefined') {
                var parentscoid = scoes_nav[launch_sco].parentscoid;
                node.parent.title = scoes_nav[parentscoid].url;
                if (update_launch_sco) {
                	launch_sco = parentscoid;
                }
                return node.parent;
            }
            return null;
        }