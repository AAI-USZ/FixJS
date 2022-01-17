function(req, res) {
        // matching a route
        var route = router.match(req.url);

        // if a route is matched, executing the reponse function
        if (route) {
            try {
                if (req.method == 'POST') {
                    // Converting query string to objects
                    var buffer = '';

                    req.on('data', function(chunk) {
                        buffer += chunk.toString();
                    });

                    req.on('end', function() {
                        var body = qsObjects(buffer);

                        // merging body inside req
                        req = pd.extend(Object.create(req), { body: body });

                        route.fn(req, res, route.params, route.splats);
                    });
                } else {
                    route.fn(req, res, route.params, route.splats);
                }

            } catch (e) {
                // If something wrong happens, shoot the error stack.
                if (process.env['ENVIRONMENT'] == 'DEV') {
                    // TODOTB: Maybe make some kind of custom page for errors.
                    routil.sendHtml(res, '<pre>' + e.stack + '</pre>');
                } else {
                    routil.errorPage(req, res, 500);
                }
            }
        } else {
            routil.errorPage(req, res, 404);
        }
    }