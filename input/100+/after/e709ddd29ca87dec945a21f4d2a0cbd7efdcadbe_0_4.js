function(tree) {
            var appendfilepaths = function(list, node) {
                if (!node || !node.children || !node.children.length) {return;}
                for (var i in node.children) {
                    list[list.length] = node.children[i].filepath;
                    appendfilepaths(list, node.children[i]);
                }
            }
            var list = ['/'];
            appendfilepaths(list, tree);
            var selectnode = this.filemanager.one('.fp-select');
            node = selectnode.one('.fp-path select');
            node.setContent('');
            for (var i in list) {
                node.appendChild(Y.Node.create('<option/>').
                    set('value', list[i]).setContent(list[i]))
            }
        }