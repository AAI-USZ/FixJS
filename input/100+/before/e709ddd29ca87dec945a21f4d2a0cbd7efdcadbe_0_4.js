function setmainfile(type, ev, obj) {
                var file = obj[node.get('id')];
                //Y.one(mainid).set('value', file.filepath+file.filename);
                var params = {};
                params['filepath']   = file.filepath;
                params['filename']   = file.filename;
                this.request({
                    action: 'setmainfile',
                    scope: scope,
                    params: params,
                    callback: function(id, obj, args) {
                        scope.refresh(scope.currentpath);
                    }
                });
            }