function () {
        log.info('Starting up service on port ' + this.options.port);
        this.app.listen(this.options.port);
    }