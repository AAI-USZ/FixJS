function(e) {
                e.preventDefault();
                var params = {};
                var fileinfo = this.selectui.fileinfo;
                params['filepath'] = fileinfo.filepath;
                params['filename'] = fileinfo.fullname;
                selectnode.addClass('loading');
                this.request({
                    action: 'unzip',
                    scope: this,
                    params: params,
                    callback: function(id, obj, args) {
                        args.scope.selectui.hide();
                        args.scope.refresh(obj.filepath);
                    }
                });
            }