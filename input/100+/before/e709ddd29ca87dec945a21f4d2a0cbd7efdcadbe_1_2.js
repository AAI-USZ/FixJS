function(id, obj, args) {
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