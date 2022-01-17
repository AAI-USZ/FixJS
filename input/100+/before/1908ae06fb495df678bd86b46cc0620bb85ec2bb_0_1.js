function(appendfiles) {
            this.filemanager.removeClass('fm-updating').removeClass('fm-noitems');
            if ((appendfiles == null) && (!this.options.list || this.options.list.length == 0)) {
                this.filemanager.addClass('fm-noitems');
                return;
            }
            var list = (appendfiles != null) ? appendfiles : this.options.list;
            var element_template;
            if (this.viewmode == 2 || this.viewmode == 3) {
                element_template = Y.Node.create(M.form_filemanager.templates.listfilename);
            } else {
                this.viewmode = 1;
                element_template = Y.Node.create(M.form_filemanager.templates.iconfilename);
            }
            var options = {
                viewmode : this.viewmode,
                appendonly : appendfiles != null,
                filenode : element_template,
                callbackcontext : this,
                callback : function(e, node) {
                    if (e.preventDefault) { e.preventDefault(); }
                    if (node.type == 'folder') {
                        this.refresh(node.filepath);
                    } else {
                        this.select_file(node);
                    }
                },
                rightclickcallback : function(e, node) {
                    if (e.preventDefault) { e.preventDefault(); }
                    this.select_file(node);
                },
                classnamecallback : function(node) {
                    var classname = '';
                    if (node.type == 'folder' || (!node.type && !node.filename)) {
                        classname = classname + ' fp-folder';
                    }
                    if (node.filename || node.filepath || (node.path && node.path != '/')) {
                        classname = classname + ' fp-hascontextmenu';
                    }
                    if (node.sortorder == 1) { classname = classname + ' fp-mainfile';}
                    return Y.Lang.trim(classname);
                }
            };
            if (this.viewmode == 2) {
                options.dynload = true;
                options.filepath = this.options.path;
                options.treeview_dynload = this.treeview_dynload;
                options.norootrightclick = true;
                options.callback = function(e, node) {
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
                        this.currentpath = node.filepath;
                        this.print_path();
                        //this.content_scrolled();
                    }
                };
            }
            if (!this.lazyloading) {this.lazyloading={};}
            this.filemanager.one('.fp-content').fp_display_filelist(options, list, this.lazyloading);
        }