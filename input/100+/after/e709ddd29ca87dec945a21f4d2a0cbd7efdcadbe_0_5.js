function(e) {
                e.preventDefault();
                var dialog_options = {};
                var params = {};
                dialog_options.message = M.str.repository.confirmdeletefile;
                dialog_options.scope = this;
                if (this.selectui.fileinfo.type == 'folder') {
                    params.filename = '.';
                    params.filepath = this.selectui.fileinfo.filepath;
                } else {
                    params.filename = this.selectui.fileinfo.fullname;
                }
                dialog_options.callbackargs = [params];
                dialog_options.callback = function(params) {
                    //selectnode.addClass('loading');
                    this.request({
                        action: 'delete',
                        scope: this,
                        params: params,
                        callback: function(id, obj, args) {
                            //args.scope.selectui.hide();
                            args.scope.filecount--;
                            args.scope.refresh(obj.filepath);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    });
                };
                this.selectui.hide(); // TODO remove this after confirm dialog is replaced with YUI3
                M.util.show_confirm_dialog(e, dialog_options);
            }