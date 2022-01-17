function setupPassiveListener() {
                    conn.dataSocket.buffers = [];
                    conn.passive.emit('ready');
                    
                    conn.dataSocket.on("data", function(data) {
                        // should watch out for malicious users uploading large amounts of data outside protocol
                        console.log(data.toString());
                        logIf(3, 'Passive data event: received ' + (Buffer.isBuffer(data) ? 'buffer' : 'string'), conn);
                        conn.dataSocket.buffers.push(data);
                    });
                    conn.dataSocket.on("end", function () {
                        logIf(3, "Passive data event: end", conn);
                        // remove pointer
                        conn.dataSocket = null;
                    });
                    conn.dataSocket.addListener("error", function(err) {
                        logIf(0, "Passive data event: error: " + err, conn);
                        conn.dataSocket = null;
                    });
                    conn.dataSocket.addListener("close", function(had_error) {
                        logIf(
                            (had_error ? 0 : 3),
                            "Passive data event: close " + (had_error ? " due to error" : ""),
                            socket
                        );
                    });
                }