function (callback) {
    var body;
    var cache = [];
    var complete;
    var counter;
    var i;
    var next;
    var options;
    var source;
    var sources = loadSources(DB_SOURCES);

    counter = sources.length;

    if (!sources) {
        callback('couldn\'t load source file ' + DB_SOURCES, null);
        return;
    }

    next = function () {
        --counter;
        if (counter === 0) {
            complete();
        }
    };

    complete = function (err) {
        if (err) {
            callback('error downloading image list', null);
        }
        fs.writeFileSync(DB_CACHE, JSON.stringify(cache), 'utf8');
        console.log('done');
    };

    log.info('updating local images database...');
    for (i = 0; i < sources.length; i++) {
        body = '';
        source = sources[i];
        options = url.parse(sources[i]);

        // SmartOS DNS is disabled by default
        dns.resolve4(options.hostname, function (err, addresses) {
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
        });
    }
}