function(url, verb) {

            // Remove http://some.domain.com/ stuff
            if (url.indexOf('http://') === 0) {
                url = url.slice(url.indexOf('/', 7));
            }

            // Remove an query params given
            if (url.indexOf('?') > 0) {
                url = url.slice(0, url.indexOf('?'));
            }

            return this.getRouteMaker().find(url, verb);
        }