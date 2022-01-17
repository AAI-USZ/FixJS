function (err) {
        statsd.increment('kumascript.master_exceptions');
        log.error('uncaughtException:', err.message);
        log.error(err.stack);
        performExit();
    }