function(node, update_launch_sco) {
            if (node.previousSibling && node.previousSibling.children.length &&
                    typeof scoes_nav[launch_sco].prevscoid != 'undefined') {
                var node = scorm_lastchild(node.previousSibling);
                if (node) {
                	var prevscoid = scoes_nav[launch_sco].prevscoid;
                    node.title = scoes_nav[prevscoid].url;
                    if (update_launch_sco) {
                    	launch_sco = prevscoid;
                    }
                    return node;
                } else {
                    return null;
                }
            }
            return scorm_skipprev(node, update_launch_sco);
        }