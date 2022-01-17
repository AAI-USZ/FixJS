function(args, redraw) {
            var api = this.api + '?action='+args.action;
            var params = {};
            var scope = this;
            if (args['scope']) {
                scope = args['scope'];
            }
            params['sesskey'] = M.cfg.sesskey;
            params['client_id'] = this.client_id;
            params['filepath'] = this.currentpath;
            params['itemid'] = this.options.itemid?this.options.itemid:0;
            if (args['params']) {
                for (i in args['params']) {
                    params[i] = args['params'][i];
                }
            }
            var cfg = {
                method: 'POST',
                on: {
                    complete: function(id,o,p) {
                        if (!o) {
                            alert('IO FATAL');
                            return;
                        }
                        var data = null;
                        try {
                            data = Y.JSON.parse(o.responseText);
                        } catch(e) {
                            // TODO display error
                            scope.print_msg(M.str.repository.invalidjson, 'error');
                            //scope.display_error(M.str.repository.invalidjson+'<pre>'+stripHTML(o.responseText)+'</pre>', 'invalidjson')
                            return;
                        }
                        if (data && data.tree && scope.set_current_tree) {
                            scope.set_current_tree(data.tree);
                        }
                        args.callback(id,data,p);
                    }
                },
                arguments: {
                    scope: scope
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'MoodleFileManager/3.0'
                },
                data: build_querystring(params)
            };
            if (args.form) {
                cfg.form = args.form;
            }
            Y.io(api, cfg);
            if (redraw) {
                this.wait();
            }
        }