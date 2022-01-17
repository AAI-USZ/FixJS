function(data, meta, client, viewId, callback) {
        // If we get some JSON decode it
        if (meta.http.headers['content-type'] &&
                meta.http.headers['content-type'][0].indexOf(
                    'application/json'
                ) === 0) {
            data = Y.JSON.parse(data);
        }

        callback(null, data, meta);

        if (meta && meta.binders) {
            // DOM needs to render and return to main event loop before
            // attaching.
            window.setTimeout(function() {
                client.attachBinders(meta.binders, viewId, meta.view.id);
            });
        }
    }