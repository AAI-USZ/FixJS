function () {
        console.log('client connected %s:%d', sock.remoteAddress, sock.remotePort);

        callback(new DebugSession(adb, sock));
    }