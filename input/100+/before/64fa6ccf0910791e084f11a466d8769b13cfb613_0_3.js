function download(path) {
            var req = pkg.getRequest(), b = ('responseType' in req);
            req.open('GET', path + (path[path.length - 1] == '?' ? '&' : '?') + (new Date()).getTime(), false);
            req.overrideMimeType('text/plain; charset=x-user-defined');
            req.send(null);
            if (req.status != 200) throw new Error("Path not found: '" + path + "'");
            return b ? req.response : req.responseText;
        }