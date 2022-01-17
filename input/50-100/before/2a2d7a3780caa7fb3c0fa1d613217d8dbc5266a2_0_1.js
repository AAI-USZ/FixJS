function (err) {
        if (err) {
            return cb(err);
        }
        stream.write(jqtpl.tmpl('headerTemplate', {
            modulename: details.name,
            dependencies: dependencies,
            modulepath: '/' + details.name + '/' + getMainModulePath(details)
        }));
        stream.end();
    }