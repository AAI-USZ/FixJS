function(options) {
            this.options = options;
            if (options.mainfile) {
                this.enablemainfile = options.mainfile;
            }
            this.client_id = options.client_id;
            this.currentpath = '/';
            this.maxfiles = options.maxfiles;
            this.maxbytes = options.maxbytes;
            this.emptycallback = null; // Used by drag and drop upload

            this.filepicker_options = options.filepicker?options.filepicker:{};
            this.filepicker_options.client_id = this.client_id;
            this.filepicker_options.context = options.context;
            this.filepicker_options.maxfiles = this.maxfiles;
            this.filepicker_options.maxbytes = this.maxbytes;
            this.filepicker_options.env = 'filemanager';
            this.filepicker_options.itemid = options.itemid;

            if (options.filecount) {
                this.filecount = options.filecount;
            } else {
                this.filecount = 0;
            }
            // prepare filemanager for drag-and-drop upload
            this.filemanager = Y.one('#filemanager-'+options.client_id);
            if (this.filemanager.hasClass('filemanager-container') || !this.filemanager.one('.filemanager-container')) {
                this.dndcontainer = this.filemanager;
            } else  {
                this.dndcontainer = this.filemanager.one('.filemanager-container');
                if (!this.dndcontainer.get('id')) {
                    this.dndcontainer.generateID();
                }
            }
            // save template for one path element and location of path bar
            if (this.filemanager.one('.fp-path-folder')) {
                this.pathnode = this.filemanager.one('.fp-path-folder');
                this.pathbar = this.pathnode.get('parentNode');
                this.pathbar.removeChild(this.pathnode);
            }
            // initialize 'select file' panel
            var fpselectnode = Y.Node.create(M.form_filemanager.templates.fileselectlayout);
            this.filemanager.appendChild(fpselectnode);
            this.selectui = new Y.Panel({
                srcNode      : fpselectnode,
                zIndex       : 600000,
                centered     : true,
                modal        : true,
                close        : true,
                render       : true
            });
            this.selectui.hide();
            this.setup_select_file();
            // setup buttons onclick events
            this.setup_buttons();
            // display files
            this.viewmode = 1; // TODO take from cookies?
            this.filemanager.all('.fp-vb-icons,.fp-vb-tree,.fp-vb-details').removeClass('checked')
            this.filemanager.all('.fp-vb-icons').addClass('checked')
            this.refresh(this.currentpath); // MDL-31113 get latest list from server
        }