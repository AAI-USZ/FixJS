function (psocket) {
                    logIf(1, "Passive data event: connect", conn);
                    if (socket.readable) socket.resume();

                    // Once we have a completed data connection, make note of it
                    conn.dataSocket = psocket;
                    psocket.buffers = [];

                    if (conn.secure) {
                        logIf(1, "Upgrading passive connection to TLS");
                        starttls.starttls(psocket, options.tlsOptions, function (err, cleartext) {
                            if (err) {
                                logIf(0, "Error upgraing passive connection to TLS:" + util.inspect(err));
                                psocket.end();
                            }
                            else if (! cleartext.authorized) {
                                if (options.allowUnauthorizedTls) {
                                    logIf(0, "Allowing unauthorized passive connection (allowUnauthorizedTls==true)");
                                    switchToSecure();
                                }
                                else {
                                    logIf(0, "Closing unauthorized passive connection (allowUnauthorizedTls==false)");
                                    socket.end();
                                }
                            }
                            else {
                                switchToSecure();
                            }

                            function switchToSecure() {
                                logIf(1, "Secure passive connection started");
                                psocket = cleartext;
                                setupPassiveServer();
                            }
                        });
                    }
                    else {
                        setupPassiveListener();
                    }

                    function setupPassiveListener() {
                        psocket.on("data", function(data) {
                            // should watch out for malicious users uploading large amounts of data outside protocol
                            logIf(3, 'Data event: received ' + (Buffer.isBuffer(data) ? 'buffer' : 'string'), conn);
                            psocket.buffers.push(data);
                        });
                        psocket.on("end", function () {
                            logIf(3, "Passive data event: end", conn);
                            // remove pointer
                            conn.dataSocket = null;
                            if (socket.readable) socket.resume(); // just in case
                        });
                        psocket.addListener("error", function(err) {
                            logIf(0, "Passive data event: error: " + err, conn);
                            conn.dataSocket = null;
                            if (socket.readable) socket.resume();
                        });
                        psocket.addListener("close", function(had_error) {
                            logIf(
                                (had_error ? 0 : 3),
                                "Passive data event: close " + (had_error ? " due to error" : ""),
                                socket
                            );
                            if (socket.readable) socket.resume();
                        });
                    }
                }