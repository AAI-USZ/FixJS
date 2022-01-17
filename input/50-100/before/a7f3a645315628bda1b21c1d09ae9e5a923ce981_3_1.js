function (err) {
        log.error('uncaughtException:', err.message);
        log.error(err.stack);
        process.exit(1);
    }