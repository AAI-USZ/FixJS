function(name, options, blobs, done) {
    var task = this._registry.task(name);

    // Task parameters determine how blobs are processed
    switch (task.length) {
        case 2: // Add blobs to queue
            if (options === undefined) {
                options = [];
            } else {
                if (!Array.isArray(options)) {
                    options = [options];
                }
            }

            async.map(options, task.bind(this), function(err, results) {
                done(err, blobs.concat(results));
            });
            break;

        case 3:
            if (task.type === 'collect') { // Task can look at all blobs at once
                task.call(this, options, blobs, done);
            } else if (task.type === 'slice') { // Select up to options.length blobs
                async.map(blobs.slice(0, Array.isArray(options) ? options.length : 1), task.bind(this, options), done);
            } else { // Transform blob on a per task basis
                async.map(blobs, task.bind(this, options), done);
            }
            break;

        case 4: // Reduce blobs operating on a per task basis
            async.reduce(blobs, new Blob(), task.bind(this, options), function(err, results) {
                done(err, [results]);
            });
            break;
    }
}