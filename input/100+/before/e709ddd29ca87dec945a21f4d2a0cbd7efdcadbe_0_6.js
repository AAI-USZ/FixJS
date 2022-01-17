function remove(type, ev, obj) {
                var dialog_options = {};
                var params = {};
                dialog_options.message = M.str.repository.confirmdeletefile;
                dialog_options.scope = this;
                var filename = '';
                var filepath = '';
                if (fileinfo.type == 'folder') {
                    params.filename = '.';
                    params.filepath = fileinfo.filepath;
                } else {
                    params.filename = fileinfo.fullname;
                }
                dialog_options.callbackargs = [params];
                dialog_options.callback = function(params) {
                    this.request({
                        action: 'delete',
                        scope: this,
                        params: params,
                        callback: function(id, obj, args) {
                            scope.filecount--;
                            scope.refresh(obj.filepath);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    });
                };
                M.util.show_confirm_dialog(ev, dialog_options);
            }