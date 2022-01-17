function (err, cleartext) {
                            if (err) {
                                logIf(0, "Error upgrading connection to TLS: " + util.inspect(err));
                                socket.end();
                            }
                            else if (! cleartext.authorized) {
                                logIf(0, "Secure socket not authorized: " + util.inspect(cleartext.authorizationError));
                                socket.end();
                            }
                            else {
                                logIf(0, "Secure connection started");
                                conn.socket = cleartext;
                                socket = cleartext;
                                socket.addListener('data', dataListener);
                                conn.secure = true;
                            }
                        }