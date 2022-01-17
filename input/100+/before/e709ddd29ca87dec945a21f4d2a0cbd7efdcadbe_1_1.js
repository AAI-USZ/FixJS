function(node, level) {
            var dynload = this.active_repo.dynload;
            // prepare file name with icon
            var el = Y.Node.create('<div/>').setContent(M.core_filepicker.templates.listfilename);
            el.one('.fp-filename').setContent(node.shorttitle ? node.shorttitle : node.title);
            // TODO add tooltip with node.title or node.thumbnail_title
            if (node.icon && !node.children) {
                el.one('.fp-icon').appendChild(Y.Node.create('<img/>').set('src', node.icon));
                if (node.realicon) {
                    this.lazyloading[el.one('.fp-icon img').generateID()] = node.realicon;
                }
            }
            // create node
            var tmpNode = new YAHOO.widget.HTMLNode(el.getContent(), level, false);
            if (node.dynamicLoadComplete) {
                tmpNode.dynamicLoadComplete = true;
            }
            tmpNode.fileinfo = node;
            tmpNode.isLeaf = node.children ? false : true;
            if (!tmpNode.isLeaf) {
                if(node.expanded) {
                    tmpNode.expand();
                }
                if (dynload) {
                    tmpNode.scope = this;
                }
                tmpNode.path = node.path ? node.path : '';
                for(var c in node.children) {
                    this.build_tree(node.children[c], tmpNode);
                }
            }
        }