function(id, o, args) {
                            if (scope.options.editor_target&&scope.options.env=='editor') {
                                scope.options.editor_target.value=o.url;
                                scope.options.editor_target.onchange();
                            }
                            scope.hide();
                            o.client_id = client_id;
                            var formcallback_scope = null;
                            if (args.scope.options.magicscope) {
                                formcallback_scope = args.scope.options.magicscope;
                            } else {
                                formcallback_scope = args.scope;
                            }
                            scope.options.formcallback.apply(formcallback_scope, [o]);
                        }