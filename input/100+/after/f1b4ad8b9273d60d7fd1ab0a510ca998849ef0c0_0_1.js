function (context, moduleName, url) {
        var contents, err;

        //Indicate a the module is in process of loading.
        context.scriptCount += 1;

        if (fs.existsSync(url)) {
            contents = fs.readFileSync(url, 'utf8');

            contents = req.makeNodeWrapper(contents);
            try {
                vm.runInThisContext(contents, fs.realpathSync(url));
            } catch (e) {
                err = new Error('Evaluating ' + url + ' as module "' +
                                moduleName + '" failed with error: ' + e);
                err.originalError = e;
                err.moduleName = moduleName;
                err.fileName = url;
                return req.onError(err);
            }
        } else {
            def(moduleName, function () {
                try {
                    return (context.config.nodeRequire || req.nodeRequire)(moduleName);
                } catch (e) {
                    err = new Error('Calling node\'s require("' +
                                        moduleName + '") failed with error: ' + e);
                    err.originalError = e;
                    err.moduleName = moduleName;
                    return req.onError(err);
                }
            });
        }

        //Support anonymous modules.
        context.completeLoad(moduleName);

        return undefined;
    }