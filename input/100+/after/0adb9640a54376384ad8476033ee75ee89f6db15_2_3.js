function templateLoaded (templateFuncSync) {
            var templateFuncAsync = function (data, callback) {
                var context = createContext(this, data);
                var text = templateFuncSync.call(context._this, context);
                context._done = _.map(context._done, function (done) {
                    return function (text, callback) {
                        done(text, function (text) {
                            callback(null, text);
                        });
                    }
                });
                context._done.unshift(function (callback) {
                    callback(null, text);
                });
                async.waterfall(context._done, function (err, text) {
                    callback(text);
                });
            };

            callback(templateFuncAsync);
        }