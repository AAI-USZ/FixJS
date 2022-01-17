function(e) {
                var client_id = this.options.client_id;
                var scope = this;
                var repository_id = this.active_repo.id;
                var title = Y.one('#newname-'+client_id).get('value');
                var filesource = Y.one('#filesource-'+client_id).get('value');
                var params = {'title':title, 'source':filesource, 'savepath': this.options.savepath};
                var license = Y.one('#select-license-'+client_id);
                if (license) {
                    params['license'] = license.get('value');
                    YAHOO.util.Cookie.set('recentlicense', license.get('value'));
                }
                var author = Y.one('#text-author-'+client_id);
                if (author){
                    params['author'] = author.get('value');
                }

                if (this.options.env == 'editor') {
                    // in editor, images are stored in '/' only
                    params.savepath = '/';
                    // when image or media button is clicked
                    if ( this.options.return_types != 1 ) {
                        var linkexternal = Y.one('#linkexternal-'+client_id).get('checked');
                        if (linkexternal) {
                            params['linkexternal'] = 'yes';
                        }
                    } else {
                        // when link button in editor clicked
                        params['linkexternal'] = 'yes';
                    }
                }

                if (this.options.env == 'url') {
                    params['linkexternal'] = 'yes';
                }

                this.wait('download', title);
                this.request({
                    action:'download',
                    client_id: client_id,
                    repository_id: repository_id,
                    'params': params,
                    onerror: function(id, obj, args) {
                        scope.view_files();
                    },
                    callback: function(id, obj, args) {
                        if (scope.options.editor_target && scope.options.env=='editor') {
                            scope.options.editor_target.value=obj.url;
                            scope.options.editor_target.onchange();
                        }
                        scope.hide();
                        obj.client_id = client_id;
                        var formcallback_scope = null;
                        if (args.scope.options.magicscope) {
                            formcallback_scope = args.scope.options.magicscope;
                        } else {
                            formcallback_scope = args.scope;
                        }
                        scope.options.formcallback.apply(formcallback_scope, [obj]);
                    }
                }, true);
            }