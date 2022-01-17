function(params) {
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
                }