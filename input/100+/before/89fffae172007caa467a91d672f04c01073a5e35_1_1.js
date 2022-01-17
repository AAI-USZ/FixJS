function(req, res, next) {
            var command = {instance: {}},
                context = req.context,
                routes = store.getRoutes(context),
                routeMaker = new RouteMakerClass(routes),
                query = liburl.parse(req.url, true).query,
                appConfig = store.getAppConfig(context, 'definition'),
                url,
                routeMatch;

            url = req.url.replace(RX_END_SLASHES, '/');
            routeMatch = self.getRoute(req.method, url, routeMaker);

            // TODO: [Issue 93] Check to see that there is not
            // already a command attached to req

            // TODO: [Issue 94] LOSE query string routing
            if (!routeMatch && appConfig.allowQueryStringRouting) {
//                logger.log('[UriRouter] matching URL query string...');
                routeMatch = {
                    call: [
                        (query['mojit-base']),
                        (query['mojit-action'] || 'index')
                    ]
                };
                // there is no default mojit id to execute, so if there is no
                // mojit id within the url, it makes sense to null the route,
                // resulting in a 404
                if (!routeMatch.call[0]) {
                    routeMatch = null;
                }
            }

            // at this point if we haven't found a route, get out
            if (!routeMatch) {
//                logger.log('[UriRouter] Match fail');
                return next();
            }

            if (routeMatch.call[0][0] === '@') {
                // If the route starts with an "@" it is a "type"
                command.instance.type = routeMatch.call[0].slice(1);
            } else {
                // Otherwise it is "instance"
                command.instance.base = routeMatch.call[0];
            }

            command.action = routeMatch.call[1];
            // TODO: [Issue 95] attach action to command instead
            // of instance
            // command.action = routeMatch.call[1];
            command.context = req.context;
            command.params = {
                route: simpleMerge(routeMatch.query,
                    qs.parse(routeMatch.param)),
                url: query || {},
                body: req.body || {},
                file: {} // FUTURE: add multi-part file data here
            };

            // logger.log('Attaching command: ' +
            //     JSON.stringify(command, null, 2), 'debug', 'uri-router');

            // attach the command to the route for the Mojito handler to process
            req.command = command;
            next();
        }