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
            this.filemanager = Y.one('#filemanager-'+options.client_id);
            if (this.filemanager.hasClass('filemanager-container') || !this.filemanager.one('.filemanager-container')) {
                this.dndcontainer = this.filemanager;
            } else  {
                this.dndcontainer = this.filemanager.one('.filemanager-container');
                if (!this.dndcontainer.get('id')) {
                    this.dndcontainer.generateID();
                }
            }
            this.setup_buttons();
            this.refresh(this.currentpath); // MDL-31113 get latest list from server
        }