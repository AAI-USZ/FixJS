function(err) {
                        logIf(0, "Passive data event: error: " + err, conn);
                        conn.dataSocket = null;
                        if (socket.readable) socket.resume();
                    }