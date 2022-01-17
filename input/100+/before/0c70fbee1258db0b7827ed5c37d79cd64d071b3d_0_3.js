function (buf) {
                        dataSocket.removeListener('data', dataHandler);
                        if (! erroredOut) {
                            conn.fs.close(fd, function (err) {
                                if (err) {
                                    logIf(0, "Error closing file following 'end' message", err);
                                    socket.write("426 Connection closed; transger aborted\r\n");
                                    return;
                                }

                                socket.write("226 Closing data connection\r\n");
                            });
                        }
                    }