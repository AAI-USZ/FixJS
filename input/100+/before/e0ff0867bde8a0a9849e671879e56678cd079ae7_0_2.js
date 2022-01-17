function(e, node) {
                    // TODO MDL-32736 e is not an event here but an object with properties 'event' and 'node'
                    if (!node.fullname) {return;}
                    if (node.type != 'folder') {
                        if (e.node.parent && e.node.parent.origpath) {
                            // set the current path
                            this.options.path = e.node.parent.origpath;
                            this.options.list = e.node.parent.origlist;
                            this.print_path();
                        }
                        this.currentpath = node.filepath;
                        this.select_file(node);
                    } else {
                        // save current path and filelist (in case we want to jump to other viewmode)
                        this.options.path = e.node.origpath;
                        this.options.list = e.node.origlist;
                        this.currentpath = e.node.path;
                        this.print_path();
                        //this.content_scrolled();
                    }
                }