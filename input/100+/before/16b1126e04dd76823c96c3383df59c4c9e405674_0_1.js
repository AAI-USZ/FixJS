function (err,result) {
            result = result.data.expand[0];
            if (result.error) {
                callback(url, true);
            } else {
                if (result.long_url.match(/^https?\:\/\//)) {
                    // Expansion is correct
                    exports.save_url(url, urllib.parse(result.long_url));
                    callback(urllib.parse(result.long_url));
                } else {
                    // Expansion is wrong
                    exports.save_url(url, url);
                    callback(url);
                }

            }
        }