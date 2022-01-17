function(e) {
                    var newfilename = Y.one('#fm-rename-input').get('value');
                    if (!newfilename) {
                        return;
                    }

                    var action = '';
                    var params = {};
                    if (fileinfo.type == 'folder') {
                        params['filepath']   = fileinfo.filepath;
                        params['filename']   = '.';
                        params['newdirname'] = newfilename;
                        action = 'renamedir';
                    } else {
                        params['filepath']   = fileinfo.filepath;
                        params['filename']   = fileinfo.fullname;
                        params['newfilename'] = newfilename;
                        action = 'rename';
                    }
                    scope.request({
                        action: action,
                        scope: scope,
                        params: params,
                        callback: function(id, obj, args) {
                            if (obj == false) {
                                alert(M.str.repository.fileexists);
                            } else {
                                scope.refresh(obj.filepath);
                                if (typeof M.core_formchangechecker != 'undefined') {
                                    M.core_formchangechecker.set_form_changed();
                                }
                            }
                            Y.one('#fm-rename-input').set('value', '');
                            scope.rename_dialog.hide();
                        }
                    });
                }