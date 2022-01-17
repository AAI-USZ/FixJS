function(base, action, routeParams, verb, urlParams) {
            var url,
                query = base + '.' + action;

            routeParams = objectToQueryStr(routeParams);

            if (routeParams && routeParams.length) {
                query = query + '?' + routeParams;
            }

            url = this.getRouteMaker().make(query, verb);

            if (urlParams) {
                urlParams = objectToQueryStr(urlParams, true);

                if (urlParams && urlParams.length) {
                    url = url + '?' + urlParams;
                }
            }

            // IOS PATCH
            if (typeof window !== 'undefined') {
                url = Y.mojito.util.iOSUrl(url);
            }

            // this is mainly used by html5app
            if (this.appConfig.pathToRoot) {
                url = this.appConfig.pathToRoot + url;
            }

            return url;
        }