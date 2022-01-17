function(e) {
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