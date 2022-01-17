function(data) {
            var scope = this;
            var handleOverwrite = function(e) {
                // overwrite
                e.preventDefault();
                var data = this.process_dlg.dialogdata;
                var params = {}
                params['existingfilename'] = data.existingfile.filename;
                params['existingfilepath'] = data.existingfile.filepath;
                params['newfilename'] = data.newfile.filename;
                params['newfilepath'] = data.newfile.filepath;
                this.hide_header();
                this.request({
                    'params': params,
                    'scope': this,
                    'action':'overwrite',
                    'path': '',
                    'client_id': this.options.client_id,
                    'repository_id': this.active_repo.id,
                    'callback': function(id, o, args) {
                        scope.hide();
                        // editor needs to update url
                        // filemanager do nothing
                        if (scope.options.editor_target && scope.options.env == 'editor') {
                            scope.options.editor_target.value = data.existingfile.url;
                            scope.options.editor_target.onchange();
                        } else if (scope.options.env === 'filepicker') {
                            var fileinfo = {'client_id':scope.options.client_id,
                                    'url':data.existingfile.url,
                                    'file':data.existingfile.filename};
                            var formcallback_scope = scope.options.magicscope ? scope.options.magicscope : scope;
                            scope.options.formcallback.apply(formcallback_scope, [fileinfo]);
                        }
                    }
                }, true);
            }
            var handleRename = function(e) {
                // inserts file with the new name
                e.preventDefault();
                var scope = this;
                var data = this.process_dlg.dialogdata;
                if (scope.options.editor_target && scope.options.env == 'editor') {
                    scope.options.editor_target.value = data.newfile.url;
                    scope.options.editor_target.onchange();
                }
                scope.hide();
                var formcallback_scope = scope.options.magicscope ? scope.options.magicscope : scope;
                var fileinfo = {'client_id':scope.options.client_id,
                                'url':data.newfile.url,
                                'file':data.newfile.filename};
                scope.options.formcallback.apply(formcallback_scope, [fileinfo]);
            }
            var handleCancel = function(e) {
                // Delete tmp file
                e.preventDefault();
                var params = {};
                params['newfilename'] = this.process_dlg.dialogdata.newfile.filename;
                params['newfilepath'] = this.process_dlg.dialogdata.newfile.filepath;
                this.request({
                    'params': params,
                    'scope': this,
                    'action':'deletetmpfile',
                    'path': '',
                    'client_id': this.options.client_id,
                    'repository_id': this.active_repo.id,
                    'callback': function(id, o, args) {
                        // let it be in background, from user point of view nothing is happenning
                    }
                }, false);
                this.process_dlg.hide();
                this.selectui.hide();
            }
            if (!this.process_dlg) {
                this.process_dlg_node = Y.Node.create(M.core_filepicker.templates.processexistingfile);
                var node = this.process_dlg_node;
                node.generateID();
                Y.one(document.body).appendChild(node);
                this.process_dlg = new Y.Panel({
                    srcNode      : node,
                    headerContent: M.str.repository.fileexistsdialogheader,
                    zIndex       : 800000,
                    centered     : true,
                    modal        : true,
                    visible      : false,
                    render       : true,
                    buttons      : {}
                });
                this.process_dlg.plug(Y.Plugin.Drag,{handles:['#'+node.get('id')+' .yui3-widget-hd']});
                node.one('.fp-dlg-butoverwrite').on('click', handleOverwrite, this);
                node.one('.fp-dlg-butrename').on('click', handleRename, this);
                node.one('.fp-dlg-butcancel').on('click', handleCancel, this);
                if (this.options.env == 'editor') {
                    node.one('.fp-dlg-text').setContent(M.str.repository.fileexistsdialog_editor);
                } else {
                    node.one('.fp-dlg-text').setContent(M.str.repository.fileexistsdialog_filemanager);
                }
            }
            this.selectnode.removeClass('loading');
            this.process_dlg.dialogdata = data;
            this.process_dlg_node.one('.fp-dlg-butrename').setContent(M.util.get_string('renameto', 'repository', data.newfile.filename));
            this.process_dlg.show();
        }