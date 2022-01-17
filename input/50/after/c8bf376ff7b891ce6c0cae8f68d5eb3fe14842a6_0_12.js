function() {
        try {
            Application.throwACustomError();
        } catch (ex) {
            ok(ex instanceof Errors.CustomError)
        }
    }