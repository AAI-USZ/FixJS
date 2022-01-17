function() {
        var req = null;
        
        function urlid(url) {
            return url + (url[url.length - 1] == '?' ? '&' : '?') + (new Date()).getTime();
        }
        
        if (zebra.isIE && window.XDomainRequest) {
            req = new XDomainRequest();
            req.read = function(url) {
                var responseText = null, finished = false;
                function completed() {
                    if (req.status === undefined || req.status == 200) responseText = req.responseText;
                    finished = true;
                };
                
                this.onload  = function() { completed(); }
                this.onerror = function() { completed(); }
                this.open('GET', urlid(url));
                this.send(null);
                
                while (!finished) {
                    var r = new XMLHttpRequest();
                    r.open('GET', urlid(window.location), false);
                    r.send(null);
                }
                if (responseText == null) throw new Error("Path not found: '" + url + "'");
                return responseText;
            }
        }
        else {
            req = new XMLHttpRequest();
            req.read = function(url) {
                var b = ('responseType' in this);
                this.open('GET', urlid(url), false);
                if (this.overrideMimeType) this.overrideMimeType('text/plain; charset=x-user-defined');
                this.send(null);
                if (this.status != 200) throw new Error("Path not found: '" + url + "', status = " + this.status);
                return b ? this.response : this.responseText;
            }
        }
        return req;
    }