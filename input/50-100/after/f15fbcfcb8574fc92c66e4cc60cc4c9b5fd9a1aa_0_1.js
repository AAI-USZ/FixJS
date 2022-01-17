function argsCheck(expected, actual, fname, message) {
        if (expected !== actual) {
            throw new FunctionError('NumArgsError', expected, actual, fname, message);
        }
    }