function(event, next) {
        clearTimeout(runner);
        next();
    }