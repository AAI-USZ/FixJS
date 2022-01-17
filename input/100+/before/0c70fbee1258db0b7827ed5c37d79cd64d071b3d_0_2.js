function dataHandler (buf) {
                        conn.fs.write(fd, buf, 0, buf.length, null, function (err) {
                            if (err) {
                                dataSocket.removeListener('data', dataHandler);
                                conn.fs.close(fd, function (err) {
                                    logIf(0, "Error closing file following write error", err);
                                });
                                socket.write("426 Connection closed; transfer aborted\r\n");
                            }
                        });
                    }