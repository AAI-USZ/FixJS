function (buf) {
                        if (erroredOut)
                            return;

                        dataSocket.removeListener('data', dataHandler);
                        
                        // If we kept it all in the slurp buffer, finally write it out.
                        if (slurpBuf) {
                            logIf(0, "Writing out file from slurp buffer");
                            conn.fs.write(fd, slurpBuf, 0, totalBytes, null, function (err) {
                                if (err) {
                                    logIf(0, "Error writing slurp buffer to file following 'end' message", err);
                                    socket.write("426 Connection closed; transfer aborted\r\n");
                                    return;
                                }
                                
                                onceOnDisk();
                            });
                        }
                        else {
                            onceOnDisk();
                        }
                        
                        function onceOnDisk() {
                            conn.fs.close(fd, function (err) {
                                if (err) {
                                    logIf(0, "Error closing file following 'end' message", err);
                                    socket.write("426 Connection closed; transfer aborted\r\n");
                                    return;
                                }
                                
                                socket.write("226 Closing data connection\r\n");
                            });
                        }
                    }