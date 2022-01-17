function(query, callback) {
            var api = 'http://search.twitter.com/search.json?q=';

            Y.io(api + query, {
                on: {
                    success: function (id, e) {
                        var json = JSON.parse(e.responseText);
                        callback(json);
                    },
                    failure: function () {
                        Y.log('Failed to call Twitter', 'error', NAME);
                        callback({});
                    }
                }
            });
        }