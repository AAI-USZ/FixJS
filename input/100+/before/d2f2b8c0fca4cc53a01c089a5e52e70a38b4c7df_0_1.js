function(success, age) {
        if (success)
            return true;
        if (age < maxAge) {
            var d = $.Deferred();
            window.setTimeout(function() {
                lthis._acquireLock(path)
                    .done(function() { d.resolve.apply(d, arguments); })
                    .fail(function() { d.reject.apply(d, arguments); });
            }, retryTime);
            return d.promise();
        } else {
            logger.showDebug("Forcibly removed lock on " + path);
            return lthis._fs.releaseLock(lthis._path + '/' + path + '.lock').pipe(function() {
                return lthis._acquireLock(path);
            });
        }
    }