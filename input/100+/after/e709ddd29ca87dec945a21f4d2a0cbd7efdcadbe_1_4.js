function(appenditems) {
            this.viewmode = 3;
            var list = (appenditems != null) ? appenditems : this.filelist;
            if (!appenditems && (!this.filelist || this.filelist.length==0) && !this.active_repo.hasmorepages) {
                this.display_error(M.str.repository.nofilesavailable, 'nofilesavailable');
                return;
            }
            var element_template = Y.Node.create(M.core_filepicker.templates.listfilename);
            var options = {
                viewmode : this.viewmode,
                appendonly : (appenditems != null),
                filenode : element_template,
                callbackcontext : this,
                sortable : !this.active_repo.hasmorepages,
                callback : function(e, node) {
                    e.preventDefault();
                    if (node.children) {
                        if (this.active_repo.dynload) {
                            this.list({'path':node.path});
                        } else {
                            this.filepath = node.path;
                            this.filelist = node.children;
                            this.view_files();
                        }
                    } else {
                        this.select_file(node);
                    }
                }
            };
            this.fpnode.one('.fp-content').fp_display_filelist(options, list, this.lazyloading);
        }