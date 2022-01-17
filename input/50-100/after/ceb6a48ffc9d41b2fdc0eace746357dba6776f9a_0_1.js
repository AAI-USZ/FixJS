function (err) {
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
    }