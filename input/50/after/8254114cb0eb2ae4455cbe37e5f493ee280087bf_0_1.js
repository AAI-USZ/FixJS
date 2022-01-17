function switchToSecure() {
                                logIf(1, "Secure connection started");
                                conn.socket = cleartext;
                                socket = cleartext;
                                socket.addListener('data', dataListener);
                                conn.secure = true;
                            }