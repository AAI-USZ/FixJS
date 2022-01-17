function(id, o, args) {
                            if (o.event == 'fileexists') {
                                scope.create_upload_form(data);
                                scope.process_existing_file(o);
                                return;
                            }
                            if (scope.options.editor_target&&scope.options.env=='editor') {
                                scope.options.editor_target.value=o.url;
                                scope.options.editor_target.onchange();
                            }
                            scope.hide();
                            o.client_id = client_id;
                            var formcallback_scope = args.scope.options.magicscope ? args.scope.options.magicscope : args.scope;
                            scope.options.formcallback.apply(formcallback_scope, [o]);
                        }