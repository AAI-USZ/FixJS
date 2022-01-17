function() {
                    if (portRangeErrorHandler) {
                        pasv.removeListener('error', portRangeErrorHandler);
                        pasv.addListener('error', normalErrorHandler);
                    }

                    logIf(3, "Passive data connection beginning to listen", conn);

                    var port = pasv.address().port;
                    conn.passive = true;
                    conn.dataHost = host;
                    conn.dataPort = port;
                    logIf(3, "Passive data connection listening on port " + port, conn);
                    if (command == "PASV") {
                        var i1 = parseInt(port / 256);
                        var i2 = parseInt(port % 256);
                        logIf(0, "227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ") [=" + host + ":" + port + "]\r\n", conn);
                        socket.write("227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ")\r\n");
                    }
                    else if (command == "EPSV") {
                        socket.write("229 Entering Extended Passive Mode (|||" + port + "|)\r\n");
                    }
                }