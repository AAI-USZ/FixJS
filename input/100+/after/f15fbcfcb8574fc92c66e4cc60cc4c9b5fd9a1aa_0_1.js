function typeCheck(expected, actual, fname, message) {
        if (expected !== actual) {
            throw new FunctionError('TypeError', expected, actual, fname, message);
        }
    }