function (results) {
                callback.call(this, results).then(hitch(p, "callback"), hitch(p, "errback"));
            }