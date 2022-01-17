function() {
        try {
            Midway.throwACustomError();
        } catch (ex) {
            ok(ex instanceof Errors.CustomError)
        }
    }