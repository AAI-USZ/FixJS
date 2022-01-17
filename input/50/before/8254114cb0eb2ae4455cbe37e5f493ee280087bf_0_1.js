function switchToSecure() {
                                logIf(0, "Secure connection started");
                                conn.socket = cleartext;
                                socket = cleartext;
                                socket.addListener('data', dataListener);
                                conn.secure = true;
                            }