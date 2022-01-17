function(id, obj, args) {
                        selectnode.removeClass('loading');
                        if (scope.options.editor_target && scope.options.env=='editor') {
                            scope.options.editor_target.value=obj.url;
                            scope.options.editor_target.onchange();
                        }
                        scope.hide();
                        obj.client_id = client_id;
                        var formcallback_scope = args.scope.options.magicscope ? args.scope.options.magicscope : args.scope;
                        scope.options.formcallback.apply(formcallback_scope, [obj]);
                    }