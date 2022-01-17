function() {
                    if (this.timeout) { 
                       clearTimeout(this.timeout);
                    }
                    if (opts.type) {
                       if (opts.type != 'default') {
                          var parsed = returnType(opts.type, body, res);
                          return cb((parsed?parsed:"Could not parse content."),!parsed,res);
                       }
                    }
                    cb(body,null,res);
                }