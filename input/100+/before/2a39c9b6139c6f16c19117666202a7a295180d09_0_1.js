function() {
                        var method = controller.methods[methodName][0];
                        var bodyArgs = 0;
                        for(var i = 0; i < method.args.length;i++) {
                            var arg = method.args[i];
                            if (arg.transport == 'BODY')
                                bodyArgs++;
                        }
                        
                        self[controllerName][methodName] = function(args,callback) {
                            var url = baseUrl+method.url;
                            var data = null;
                            
                            //@TODO: Validate body against model and generate Model's from schema
                            var bodyType = null;
                        
                            if (typeof args == 'function') {
                                callback = args;
                                args = null;
                            } else if ($.type(args) == 'array') {
                                args = $.extend(true,[],args);
                            } else if ($.type(args) == 'object') {
                                args = $.extend(true,{},args);
                            }

                            if (method.args) {

                                if (method.args.length == 1 && method.args[0].transport == 'BODY') {
                                     if ($.type(args) == 'array') {
                                        data = $.extend(true,[],args);
                                    } else if ($.type(args) == 'object') {
                                        data = $.extend(true,{},args);
                                    } else {
                                        data = args;
                                    }
                                    args = {};
                                    bodyType = method.args[0].type;
                                } else {
                                    for(var i = 0; i < method.args.length;i++) {
                                        var arg = method.args[i];
                                        var value = args != null ? args[arg.name] : undefined;
                                        if (args && args[arg.name]) {
                                            args[arg.name] = null;
                                        }
                                        
                                        if (arg.required && (typeof value == "undefined")) {
                                            throw "Required argument missing: "+arg.name;
                                        }
                                    
                                        if (typeof value == "undefined")
                                            continue;

                                        switch(arg.transport) {
                                            case 'GET':
                                                url += (url.indexOf('?') > -1) ? "&" : "?";
                                                url += arg.name + "=" + encodeURIComponent(value);
                                                break;
                                            case 'BODY':
                                                if (bodyArgs > 1) {
                                                    if (!data) {
                                                        data = {};
                                                    }
                                                    data[arg.name] = value;
                                                } else {
                                                    data = value;
                                                }
                                                
                                                bodyType = arg.type;
                                                break;
                                        }

                                        if (arg.type == 'enum' && arg['enum'].indexOf(value) == -1) {
                                            throw "Invalid value for enum argument: "+arg.name+" = "+value
                                            +"\nMust be one of "+arg['enum'].join(', ');
                                        }
                                    }
                                }
                            }
                            
                            for(var key in args) {
                                if (!args[key]) continue;
                                url += (url.indexOf('?') > -1) ? "&" : "?";
                                url += key + "=" + encodeURIComponent(args[key]);
                            }
                        
                            if (data) {
                                data = JSON.stringify(data);
                            }

                            return $.ajax({
                                url:url,
                                type:method.method,
                                dataType:'json',
                                contentType:'application/json',
                                data:data,
                                success:function(out) {
                                    if (callback)
                                        callback(true,out);
                                },
                                error:function(out) {
                                    if (callback)
                                        callback(false);
                                }
                            });
                        };
                    }