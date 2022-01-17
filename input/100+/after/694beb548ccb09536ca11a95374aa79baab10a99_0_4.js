function(e) {
                    e.preventDefault();
                    var scope = this;
                    // a function used to perform an ajax request
                    var perform_action = function(e) {
                        e.preventDefault();
                        var foldername = Y.one('#fm-newname-'+scope.client_id).get('value');
                        if (!foldername) {
                            scope.mkdir_dialog.hide();
                            return;
                        }
                        scope.request({
                            action:'mkdir',
                            params: {filepath:scope.currentpath, newdirname:foldername},
                            callback: function(id, obj, args) {
                                var filepath = obj.filepath;
                                scope.mkdir_dialog.hide();
                                scope.refresh(filepath);
                                Y.one('#fm-newname-'+scope.client_id).set('value', '');
                                if (typeof M.core_formchangechecker != 'undefined') {
                                    M.core_formchangechecker.set_form_changed();
                                }
                            }
                        });
                    }
                    if (!this.mkdir_dialog) {
                        var node = Y.Node.create(M.form_filemanager.templates.mkdir);
                        this.filemanager.appendChild(node);
                        this.mkdir_dialog = new Y.Panel({
                            srcNode      : node,
                            zIndex       : 800000,
                            centered     : true,
                            modal        : true,
                            visible      : false,
                            render       : true
                        });
                        node.one('.fp-dlg-butcreate').on('click', perform_action, this);
                        node.one('input').set('id', 'fm-newname-'+this.client_id).
                            on('keydown', function(e){
                                if (e.keyCode == 13) {Y.bind(perform_action, this)(e);}
                            }, this);
                        node.all('.fp-dlg-butcancel').on('click', function(e){e.preventDefault();this.mkdir_dialog.hide();}, this);
                        node.all('.fp-dlg-curpath').set('id', 'fm-curpath-'+this.client_id);
                    }
                    this.mkdir_dialog.show();
                    Y.one('#fm-newname-'+scope.client_id).focus();
                    Y.all('#fm-curpath-'+scope.client_id).setContent(this.currentpath)
                }