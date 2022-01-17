function(id, obj, args) {
                        args.scope.selectui.hide();
                        if (obj == false) {
                            alert(M.str.repository.fileexists); // TODO!
                        } else {
                            args.scope.refresh(obj.filepath);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    }