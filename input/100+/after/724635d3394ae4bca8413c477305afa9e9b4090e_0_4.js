function(node, update_launch_sco) {
            if (node === false) {
                return scorm_tree_node.getRoot().children[0];
            }
            if (node.children.length && typeof scoes_nav[launch_sco].nextscoid != 'undefined') {
            	var node = node.children[0];
                var nextscoid = scoes_nav[launch_sco].nextscoid;
                node.title = scoes_nav[nextscoid].url;
                if (update_launch_sco) {
                	launch_sco = nextscoid;
                }
                return node;
            }
            return scorm_skipnext(node, update_launch_sco);
        }