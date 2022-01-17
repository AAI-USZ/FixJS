function() {
                    if (timeout) { 
                       clearTimeout(timeout);
                    }
                    if (opts.type) {
                       if (opts.type.toLowerCase() != 'auto') {
                          return cb(returnType(opts.type, body),null,res);
                       }
                    }
                    cb(body,null,res);
                }