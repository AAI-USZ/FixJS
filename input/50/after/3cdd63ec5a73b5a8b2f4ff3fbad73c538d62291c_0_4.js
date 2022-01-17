function(code, reason) {
        // End the connection
        vncSocket.end();
        Logging.Warn('WebSocket client disconnected: ' + code + ' [' + reason + ']');
    }