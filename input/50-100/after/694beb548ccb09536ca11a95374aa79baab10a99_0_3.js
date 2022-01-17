function(id, obj, args) {
                        if (obj == false) {
                            selectnode.removeClass('loading');
                            args.scope.print_msg(M.str.repository.fileexists, 'error');
                        } else {
                            args.scope.selectui.hide();
                            args.scope.refresh(obj.filepath);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    }