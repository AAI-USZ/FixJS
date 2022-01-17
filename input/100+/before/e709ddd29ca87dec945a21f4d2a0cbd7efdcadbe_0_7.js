function(id, obj, args) {
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