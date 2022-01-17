function() {
        // End the websocket connection
        ws.close();
        Logging.Warn('VNC Target disconnected');
    }