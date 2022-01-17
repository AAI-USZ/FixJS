function (deps, cb, er) {
                        deps.rjsSkipMap = true;
                        return context.require(deps, cb, er);
                    }