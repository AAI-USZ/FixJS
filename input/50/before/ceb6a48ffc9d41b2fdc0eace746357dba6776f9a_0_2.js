function () {
        console.log('client connected %s:%d', adb.sock.remoteAddress, adb.sock.remotePort);

        callback(adb);
    }