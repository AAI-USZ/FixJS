function (error) {
    var self = this;
    if (error) {
        logger.fatal('The server has encountered an error: ' + error.stack);
    }

    try {
        var clients = this.socket.sockets.clients();

        for (var i = clients.length; i--;) {
            clients[i].disconnect();
        }

        this.httpServer.close(function () {
            logger.info('The server has been shut down');
            logger.destroy();
        });
        logger.info('Shutting down...');
    } catch (ex) {
        process.exit();
    }
}