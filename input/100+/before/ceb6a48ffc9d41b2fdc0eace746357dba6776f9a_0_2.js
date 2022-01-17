function (callback) {
    var adb = this;

    adb.sock = net.connect({ port: DebugBridge.DEFAULT_PORT }, function () {
        console.log('client connected %s:%d', adb.sock.remoteAddress, adb.sock.remotePort);

        callback(adb);
    });

    adb.sock.setNoDelay(true);
    adb.sock.on('end', function () {
        console.log('client disconnected');

        adb.sock.end();
    });
    adb.sock.on('timeout', function () {
        console.log('client timeout');
    });
    adb.sock.on('error', function (err) {
        if ('ECONNREFUSED' == err.errno) {
            console.log('client connect refused, restarting adb daemon...');

            DebugBridge.start_server(function (code) {
                console.log('start adb daemon: %d', code);

                if (code == 0) {
                    adb.connect(callback);
                }
            });
        } else {
            console.error('client caught exception: ' + err);
        }
    });
}