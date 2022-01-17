function(appenditems) {
            var scope = this;
            var client_id = scope.options.client_id;
            var dynload = scope.active_repo.dynload;
            var list = this.filelist;
            scope.viewmode = 2;
            if (appenditems) {
                var parentnode = scope.treeview.getRoot();
                if (scope.treeview.getHighlightedNode()) {
                    parentnode = scope.treeview.getHighlightedNode();
                    if (parentnode.isLeaf) {parentnode = parentnode.parent;}
                }
                for (var k in appenditems) {
                    scope.build_tree(appenditems[k], parentnode);
                }
                scope.treeview.draw();
                return;
            }
            if (!list || list.length==0 && (!this.filepath || !this.filepath.length)) {
                this.display_error(M.str.repository.nofilesavailable, 'nofilesavailable');
                return;
            }

            var treeviewnode = Y.Node.create('<div/>').
                setAttrs({'class':'fp-treeview', id:'treeview-'+client_id});
            this.fpnode.one('.fp-content').setContent('').appendChild(treeviewnode);

            scope.treeview = new YAHOO.widget.TreeView('treeview-'+client_id);
            if (dynload) {
                scope.treeview.setDynamicLoad(scope.treeview_dynload, 1);
            }
            scope.treeview.singleNodeHighlight = true;
            if (scope.filepath && scope.filepath.length) {
                // we just jumped from icon/details view, we need to show all parents
                // we extract as much information as possible from filepath and filelist
                // and send additional requests to retrieve siblings for parent folders
                var mytree = {};
                var mytreeel = null;
                for (var i in scope.filepath) {
                    if (mytreeel == null) {
                        mytreeel = mytree;
                    } else {
                        mytreeel.children = [{}];
                        mytreeel = mytreeel.children[0];
                    }
                    var parent = scope.filepath[i];
                    mytreeel.path = parent.path;
                    mytreeel.title = parent.name;
                    mytreeel.dynamicLoadComplete = true; // we will call it manually
                    mytreeel.expanded = true;
                }
                mytreeel.children = scope.filelist
                scope.build_tree(mytree, scope.treeview.getRoot());
                // manually call dynload for parent elements in the tree so we can load other siblings
                if (dynload) {
                    var root = scope.treeview.getRoot();
                    while (root && root.children && root.children.length) {
                        root = root.children[0];
                        if (root.path == mytreeel.path) {
                            root.origpath = scope.filepath;
                            root.origlist = scope.filelist;
                        } else if (!root.isLeaf && root.expanded) {
                            scope.treeview_dynload(root, null);
                        }
                    }
                }
            } else {
                // there is no path information, just display all elements as a list, without hierarchy
                for(k in list) {
                    scope.build_tree(list[k], scope.treeview.getRoot());
                }
            }
            scope.treeview.subscribe('clickEvent', function(e){
                e.node.highlight(false);
                if(e.node.isLeaf){
                    if (e.node.parent && e.node.parent.origpath) {
                        // set the current path
                        scope.filepath = e.node.parent.origpath;
                        scope.filelist = e.node.parent.origlist;
                        scope.print_path();
                    }
                    scope.select_file(e.node.fileinfo);
                } else {
                    // save current path and filelist (in case we want to jump to other viewmode)
                    scope.filepath = e.node.origpath;
                    scope.filelist = e.node.origlist;
                    scope.print_path();
                    scope.content_scrolled();
                }
            });
            scope.treeview.draw();
        }