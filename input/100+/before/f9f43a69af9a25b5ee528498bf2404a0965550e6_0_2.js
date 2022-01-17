function(params, defer) {

    var parsedUrl = url.parse(params.url, true),
        data = querystring.stringify(utils.merge(parsedUrl.query, params.data)),
        needBuildBody = params.method === 'POST' || params.method === 'PUT',
        req = http.request(
            {
                method   : params.method,
                headers  : utils.merge(
                    params.headers,
                    needBuildBody?
                        {
                            'Content-Type'   : 'application/x-www-form-urlencoded',
                            'Content-length' : data.length
                        } :
                        null),
                hostname : parsedUrl.hostname,
                port     : parsedUrl.port,
                path     : parsedUrl.path +
                    (!needBuildBody && data? '?' + data : ''),
                auth     : params.auth
            },
            function(res) {
                if(res.statusCode == 404) {
                    defer.reject({ message : 'not found', url : params.url });
                    return;
                }

                var body = '';
                res
                    .on('data', function(chunk) {
                        body += chunk;
                    })
                    .on('end', function() {
                        try {
                            defer.resolve(processResponse(body, params.dataType || 'json'));
                        }
                        catch(e) {
                            defer.reject({ message : e.message, url : params.url });
                        }
                    })
                    .on('close', function(e) {
                        defer.reject({ message : e.message, url : params.url });
                    });
            });

    needBuildBody && req.write(data);

    req
        .on('error', function(e) {
            defer.reject({ message : e.message, url : params.url });
        })
        .end();

}