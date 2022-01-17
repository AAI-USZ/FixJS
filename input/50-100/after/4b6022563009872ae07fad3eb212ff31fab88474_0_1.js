function (depBasename) {
                    var deps = [];

                    if (_inProgressStack.indexOf(depBasename) === -1) {
                        deps.push(depBasename);
                    } else {
                        // error - circular dependency
                        throw localize.translate("EXCEPTION_EXTENSION_CIRCULAR_DEPENDENCY", extBasename);
                    }

                    resolve(deps);
                }