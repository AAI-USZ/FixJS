function buildRoute(name, route) {

        var i,
            verbObj,
            path,
            matches,
            build,
            segment,
            key;

        if (!route.name) {
            route.name = name;
        }
        if (!route.verbs) {
            route.verbs = ['GET'];
        }

        // Checking route.verbs is changed from an array to an object by the
        // building process, so routes that have already been computed are
        // not recomputed.

        if (route.verbs.length && route.path && route.call) {
            // FUTURE: [Issue 73] allow object params, not just string
            if (!route.params) {
                route.params = '';
            }
            if (!route.regex) {
                route.regex = {};
            }
            if (!route.query) {
                route.query = {};
            }

            /*
             * Here we convert the verb array to a map for easy use later on
             **/
            verbObj = {};
            for (i in route.verbs) {
                if (route.verbs.hasOwnProperty(i)) {
                    verbObj[route.verbs[i].toUpperCase()] = true;
                }
            }
            route.verbs = verbObj;

            path = route.path.split('/');

            /*
             * Here we build the matching regex for external URI's
             */
            for (segment in path) {
                if (path.hasOwnProperty(segment)) {
                    if (path[segment][0] === ':') {
                        key = path[segment].substr(1);
                        route.query[key] = '';
                        path[segment] = route.regex[key] ?
                                '(' + route.regex[key] + ')' :
                                '([^\/]+)';
                    }

                    if (path[segment][0] === '*') {
                        path[segment] = '(.*)';
                    }
                }
            }

            /*
             * Here we build the matching regex for internal URI's
             */
            route.requires = {};
            matches = route.path.match(/:([^\/]+)/g);
            for (i in matches) {
                if (matches.hasOwnProperty(i)) {
                    route.requires[matches[i].substr(1)] = '[^&]+';
                }
            }
            for (i in route.regex) {
                if (route.regex.hasOwnProperty(i)) {
                    route.requires[i] = route.regex[i];
                }
            }

            route.params = Y.QueryString.parse(route.params);

            build = [];
            for (i in route.requires) {
                if (route.requires.hasOwnProperty(i)) {
                    build.push(i + '=' + route.requires[i]);
                }
            }
            build.sort();

            /*
             * We are done so lets store the regex's for the route.
             */
            // TODO: [Issue 74] These Regexes are recreated on
            // every request because they need to be serialized and sent to the
            // client, need to figure out a way to prevent that
            route.ext_match = '^' + path.join('\/') + '$';
            route.int_match = '^' + build.join('&') + '$';
        }

        return route;
    }