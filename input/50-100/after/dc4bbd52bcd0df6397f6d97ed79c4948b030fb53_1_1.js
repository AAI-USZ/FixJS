function(query, callback) {
            var api = 'http://search.twitter.com/search.json?callback={callback}&q=';

            Y.jsonp(api + query, {
                on: {
                    success: function (response) {
                        callback(response);
                    },
                    failure: function () {
                        Y.log('Failed to call Twitter', 'error', NAME);
                        callback({});
                    }
                }
            });
        }