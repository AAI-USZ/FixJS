function (depBasename) {
                    var deps = [];

                    if (_inProgressStack.indexOf(depBasename) === -1) {
                        deps.push(depBasename);
                    } else {
                        // error - circular dependency
                    }

                    resolve(deps);
                }