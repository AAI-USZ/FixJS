function(id,o,p) {
                        if (!o) {
                            // TODO
                            alert('IO FATAL');
                            return;
                        }
                        var data = null;
                        try {
                            data = Y.JSON.parse(o.responseText);
                        } catch(e) {
                            scope.print_msg(M.str.repository.invalidjson, 'error');
                            scope.display_error(M.str.repository.invalidjson+'<pre>'+stripHTML(o.responseText)+'</pre>', 'invalidjson')
                            return;
                        }
                        // error checking
                        if (data && data.error) {
                            scope.print_msg(data.error, 'error');
                            if (args.onerror) {
                                args.onerror(id,data,p);
                            } else {
                                this.fpnode.one('.fp-content').setContent('');
                            }
                            return;
                        } else if (data && data.event) {
                            switch (data.event) {
                                case 'fileexists':
                                    scope.process_existing_file(data);
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            if (data.msg) {
                                scope.print_msg(data.msg, 'info');
                            }
                            // cache result if applicable
                            if (args.action != 'upload' && data.allowcaching) {
                                scope.cached_responses[params] = data;
                            }
                            // invoke callback
                            args.callback(id,data,p);
                        }
                    }