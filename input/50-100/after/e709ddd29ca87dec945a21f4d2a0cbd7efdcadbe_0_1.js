function(id,o,p) {
                        if (!o) {
                            alert('IO FATAL');
                            return;
                        }
                        var data = null;
                        try {
                            data = Y.JSON.parse(o.responseText);
                        } catch(e) {
                            // TODO display error
                            //scope.print_msg(M.str.repository.invalidjson, 'error');
                            //scope.display_error(M.str.repository.invalidjson+'<pre>'+stripHTML(o.responseText)+'</pre>', 'invalidjson')
                            return;
                        }
                        if (data && data.tree && scope.set_current_tree) {
                            scope.set_current_tree(data.tree);
                        }
                        args.callback(id,data,p);
                    }