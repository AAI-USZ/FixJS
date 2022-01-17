function (req, res) {
        var $this = this,
            buf = '';

        $this.statsd.increment('kumascript.POST');
        
        // TODO: Be more flexible with encodings.
        req.setEncoding('utf8');
        req.on('data', function (chunk) { buf += chunk; });
        req.on('end', function () {
            try {
                var src = buf.length ? buf : '';
                $this._evalMacros(src, req, res);
            } catch (err){
                // TODO: Handle errors more gracefully
                $this._evalMacros('', req, res);
            }
        });
    }