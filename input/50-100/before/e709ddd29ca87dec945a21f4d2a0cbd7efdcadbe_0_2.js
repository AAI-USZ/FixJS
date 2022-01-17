function unzip(type, ev, obj) {
                var params = {};
                params['filepath'] = fileinfo.filepath;
                params['filename'] = fileinfo.fullname;
                this.request({
                    action: 'unzip',
                    scope: scope,
                    params: params,
                    callback: function(id, obj, args) {
                        scope.refresh(obj.filepath);
                    }
                });
            }