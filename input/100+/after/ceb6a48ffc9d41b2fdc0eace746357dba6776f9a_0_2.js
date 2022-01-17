function (callback /* (session: DebugSession) */) {
    var adb = this;

    var sock = net.connect({ port: DebugBridge.DEFAULT_PORT }, function () {
        console.log('client connected %s:%d', sock.remoteAddress, sock.remotePort);

        callback(new DebugSession(adb, sock));
    });

    sock.setNoDelay(true);
    sock.on('end', function () {
        console.log('client disconnected');

        sock.end();
    });
    sock.on('timeout', function () {
        console.log('client timeout');
    });
    sock.on('error', function (err) {
        if ('ECONNREFUSED' == err.errno) {
            console.log('client connect refused, restarting adb daemon...');

            if (this.autoStartDaemon) {
                DebugBridge.start_server(function (code) {
                    console.log('start adb daemon: %d', code);

                    if (code == 0) {
                        adb.connect(callback);
                    }
                });

                return;
            }
        } else {
            console.error('client caught exception: ' + err);
        }

        throw err;
    });
}