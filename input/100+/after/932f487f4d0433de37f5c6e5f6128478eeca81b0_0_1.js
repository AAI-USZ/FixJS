function(method, uri, callback, postData, options) {

            var o;
            if (o = this.getConnectionObject(uri, options, postData)) {
                o.options = options;
                var r = o.conn;
                
                try {
                    if(o.status.isError){ throw o.status.error };
                    
                    A.activeRequests++;
                    r.open(method.toUpperCase(), uri, options.async, options.userId, options.password);
                   
                    ('onreadystatechange' in r) && 
                        (r.onreadystatechange = this.onStateChange.createDelegate(this, [o, callback, 'readystate'], 0));
                    
                    ('onload' in r) &&
                        (r.onload = this.onStateChange.createDelegate(this, [o, callback, 'load', 4], 0));
                        
                    ('onprogress' in r) &&
                        (r.onprogress = this.onStateChange.createDelegate(this, [o, callback, 'progress'], 0));
                        
                    //IE8/other? evolving timeout callback support
	                // if(callback && callback.timeout){
                        // ('timeout' in r) && (r.timeout = callback.timeout);
                        // ('ontimeout' in r) && 
                           // (r.ontimeout = this.abort.createDelegate(this, [o, callback, true], 0));
                        // ('ontimeout' in r) ||
                           // //Timers for syncro calls won't work here, as it's a blocking call
                           // (options.async && (this.timeout[o.tId] = window.setInterval(
                                // function() {A.abort(o, callback, true);
                            // }, callback.timeout)));
                    // }
                    
                    if (this.useDefaultXhrHeader && !options.xdomain) {
	                    this.defaultHeaders['X-Requested-With'] ||
	                        this.initHeader('X-Requested-With', this.defaultXhrHeader, true);
	                }
	                this.setHeaders(o);
	                
	                if (!this.events
                            || this.fireEvent('beforesend', o, method, uri,
                                    callback, postData, options) !== false) {
                        r.send(postData || null);
                    }
                } catch (exr) {
                    o.status.isError = true;
                    o.status.error = exr;
                }
                if(o.status.isError ) {
                    return Ext.apply(o, this.handleTransactionResponse(o, callback));
                }
                options.async || this.onStateChange(o, callback, 'load'); 
                return o;
            }
        }