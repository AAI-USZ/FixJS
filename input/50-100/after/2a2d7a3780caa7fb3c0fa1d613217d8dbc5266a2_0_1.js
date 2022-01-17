function (err) {
        if (err) {
            stream.destroy();
            return cb(err);
        }
        safeWrite(stream, jqtpl.tmpl('headerTemplate', {
            modulename: details.name,
            dependencies: dependencies,
            modulepath: '/' + details.name + '/' + getMainModulePath(details)
        }), true);
    }