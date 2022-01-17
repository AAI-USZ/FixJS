function (err) {
        log.error('uncaughtException:', err.message);
        log.error(err.stack);
        //performExit();
    }