function whenDataWritable(callback) {
            if (conn.passive) {
                // how many data connections are allowed?
                // should still be listening since we created a server, right?
                if (conn.dataSocket) {
                    logIf(3, "A data connection exists", conn);
                    if (callback) callback(conn.dataSocket); // do!
                } else {
                    logIf(3, "Passive, but no data socket exists ... weird", conn);
                    socket.write("425 Can't open data connection\r\n");
                }
            } else {
                // Do we need to open the data connection?
                if (conn.dataSocket) { // There really shouldn't be an existing connection
                    logIf(3, "Using existing non-passive dataSocket", conn);
                    callback(conn.dataSocket);
                } else {
                    logIf(1, "Opening data connection to " + conn.dataHost + ":" + conn.dataPort, conn);
                    var dataSocket = new net.Socket();
                    dataSocket.buffers = [];
                    // Since data may arrive once the connection is made, buffer it
                    dataSocket.on("data", function(data) {
                        logIf(3, dataSocket.remoteAddress + ' event: data ; ' + (Buffer.isBuffer(data) ? 'buffer' : 'string'));
                        dataSocket.buffers.push(data);
                    });
                    dataSocket.addListener("connect", function() {
                        conn.dataSocket = dataSocket;
                        logIf(3, "Data connection succeeded", conn);
                        callback(dataSocket);
                    });
                    dataSocket.addListener("close", function (hadError) {
                        conn.dataSocket = null;
                        if (hadError)
                            logIf(0, "Data event: close due to error", conn);
                        else
                            logIf(3, "Data event: close", conn);
                    });
                    dataSocket.addListener("end", function() {
                        logIf(3, "Data event: end", conn);
                    });
                    dataSocket.addListener("error", function(err) {
                        logIf(0, "Data event: error: " + err, conn);
                        dataSocket.destroy();
                    });
                    dataSocket.connect(conn.dataPort, conn.dataHost);
                }
            }
        }