function () {
        console.log('client disconnected');

        adb.sock.end();
    }