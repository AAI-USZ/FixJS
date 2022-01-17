function(id,o,p) {
                        if (!o) {
                            alert('IO FATAL');
                            return;
                        }
                        var data = Y.JSON.parse(o.responseText);
                        args.callback(id,data,p);
                    }