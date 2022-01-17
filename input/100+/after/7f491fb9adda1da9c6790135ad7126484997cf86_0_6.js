function(pasvconn) {
                    // This will be called once data has ACTUALLY written out ... socket.write() is async!
                    var success = function() {
                        socket.write("226 Transfer OK\r\n");
                        pasvconn.end();
                    };
                    // Use temporary filesystem path maker since a path might be sent with NLST
                    var temp = '';
                    if (commandArg) {
                        // Remove double slashes or "up directory"
                        commandArg = commandArg.replace(/\/{2,}|\.{2}/g, '');
                        if (commandArg.substr(0, 1) == '/') {
                            temp = commandArg;
                        } else {
                            temp = withCwd(conn.cwd, commandArg);
                        }
                    } else temp = conn.cwd;
                    logIf(3, "Sending file list", conn);
                    
                    glob.glob(temp, conn.fs, function(err, files) {
                        if (err) {
                            logIf(0, "During NLST, error globbing files: " + err, conn);
                            socket.write("451 Read error\r\n");
                            pasvconn.end();
                            return;
                        }
                        // Wait until acknowledged!
                        socket.write("150 Here comes the directory listing\r\n", function() {
                            logIf(3, "Directory has " + files.length + " files", conn);
                            pasvconn.write( files.map(PathModule.basename).join("\015\012") + "\015\012", success);
                        });
                    });
                }