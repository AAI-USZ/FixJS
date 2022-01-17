function (err, addresses) {
            var client;

            if (err) {
                callback('could not resolve host: ' + options.hostname);
                return;
            }

            options.host = addresses[0];
            delete (options.hostname); // XXX

            client = httpClient(options);

            console.log('Get %s...', source);

            client.get(options, function (res) {

                res.on('data', function (chunk) {
                    body += chunk.toString();
                });

                res.on('end', function () {
                    var imgdb = JSON.parse(body);
                    for (var d = 0; d < imgdb.length; d++) {
                        // set url property so relpaths work later
                        imgdb[d]['_url'] = source;
                        cache.push(imgdb[d]);
                    }

                    next();
                });
            });
        }