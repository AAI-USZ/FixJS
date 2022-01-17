function(id, obj, args) {
                    var list = obj.list;
                    var scope = args.scope;
                    // check that user did not leave the view mode before recieving this response
                    if (!(scope.viewmode == 2 && node && node.getChildrenEl())) {
                        return;
                    }
                    if (cb != null) { // (in manual mode do not update current path)
                        scope.options = obj;
                    }
                    node.highlight(false);
                    node.origlist = obj.list?obj.list:null;
                    node.origpath = obj.path?obj.path:null;
                    node.children = [];
                    for(k in list) {
                        if (list[k].type == 'folder' && retrieved_children[list[k].filepath]) {
                            // if this child is a folder and has already been retrieved
                            node.children[node.children.length] = retrieved_children[list[k].filepath];
                        } else {
                            // append new file to the list
                            scope.view_files([list[k]]);
                        }
                    }
                    if (cb == null) {
                        node.refresh();
                    } else {
                        // invoke callback requested by TreeView component
                        cb();
                    }
                    //scope.content_scrolled();
                }