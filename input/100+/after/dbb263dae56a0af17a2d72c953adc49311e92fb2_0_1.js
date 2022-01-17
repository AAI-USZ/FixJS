function whenDataWritable(callback) {
            if (conn.passive) {
                // how many data connections are allowed?
                // should still be listening since we created a server, right?
                if (conn.dataSocket) {
                    logIf(3, "A data connection exists", conn);
                    callback(conn.dataSocket);
                } else {
                    logIf(3, "Currently no data connection; expecting client to connect to pasv server shortly...", conn);
                    conn.passive.once('ready', function () {
                        logIf(3, "...client has connected now");
                        callback(conn.dataSocket);
                    });
                }
            } else {
                // Do we need to open the data connection?
                if (conn.dataSocket) { // There really shouldn't be an existing connection
                    logIf(3, "Using existing non-passive dataSocket", conn);
                    callback(conn.dataSocket);
                } else {
                    // This branch of the conditional used to contain code for reopening the passive connection.
                    // Currently removed because it needs to be updated to handle TLS, and I'm not sure how
                    // to trigger this branch in testing as of yet. (Maybe it's not even necessary?)
                    logIf(3, "No passive connection");
                    socket.write("425 Can't open data connection (not in passive mode)\r\n");
                }
            }
        }