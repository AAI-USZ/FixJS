function (error) {
    var self = this;
    if (error) {
        logger.fatal('The server has encountered an error: ' + error.stack);
    }

    logger.info('Shutting down...');
    var clients = this.socket.sockets.clients();

    for (var i = clients.length; i--;) {
        clients[i].disconnect();
    }

    this.httpServer.close(function () {
        logger.info('The server has been shut down');
        logger.destroy();
    });
}