function publishJSFiles(
    options,
    details,
    packageMap,
    deps,
    test,
    cb
) {
    var publishdir = path.join(options.dstFolder, details.name),
        publishJsStream = path.join(
            publishdir,
            details.name + (test ? '.test.js' : '.js')
        ),
        stream = fs.createWriteStream(publishJsStream),
        dependencies = [ ];
    if (deps) {
        Object.keys(deps).forEach(function (d) {
            if (d !== details.name) {
                dependencies.push(d);
            }
        });
    }

    // possible post processing of the underlying stream
    stream.on('close', function () {
        cb(null);
    });

    // process all the js files
    async.forEach(details.js, function (f, cb) {
        publishJSFile(
            details.name,
            details.dirname,
            f,
            dependencies,
            stream,
            options.minify,
            test,
            cb
        );
    }, function (err) {
        if (err) {
            return cb(err);
        }
        stream.write(jqtpl.tmpl('headerTemplate', {
            modulename: details.name,
            dependencies: dependencies,
            modulepath: '/' + details.name + '/' + getMainModulePath(details)
        }));
        stream.end();
    });
}