function connectTarget(host, port, callback) {
    try {
        var vncSocket = net.createConnection(port, host);
        Logging.Info('Client connected to VNC server on ' + host + ':' + port);
        Logging.Info('Start proxying from ' + serverOptions.host + ':' + serverOptions.port + ' to ' + host + ':' + port + "\n");
        callback(vncSocket);
    } catch (e) {
        Logging.Error('Could not create connection to VNC: ' + e.message);
    }
}