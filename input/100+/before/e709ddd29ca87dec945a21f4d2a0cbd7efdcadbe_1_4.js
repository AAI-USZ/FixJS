function(e){
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
            }