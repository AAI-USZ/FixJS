function(node) {
                var selector = node.attr('bx-tmpl-source');
                var temptmplNode = tmplNode.one(selector).clone(true);
                temptmplNode.removeAttr('id');
                _stamp(temptmplNode, 'tmpl_');
                temptmplNode.insertBefore(node);
                node.remove();
            }