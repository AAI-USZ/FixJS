function(id, o, args) {
                        scope.hide();
                        // editor needs to update url
                        // filemanager do nothing
                        if (scope.options.editor_target && scope.options.env == 'editor') {
                            scope.options.editor_target.value = data.existingfile.url;
                            scope.options.editor_target.onchange();
                        } else if (scope.options.env === 'filepicker') {
                            var fileinfo = {'client_id':scope.options.client_id,
                                    'url':data.existingfile.url,
                                    'file':data.existingfile.filename};
                            scope.options.formcallback.apply(scope, [fileinfo]);
                        }
                    }