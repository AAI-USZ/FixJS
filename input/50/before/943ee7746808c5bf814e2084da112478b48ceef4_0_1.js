function (err) {
            logIf(0, "Client connection error: " + err, socket);
            socket.destroy();
        }