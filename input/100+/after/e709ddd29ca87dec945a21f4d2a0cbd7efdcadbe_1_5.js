function(appenditems) {
            var list = (appenditems != null) ? appenditems : this.filelist;
            this.viewmode = 2;
            if (!this.filelist || this.filelist.length==0 && (!this.filepath || !this.filepath.length)) {
                this.display_error(M.str.repository.nofilesavailable, 'nofilesavailable');
                return;
            }

            var element_template = Y.Node.create(M.core_filepicker.templates.listfilename);
            var options = {
                viewmode : this.viewmode,
                appendonly : (appenditems != null),
                filenode : element_template,
                callbackcontext : this,
                callback : function(e, node) {
                    if (!node.children) {
                        if (e.node.parent && e.node.parent.origpath) {
                            // set the current path
                            this.filepath = e.node.parent.origpath;
                            this.filelist = e.node.parent.origlist;
                            this.print_path();
                        }
                        this.select_file(node);
                    } else {
                        // save current path and filelist (in case we want to jump to other viewmode)
                        this.filepath = e.node.origpath;
                        this.filelist = e.node.origlist;
                        this.print_path();
                        this.content_scrolled();
                    }
                },
                dynload : this.active_repo.dynload,
                filepath : this.filepath,
                treeview_dynload : this.treeview_dynload
            };
            this.fpnode.one('.fp-content').fp_display_filelist(options, list, this.lazyloading);
        }