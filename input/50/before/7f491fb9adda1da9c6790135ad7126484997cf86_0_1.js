function () {
                        logIf(3, "Passive data event: end", conn);
                        // remove pointer
                        conn.dataSocket = null;
                        if (socket.readable) socket.resume(); // just in case
                    }