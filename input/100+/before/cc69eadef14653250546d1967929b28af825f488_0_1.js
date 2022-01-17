function(endpoint, action, parameters, success, error) {
    this.sign(endpoint, action, parameters, new Date().toISOString());
    var body = querystring.stringify(parameters);
    var options = {
        host: this.host,
        path: endpoint,
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        method: 'POST'
    };
    var req = https.request(options, function(res) {
        var reply = '';
        res.on('data', function(d) {
            reply += d;
        });
        res.on('error', function(err) {
            error(err);
        });
        res.on('end', function() {
            var parser = new xml2js.Parser();
            parser.parseString(reply, function(err, r) {
                if(res.statusCode==400 || res.statusCode==401 || res.statusCode == 403 || res.statusCode == 404 || res.statusCode == 500 || res.statusCode == 503) {
                    error(r);
                } else {
                    success(r);
                }
            });
        });
    });
    req.setTimeout(2000, function() {
        req.abort();
    });
    req.write(body);
    req.end();
}