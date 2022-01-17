function wrapThrow(parseFunction) {
            return function () {
                try {
                    return parseFunction.apply(null, arguments);
                } catch (e) {
                    extra.errors.push(e);
                }
            }
        }