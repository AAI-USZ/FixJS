function (extBasename) {
        var manifest = _extensionMap[extBasename];

        if (manifest) {
            _inProgressStack.push(extBasename);

            if (_resolvedDependencies.indexOf(extBasename) === -1) {
                _resolvedDependencies.push(extBasename);
            }

            if (manifest.dependencies && (manifest.dependencies instanceof Array) && manifest.dependencies.length > 0) {
                manifest.dependencies.forEach(function (depBasename) {
                    var deps = [];

                    if (_inProgressStack.indexOf(depBasename) === -1) {
                        deps.push(depBasename);
                    } else {
                        // error - circular dependency
                        throw localize.translate("EXCEPTION_EXTENSION_CIRCULAR_DEPENDENCY", extBasename);
                    }

                    resolve(deps);
                });
            }

            _inProgressStack.pop(extBasename);
        } else {
            // error - the dependency list contains something not found in map
            throw localize.translate("EXCEPTION_EXTENSION_NOT_FOUND", extBasename);
        }
    }