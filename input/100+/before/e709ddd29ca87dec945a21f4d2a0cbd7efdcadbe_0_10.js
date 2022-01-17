function _move(e) {
                    if (!treeview.targetpath) {
                        return;
                    }
                    var params = {};
                    if (fileinfo.type == 'folder') {
                        action = 'movedir';
                    } else {
                        action = 'movefile';
                    }
                    params['filepath'] = fileinfo.filepath;
                    params['filename'] = fileinfo.fullname;
                    params['newfilepath'] = treeview.targetpath;
                    scope.request({
                        action: action,
                        scope: scope,
                        params: params,
                        callback: function(id, obj, args) {
                            var p = '/';
                            if (obj) {
                                p = obj.filepath;
                            }
                            dialog.cancel();
                            scope.refresh(p);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    });
                }