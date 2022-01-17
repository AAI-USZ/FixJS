function() {
            var qs = [], url = ((this._opts && this._opts.proto) ? this._opts.proto : Y.YQLRequest.PROTO);

            Y.each(this._params, function(v, k) {
                qs.push(k + '=' + encodeURIComponent(v));
            });

            qs = qs.join('&');
            
            url += ((this._opts && this._opts.base) ? this._opts.base : Y.YQLRequest.BASE_URL) + qs;
            
            var o = (!Y.Lang.isFunction(this._callback)) ? this._callback : { on: { success: this._callback } };

            o.on = o.on || {};

            o.on.success = Y.bind(this._internal, this);

            if (o.allowCache !== false) {
                o.allowCache = true;
            }
            Y.log('URL: ' + url, 'info', 'yql');
            
            if (!this._jsonp) {
                this._jsonp = Y.jsonp(url, o);
            } else {
                this._jsonp.url = url;
                if (o.on && o.on.success) {
                    this._jsonp._config.on.success = o.on.success;
                }
                this._jsonp.send();
            }
            return this;
        }