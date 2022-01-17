function(e) {
                e.preventDefault();
                var params = {};
                var fileinfo = this.selectui.fileinfo;
                params['filepath']   = fileinfo.filepath;
                params['filename']   = '.';
                selectnode.addClass('loading');
                this.request({
                    action: 'zip',
                    scope: this,
                    params: params,
                    callback: function(id, obj, args) {
                        args.scope.selectui.hide();
                        args.scope.refresh(obj.filepath);
                    }
                });
            }