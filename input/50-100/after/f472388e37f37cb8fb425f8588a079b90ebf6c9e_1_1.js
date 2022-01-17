function(node) {
                var selector = node.attr('bx-tmpl-source'),
                    id= _stamp(node,'tmpl_'),
                    temptmplNode = tmplNode.one(selector).clone(true);
                temptmplNode.removeAttr('id');
                temptmplNode.insertBefore(node);
                node.remove();
                temptmplNode.attr('id',id);
            }