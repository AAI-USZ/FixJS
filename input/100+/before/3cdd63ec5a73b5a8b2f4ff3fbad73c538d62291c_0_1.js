function handleProxy(ws, vncSocket) {
    vncSocket.on('begin', function() {
        Logging.Debug('Connected to target');
    });
    
    vncSocket.on('data', function(data) {
        ws.send(new Buffer(data).toString('base64'));
    });
    
    vncSocket.on('end', function() {
        Logging.Warn('Target disconnected');
    });
    
    ws.on('message', function(msg) {
        vncSocket.write(new Buffer(msg, 'base64').toString('binary'), 'binary');
    });
    
    ws.on('close', function(code, reason) {
        Logging.Warn('WebSocket client disconnected: ' + code + ' [' + reason + ']');
    });
    
    ws.on('error', function(e) {
        Logging.Error('WebSocket client error: ' + e);
    });
}