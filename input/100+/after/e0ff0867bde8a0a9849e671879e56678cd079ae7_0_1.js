function(node, cb) {
            var retrieved_children = {};
            if (node.children) {
                for (var i in node.children) {
                    retrieved_children[node.children[i].path] = node.children[i];
                }
            }
            if (!node.path || node.path == '/') {
                // this is a root pseudo folder
                node.fileinfo.filepath = '/';
                node.fileinfo.type = 'folder';
                node.fileinfo.fullname = node.fileinfo.title;
                node.fileinfo.filename = '.';
            }
            this.request({
                action:'list',
                params: {filepath:node.path?node.path:''},
                scope:this,
                callback: function(id, obj, args) {
                    var list = obj.list;
                    var scope = args.scope;
                    // check that user did not leave the view mode before recieving this response
                    if (!(scope.viewmode == 2 && node && node.getChildrenEl())) {
                        return;
                    }
                    if (cb != null) { // (in manual mode do not update current path)
                        scope.options = obj;
                        scope.currentpath = node.path?node.path:'/';
                    }
                    node.highlight(false);
                    node.origlist = obj.list?obj.list:null;
                    node.origpath = obj.path?obj.path:null;
                    node.children = [];
                    for(k in list) {
                        if (list[k].type == 'folder' && retrieved_children[list[k].filepath]) {
                            // if this child is a folder and has already been retrieved
                            retrieved_children[list[k].filepath].fileinfo = list[k];
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
            }, false);
        }