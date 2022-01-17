function runWorker () {
    process.on('uncaughtException', function (err) {
        log.error('uncaughtException:', err.message);
        log.error(err.stack);
        process.exit(1);
    });

    var port = process.env.KS_PORT;
    log.info("Worker PID " + process.pid + " starting on port " + port);
    var server = new ks_server.Server(server_conf);
    server.listen(port);
}