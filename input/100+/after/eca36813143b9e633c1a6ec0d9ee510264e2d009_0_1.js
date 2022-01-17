function(params, defer) {

        var parsedUrl = url.parse(params.url, true),
            needBuildBody = params.method === 'POST' || params.method === 'PUT',
            data = querystring.stringify(utils.merge(parsedUrl.query, params.data));

        this._doHttp(
            {
                method   : params.method,
                headers  : utils.merge(
                    params.headers,
                    needBuildBody?
                    {
                        'Content-Type'   : 'application/x-www-form-urlencoded',
                        'Content-length' : Buffer.byteLength(data)
                    } :
                    null),
                hostname : parsedUrl.hostname,
                port     : parsedUrl.port,
                path     : parsedUrl.pathname + (!needBuildBody && data? '?' + data : ''),
                auth     : params.auth
            },
            defer,
            params.dataType,
            needBuildBody? data : null,
            params.maxRedirects || 5);

    }