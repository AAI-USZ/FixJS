function(msg) {
        // Send data to VNC
        vncSocket.write(new Buffer(msg, 'base64').toString('binary'), 'binary');
    }