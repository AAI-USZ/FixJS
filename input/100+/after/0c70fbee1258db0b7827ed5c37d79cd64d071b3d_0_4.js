function writeBuf(wbuf, upto) {
                                if (writeError) return;

                                conn.fs.write(fd, buf, 0, upto, null, function (err) {
                                    if (err) {
                                        writeError = true;
                                        dataSocket.removeListener('data', dataHandler);
                                        conn.fs.close(fd, function (err) {
                                            logIf(0, "Error closing file following write error", err);
                                        });
                                        socket.write("426 Connection closed; transfer aborted\r\n");
                                    }
                                });
                            }