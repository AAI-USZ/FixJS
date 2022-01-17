function(node, cb) {
            var scope = node.scope;
            var client_id = scope.options.client_id;
            var repository_id = scope.active_repo.id;
            var retrieved_children = {};
            if (node.children) {
                for (var i in node.children) {
                    retrieved_children[node.children[i].path] = node.children[i];
                }
            }
            scope.request({
                action:'list',
                client_id: client_id,
                repository_id: repository_id,
                path:node.path?node.path:'',
                page:node.page?args.page:'',
                callback: function(id, obj, args) {
                    var list = obj.list;
                    // check that user did not leave the view mode before recieving this response
                    if (!(scope.active_repo.id == obj.repo_id && scope.viewmode == 2 && node && node.getChildrenEl())) {
                        return;
                    }
                    if (cb != null) { // (in manual mode do not update current path)
                        scope.viewbar_set_enabled(true);
                        scope.parse_repository_options(obj);
                        node.highlight(false);
                    }
                    node.origlist = obj.list?obj.list:null;
                    node.origpath = obj.path?obj.path:null;
                    node.children = [];
                    for(k in list) {
                        if (list[k].children && retrieved_children[list[k].path]) {
                            // if this child is a folder and has already been retrieved
                            node.children[node.children.length] = retrieved_children[list[k].path];
                        } else {
                            scope.build_tree(list[k], node);
                        }
                    }
                    if (cb == null) {
                        node.refresh();
                    } else {
                        // invoke callback requested by TreeView
                        cb();
                    }
                    scope.content_scrolled();
                }
            }, false);
        }