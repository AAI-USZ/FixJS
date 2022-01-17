function(id, obj, args) {
                                var filepath = obj.filepath;
                                scope.mkdir_dialog.hide();
                                scope.refresh(filepath);
                                Y.one('#fm-newname').set('value', '');
                                if (typeof M.core_formchangechecker != 'undefined') {
                                    M.core_formchangechecker.set_form_changed();
                                }
                            }