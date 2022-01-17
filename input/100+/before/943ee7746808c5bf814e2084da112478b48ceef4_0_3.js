function FtpServer(host, options) {
    var self = this;

    if (false === (this instanceof FtpServer)) {
        return new FtpServer(host, options);
    }
    events.EventEmitter.call(this);

    // make sure host is an IP address, otherwise DATA connections will likely break
    this.server = net.createServer();
    this.getInitialCwd = options.getInitialCwd || function () { return "/"; };
    this.getUsernameFromUid = options.getUsernameFromUid || function (uid, c) { c(null, "ftp"); };
    this.getGroupFromGid = options.getGroupFromGid || function (gid, c) { c(null, "ftp"); }
    this.getRoot = options.getRoot || function () { return "/"; };
    this.debugging = options.logLevel || 0;

    function logIf(level, message, conn, isError) {
        if (self.debugging >= level) {
            if (conn)
                console.log((conn & conn.socket ? conn.socket.remoteAddress + ": " : "") + message);
            else
                console.log(message);

            if (isError) {
                console.trace("Trace follows");
            }
        }
    };
    function traceIf(level, message, conn) { return logIf(level, message, conn, true); }

    this.server.on("error", function (err) {
        logIf(0, "Server error: " + err);
    });
    this.server.on("listening", function() {
        logIf(0, "nodeFTPd server up and ready for connections");
    });
    this.server.on("connection", function(socket) {
        var conn = new FtpConnection({
            socket: socket,
            passive: false,
            dataHost: null,
            dataPort: 20, // default
            dataListener: null, // for incoming passive connections
            dataSocket: null, // the actual data socket
            mode: "ascii",
            filefrom: "",
            authFailures: 0, // 3 tries then we disconnect you
            temp: null,
            username: null,
            totsize: 0,
            filename: "",
            fs: null,
            path: null,
            cwd: null,
            root: null
        });

        self.emit("client:connected", conn); // pass client info so they can listen for client-specific events

        socket.setTimeout(0);
        socket.setEncoding("ascii"); // force data String not Buffer
        socket.setNoDelay();

//        logIf(0, "Base FTP directory: "+conn.fs.cwd());

        var authenticated = function() {
            // send a message if not authenticated?
            return (conn.username ? true : false);
        };

        var authFailures = function() {
            if (conn.authFailures >= 2) {
                socket.end();
                return true;
            }
            return false;
        };

        var closeDataConnections = function() {
            if (conn.dataListener) conn.dataListener.close(); // we're creating a new listener
            if (conn.dataSocket) conn.dataSocket.end(); // close any existing connections
        };

        // Purpose of this is to ensure a valid data connection, and run the callback when it's ready
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
        };

        socket.addListener("connect", function () {
            logIf(1, "Connection", conn);
            //socket.send("220 NodeFTPd Server version 0.0.10\r\n");
            //socket.write("220 written by Andrew Johnston (apjohnsto@gmail.com)\r\n");
            //socket.write("220 Please visit http://github.com/billywhizz/NodeFTPd\r\n");
            socket.write("220 FTP server (nodeftpd) ready\r\n");
        });
        
        socket.addListener("data", function (data) {
            data = (data+'').trim();
            // Don't want to include passwords in logs.
            logIf(2, "FTP command: " + data.toString('utf-8').replace(/^PASS\s+.*/, 'PASS ***'), conn);

            var command, arg;
            var index = data.indexOf(" ");
            if (index > 0) {
                command = data.substring(0, index).trim().toUpperCase();
                commandArg = data.substring(index+1, data.length).trim();
            } else {
                command = data.trim().toUpperCase();
                commandArg = '';
            }
            
            switch(command)
            {
            case "ABOR":
                // Abort an active file transfer.
                socket.write("202 Not supported\r\n");
                break;
            case "ACCT":
                // Account information
                socket.write("202 Not supported\r\n");
                break;
            case "ADAT":
                // Authentication/Security Data (RFC 2228)
                socket.write("202 Not supported\r\n");
                break;
            case "ALLO":
                // Allocate sufficient disk space to receive a file.
                socket.write("202 Not supported\r\n");
                break;
            case "APPE":
                // Append.
                socket.write("202 Not supported\r\n");
                break;
            case "AUTH":
                // Authentication/Security Mechanism (RFC 2228)
                socket.write("202 Not supported\r\n");
                break;
            case "CCC":
                // Clear Command Channel (RFC 2228)
                socket.write("202 Not supported\r\n");
                break;
            case "CDUP":
                // Change to Parent Directory.
                if (!authenticated()) break;
                // Not sure if this is technically correct, but 'dirname' does in fact just
                // strip the last component of the path for a UNIX-style path, even if this
                // has a trailing slash. It also maps "/foo" to "/" and "/" to "/".
                conn.cwd = PathModule.dirname(cwd);
                socket.write("250 Directory changed to " + conn.cwd + "\r\n");
                break;
            case "CONF":
                // Confidentiality Protection Command (RFC 697)
                socket.write("202 Not supported\r\n");
                break;
            case "CWD":
                // Change working directory.
                if (!authenticated()) break;
                var path = withCwd(conn.cwd, commandArg);
                var fspath = PathModule.join(conn.root, path);
                conn.path.exists(fspath, function(exists) {
                    if (!exists) {
                        socket.write("550 Folder not found.\r\n");
                        return;
                    }
                    conn.cwd = path;
                    socket.write("250 CWD successful. \"" + conn.cwd + "\" is current directory\r\n");
                });
                break;
            case "DELE":
                // Delete file.
                if (!authenticated()) break;
                var filename = PathModule.join(conn.root, withCwd(conn.cwd, commandArg));
                conn.fs.unlink( filename, function(err){
                    if (err) {
                        logIf(0, "Error deleting file: "+filename+", "+err, conn);
                        // write error to socket
                        socket.write("550 Permission denied\r\n");
                    } else
                        socket.write("250 File deleted\r\n");
                });
                break;
            case "ENC":
                // Privacy Protected Channel (RFC 2228)
                socket.write("202 Not supported\r\n");
                break;
            case "EPRT":
                // Specifies an extended address and port to which the server should connect. (RFC 2428)
                var addr = commandArg.split("|");
                if (addr.length != 5 || addr[1] != "1" ||
                    !addr[2].match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) ||
                    !addr[3].match(/^\d+/)) {
                    socket.write("202 Not supported\r\n");
                }
                else {
                    conn.dataHost = addr[2];
                    conn.dataPort = parseInt(addr[3]);
                    socket.write("200 EPRT command successful.\r\n");
                }
                break;
            case "FEAT":
                // Get the feature list implemented by the server. (RFC 2389)
                socket.write("211-Features\r\n");
                socket.write(" SIZE\r\n");
                socket.write("211 end\r\n");
                break;
            case "HELP":
                // Returns usage documentation on a command if specified, else a general help document is returned.
                /*
                        214-The following commands are recognized:
                        USER   PASS   QUIT   CWD    PDD    PORT   PASV   TYPE
                        LIST   REST   CDUP   RETR   STOR   SIZE   DELE   RMD
                        MKD    RNFR   RNTO   ABOR   SYST   NOOP   APPE   NLST
                        MDTM   XPWD   XCUP   XMKD   XRMD   NOP    EPSV   EPRT
                        AUTH   ADAT   PBSZ   PROT   FEAT   MODE   OPTS   HELP
                        ALLO   MLST   MLSD   SITE   P@SW   STRU   CLNT   MFMT
                        214 Have a nice day.		
                        */
                socket.write("202 Not supported\r\n");
                break;
            case "LANG":
                // Language Negotiation (RFC 2640)
                socket.write("202 Not supported\r\n");
                break;
            case "LIST":
                // Returns information of a file or directory if specified, else information of the current working directory is returned.
                if (!authenticated()) break;

                whenDataWritable( function(pasvconn) {
                    var leftPad = function(text, width) {
                        var out = '';
                        for (var j = text.length; j < width; j++) out += ' ';
                        out += text;
                        return out;
                    };
                    // This will be called once data has ACTUALLY written out ... socket.write() is async!
                    var success = function() {
                        socket.write("226 Transfer OK\r\n");
                        pasvconn.end();
                    };
                    if (pasvconn.readable) pasvconn.resume();
                    logIf(3, "Sending file list", conn);
                    var dir = withCwd(conn.cwd, commandArg);
                    conn.fs.readdir(PathModule.join(conn.root, dir), function(err, files) {
                        if (err) {
                            logIf(0, "While sending file list, reading directory: " + err, conn);
                            socket.write("550 Not a directory\r\n");
                            pasvconn.end();
                        } else {
                            // Wait until acknowledged!
                            socket.write("150 Here comes the directory listing\r\n", function() {
                                logIf(3, "Directory has " + files.length + " files", conn);
                                var count = 0;
                                function writelast() { 
                                    // write the last bit, so we can know when it's finished
                                    pasvconn.write("\r\n", success);
                                }

                                // Could use the Seq library here, but since it's not used anywhere else, seems
                                // a bit unnecessary. This requests file stats in parallel to degree AT_ONCE.
                                var i = 0, count = 0;
                                var AT_ONCE = options.maxStatsAtOnce || 5;
                                var lines = new Array(files.length);
                                for (; i < AT_ONCE && i < files.length; ++i) {
                                    doStat(files[i], i);
                                }
                                if (files.length == 0) finishStat();

                                function doStat(file, li) {
                                    conn.fs.stat(PathModule.join(conn.root, dir, file), function (err, s) {
                                        // An error could conceivably occur here if e.g. the file gets deleted
                                        // in between the call to readdir and stat. Not really sure what a sensible
                                        // thing to do would be in this sort of scenario. At the moment, we just
                                        // pretend that the file doesn't exist in this case.
                                        if (err) {
                                            logIf(0, "Weird failure of 'stat' " + err, conn);
                                        }
                                        else {
                                            self.getUsernameFromUid(s.uid, function (e1, uname) { self.getGroupFromGid(s.gid, function (e2, gname) {
                                                if (e1) logIf(0, "While attempting to get username: " + e1, conn);
                                                if (e2) logIf(0, "While attempting to get group:" + e2, conn);
                                                lines[li] = s.isDirectory() ? 'd' : '-';
                                                lines[li] += (0400 & s.mode) ? 'r' : '-';
                                                lines[li] += (0200 & s.mode) ? 'w' : '-';
                                                lines[li] += (0100 & s.mode) ? 'x' : '-';
                                                lines[li] += (040 & s.mode) ? 'r' : '-';
                                                lines[li] += (020 & s.mode) ? 'w' : '-';
                                                lines[li] += (010 & s.mode) ? 'x' : '-';
                                                lines[li] += (04 & s.mode) ? 'r' : '-';
                                                lines[li] += (02 & s.mode) ? 'w' : '-';
                                                lines[li] += (01 & s.mode) ? 'x' : '-';
                                                lines[li] += " 1 " + (e1 ? "ftp" : uname) + " " +
                                                    (e2 ? "ftp" : gname) + " ";
                                                lines[li] += leftPad(s.size.toString(), 12) + ' ';
                                                var d = new Date(s.mtime);
                                                lines[li] += leftPad(d.format('M d H:i'), 12) + ' '; // need to use a date string formatting lib
                                                lines[li] += file;
                                                
                                                ++count;
                                                if (i < files.length) {
                                                    doStat(files[i], i);
                                                    ++i;
                                                }
                                                else if (count == files.length) {
                                                    finishStat();
                                                }
                                            }) });
                                        }
                                    });
                                }
                                function finishStat() {
                                    pasvconn.write(lines.join('\r\n'));
                                    // write the last bit, so we can know when it's finished
                                    pasvconn.write("\r\n", success);
                                }
                            });
                        }
                    });
                });
                break;
            case "LPRT":
                // Specifies a long address and port to which the server should connect. (RFC 1639)
                socket.write("202 Not supported\r\n");
                break;
            case "LPSV":
                // Enter long passive mode. (RFC 1639)
                socket.write("202 Not supported\r\n");
                break;
            case "MDTM":
                // Return the last-modified time of a specified file. (RFC 3659)
                socket.write("202 Not supported\r\n");
                break;
            case "MIC":
                // Integrity Protected Command (RFC 2228)
                socket.write("202 Not supported\r\n");
                break;
            case "MKD":
                // Make directory.
                if (!authenticated()) break;
                var filename = PathModule.join(conn.root, withCwd(conn.cwd, commandArg));
                conn.fs.mkdir( filename, 0755, function(err){
                    if(err) {
                        logIf(0, "Error making directory " + filename + " because " + err, conn);
                        // write error to socket
                        socket.write("550 \""+filename+"\" directory NOT created\r\n");
                        return;
                    }
                    socket.write("257 \""+filename+"\" directory created\r\n");
                });
                break;
            case "MLSD":
                // Lists the contents of a directory if a directory is named. (RFC 3659)
                socket.write("202 Not supported\r\n");
                break;
            case "MLST":
                // Provides data about exactly the object named on its command line, and no others. (RFC 3659)
                socket.write("202 Not supported\r\n");
                break;
            case "MODE":
                // Sets the transfer mode (Stream, Block, or Compressed).
                socket.write("202 Not supported\r\n");
                break;
            case "NLST":
                // Returns a list of file names in a specified directory.
                if (!authenticated()) break;
                
                /*
                Normally the server responds with a mark using code 150. It then stops accepting new connections, attempts to send the contents of the directory over the data connection, and closes the data connection. Finally it

                    accepts the LIST or NLST request with code 226 if the entire directory was successfully transmitted;
                    rejects the LIST or NLST request with code 425 if no TCP connection was established;
                    rejects the LIST or NLST request with code 426 if the TCP connection was established but then broken by the client or by network failure; or
                    rejects the LIST or NLST request with code 451 if the server had trouble reading the directory from disk.

                The server may reject the LIST or NLST request (with code 450 or 550) without first responding with a mark. In this case the server does not touch the data connection.
                */

                whenDataWritable( function(pasvconn) {
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
                    if (pasvconn.readable) pasvconn.resume();
                    logIf(3, "Sending file list", conn);
                    
                    glob.glob(temp, function(err, files) {
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
                });
                break;
            case "NOOP":
                // No operation (dummy packet; used mostly on keepalives).
                socket.write("202 Not supported\r\n");
                break;
            case "OPTS":
                // Select options for a feature. (RFC 2389)
                socket.write("202 Not supported\r\n");
                break;
            case "PASS":
                // Authentication password.
                conn.emit(
                    "command:pass",
                    commandArg,
                    function(username, modules) { // implementor should call this on successful password check
                        socket.write("230 Logged on\r\n");
                        conn.username = username;
                        if (modules) {
                            conn.fs = modules.fs;
                            conn.path = modules.path;
                        }
                        else {
                            conn.fs = FsModule;
                            conn.path = PathModule;
                        }
                        conn.cwd = self.getInitialCwd(username);
                        conn.root = self.getRoot(username);
                    },
                    function() { // call second callback if password incorrect
                        socket.write("530 Invalid password\r\n");
                        conn.authFailures++;
                        conn.username = null;
                    }
                );
                break;
            case "PASV":
            case "EPSV":
                if (command == "EPSV" && commandArg && commandArg != "1") {
                    socket.write("202 Not supported\r\n");
                    break;
                }
                // Enter passive mode. This creates the listening socket.
                if (!authenticated()) break;
                // not sure whether the spec limits to 1 data connection at a time ...
                if (conn.dataListener) conn.dataListener.close(); // we're creating a new listener
                if (conn.dataSocket) conn.dataSocket.end(); // close any existing connections
                conn.dataListener = null;
                conn.dataSocket = null;
                // Passive listener needs to pause data because sometimes commands come before a data connection,
                // othertime afterwards ... depends on the client and threads
                socket.pause();
                var pasvEhandler; // To be set later.
                var pasv = net.createServer(function(psocket) {
                    logIf(1, "Incoming passive data connection", conn);
                    psocket.pause();
                    psocket.buffers = [];
                    psocket.on("data", function(data) {
                        // should watch out for malicious users uploading large amounts of data outside protocol
                        logIf(3, 'Data event: received ' + (Buffer.isBuffer(data) ? 'buffer' : 'string'), conn);
                        psocket.buffers.push(data);
                    });
                    psocket.on("connect", function() {
                        logIf(1, "Passive data event: connect", conn);
                        // Once we have a completed data connection, make note of it
                        conn.dataSocket = psocket;
                        // 150 should be sent before we send data on the data connection
                        //socket.write("150 Connection Accepted\r\n");
                        if (socket.readable) socket.resume();
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
                });
                var portRangeErrorHandler;
                function normalErrorHandler(e) {
                    logIf(3, "Error with passive data listener: " + util.inspect(e), conn);
                }
                if (options.pasvPortRangeStart && options.pasvPortRangeEnd) {
                    // Keep trying ports in the range supplied until either:
                    //     (i)   It works
                    //     (ii)  We get an error that's not just EADDRINUSE
                    //     (iii) We run out of ports to try.
                    var i = options.pasvPortRangeStart;
                    pasv.listen(i);
                    portRangeErrorHandler = function (e) {
                        if (e.code == 'EADDRINUSE' && i < options.pasvPortRangeEnd)
                            pasv.listen(++i);
                    };
                    pasv.on('error', portRangeErrorHandler);
                }
                else {
                    pasv.listen(0);
                    pasv.on('error', normalErrorHandler);
                }
                conn.dataListener = pasv;
                // Once we're successfully listening, tell the client
                pasv.addListener("listening", function() {
                    if (portRangeErrorHandler) {
                        pasv.removeListener('error', portRangeErrorHandler);
                        pasv.addListener('error', normalErrorHandler);
                    }

                    logIf(3, "Passive data connection beginning to listen", conn);

                    var port = pasv.address().port;
                    conn.passive = true; // wait until we're actually listening
                    conn.dataHost = host;
                    conn.dataPort = port;
                    logIf(3, "Passive data connection listening on port " + port, conn);
                    var i1 = parseInt(port / 256);
                    var i2 = parseInt(port % 256);
                    if (command == "PASV") {
                        logIf(0, "227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ")\r\n", conn);
                        socket.write("227 Entering Passive Mode (" + host.split(".").join(",") + "," + i1 + "," + i2 + ")\r\n");
                    }
                    else if (command == "EPSV") {
                        socket.write("229 Entering Extended Passive Mode (|||" + port + "|)\r\n");
                    }
                });
                pasv.on("close", function() {
                    logIf(3, "Passive data listener closed", conn);
                    if (socket.readable) socket.resume(); // just in case
                });
                break;
            case "PBSZ":
                // Protection Buffer Size (RFC 2228)
                socket.write("202 Not supported\r\n");
                break;
            case "PORT":
                // Specifies an address and port to which the server should connect.
                if (!authenticated()) break;
                conn.passive = false;
                conn.dataSocket = null;
                var addr = commandArg.split(",");
                conn.dataHost= addr[0]+"."+addr[1]+"."+addr[2]+"."+addr[3];
                conn.dataPort = (parseInt(addr[4]) * 256) + parseInt(addr[5]);
                socket.write("200 PORT command successful.\r\n");
                break;
            case "PWD":
                // Print working directory. Returns the current directory of the host.
                if (!authenticated()) break;
                socket.write("257 \"" + conn.cwd + "\" is current directory\r\n");
                break;
            case "QUIT":
                // Disconnect.
                socket.write("221 Goodbye\r\n");
                socket.end();
                closeDataConnections();
                break;
            case "REIN":
                // Re initializes the connection.
                socket.write("202 Not supported\r\n");
                break;
            case "REST":
                // Restart transfer from the specified point.
                if (!authenticated()) break;
                socket.write("202 Not supported\r\n");
                /*
                conn.totsize = parseInt(commandArg);
                socket.write("350 Rest supported. Restarting at " + conn.totsize + "\r\n");
                */
                break;
            case "RETR":
                // Retrieve (download) a remote file.
                whenDataWritable( function(pasvconn) {
                    pasvconn.setEncoding(conn.mode);

                    var filename = PathModule.join(conn.root, commandArg);
                    if(filename != conn.filename)
                    {
                        conn.totsize = 0;
                        conn.filename = filename;
                    }

                    if (options.slurpFiles) {
                        conn.fs.readFile(conn.filename, function (err, contents) {
                            if (err) {
                                if (err.code == 'ENOENT') {
                                    socket.write("550 Not Found\r\n");
                                }
                                else { // Who knows what's going on here...
                                    socket.write("550 Not Accessible\r\n");
                                    traceIf(0, "Error at read other than ENOENT " + err, conn);
                                }
                            }
                            else {
                                // TODO: This conditional was in the original code. Seems like there should also be
                                // an 'else'. What do do here?
                                socket.write("150 Opening " + conn.mode.toUpperCase() + " mode data connection\r\n");
                                if (pasvconn.readyState == 'open') pasvconn.write(contents, conn.mode)
                                pasvconn.end();
                                socket.write("226 Closing data connection, sent " + conn.totsize + " bytes\r\n");
                            }
                        });
                    }
                    else {
                        conn.fs.open(conn.filename, "r", function (err, fd) {
                            logIf(0, "DATA file " + conn.filename + " opened", conn);
                            socket.write("150 Opening " + conn.mode.toUpperCase() + " mode data connection\r\n");
                            function readChunk() {
                                if (! self.buffer) self.buffer = new Buffer(4096);
                                conn.fs.read(fd, self.buffer, 0, 4096, null/*pos*/, function(err, bytesRead, buffer) {
                                    if(err) {
                                        traceIf(0, "Error reading chunk", conn);
                                        conn.emit("error", err);
                                        return;
                                    }
                                    if (bytesRead > 0) {
                                        conn.totsize += bytesRead;
                                        if(pasvconn.readyState == "open") pasvconn.write(self.buffer.slice(0, bytesRead), conn.mode);
                                        readChunk();
                                    }
                                    else {
                                        logIf(0, "DATA file " + conn.filename + " closed", conn);
                                        pasvconn.end();
                                        socket.write("226 Closing data connection, sent " + conn.totsize + " bytes\r\n");
                                        conn.fs.close(fd, function (err) {
                                            if (err) conn.emit("error", err);
                                            conn.totsize = 0;
                                        });
                                    }
                                });
                            }
                            if(err) {
                                if (err.code == 'ENOENT') {
                                    socket.write("550 Not Found\r\n");
                                }
                                else { // Who know's what's going on here...
                                    socket.write("550 Not Accessible\r\n");
                                    traceIf(0, "Error at read other than ENOENT " + err, conn);
                                }
                            }
                            else {
                                readChunk();
                            }
                        });
                    }
                });
                break;
            case "RMD":
                // Remove a directory.
                if (!authenticated()) break;
                var filename = PathModule.join(conn.root, withCwd(conn.cwd, commandArg));
                conn.fs.rmdir( filename, function(err){
                    if(err) {
                        logIf(0, "Error removing directory "+filename, socket);
                        socket.write("550 Delete operation failed\r\n");
                    } else
                        socket.write("250 \""+filename+"\" directory removed\r\n");
                });
                break;
            case "RNFR":
                // Rename from.
                if (!authenticated()) break;
                conn.filefrom = withCwd(conn.cwd, commandArg);
                logIf(3, "Rename from " + conn.filefrom, socket);
                conn.path.exists( conn.filefrom, function(exists) {
                    if (exists) socket.write("350 File exists, ready for destination name\r\n");
                    else socket.write("350 Command failed, file does not exist\r\n");
                });
                break;
            case "RNTO":
                // Rename to.
                if (!authenticated()) break;
                var fileto = PathModule.join(conn.root, withCwd(conn.cwd, commandArg));
                conn.fs.rename( conn.filefrom, fileto, function(err){
                    if(err) {
                        logIf(3, "Error renaming file from "+conn.filefrom+" to "+fileto, socket);
                        socket.write("550 Rename failed\r\n");
                    } else
                        socket.write("250 File renamed successfully\r\n");
                });
                break;
            case "SITE":
                // Sends site specific commands to remote server.
                socket.write("202 Not supported\r\n");
                break;
            case "SIZE":
                // Return the size of a file. (RFC 3659)
                if (!authenticated()) break;
                var filename = PathModule.join(conn.root, withCwd(conn.cwd, commandArg));
                conn.fs.stat( filename, function (err, s) {
                    if(err) { 
                        traceIf(0, "Error getting size of file: "+filename, socket);
                        socket.write("450 Failed to get size of file\r\n");
                        return;
                    }
                    socket.write("213 " + s.size + "\r\n");
                });
                break;
            case "SMNT":
                // Mount file structure.
                socket.write("202 Not supported\r\n");
                break;
            case "STAT":
                // Returns the current status.
                
                /* from FileZilla
                        Connected to 192.168.2.100.
                        No proxy connection.
                        Mode: stream; Type: ascii; Form: non-print; Structure: file
                        Verbose: on; Bell: off; Prompting: on; Globbing: on
                        Store unique: off; Receive unique: off
                        Case: off; CR stripping: on
                        Ntrans: off
                        Nmap: off
                        Hash mark printing: off; Use of PORT cmds: on
                        Tick counter printing: off
                        */
                socket.write("202 Not supported\r\n");
                break;
            case "STOR":
                // Store (upload) a file.
                if (!authenticated()) break;
                whenDataWritable( function(dataSocket) {
                    // dataSocket comes to us paused, so we have a chance to create the file before accepting data
                    filename = PathModule.join(conn.root, withCwd(conn.cwd, commandArg));
                    conn.fs.open( filename, 'w', 0644, function(err, fd) {
                        if(err) {
                            traceIf(0, 'Error opening/creating file: ' + filename, socket);
                            socket.write("553 Could not create file\r\n");
                            dataSocket.end();
                            return;
                        }
                        logIf(3, "File opened/created: " + filename, socket);

                        dataSocket.addListener("end", function () {
                            var writtenToFile = 0;
                            var doneCallback = function() {
                                conn.fs.close(fd, function(err) {
                                    if (err) conn.emit('error', err);
                                    else socket.write("226 Closing data connection\r\n"); //, recv " + writtenToFile + " bytes\r\n");
                                });
																conn.emit("file:received", filename);
                            };
                            var writeCallback = function(err, written) {
                                var buf;
                                if (err) {
                                    traceIf(0, "Error writing " + filename + ": " + err, socket);
                                    return;
                                }
                                writtenToFile += written;
                                if (!dataSocket.buffers.length) {
                                    doneCallback();
                                    return;
                                }
                                buf = dataSocket.buffers.shift();
                                conn.fs.write(fd, buf, 0, buf.length, null, writeCallback);
                            };
                            writeCallback();
                        });
                        dataSocket.addListener("error", function(err) {
                            traceIf(0, "Error transferring " + filename + ": " + err, socket);
                            // close file handle
                            conn.fs.close(fd);
                        });
                        logIf(3, "Told client ok to send file data", socket);
                        socket.write("150 Ok to send data\r\n"); // don't think resume() needs to wait for this to succeed
                        if (dataSocket.readable) dataSocket.resume();
                    });
                });
                break;
            case "STOU":
                // Store file uniquely.
                socket.write("202 Not supported\r\n");
                break;
            case "STRU":
                // Set file transfer structure.
                socket.write("202 Not supported\r\n");
                break;
            case "SYST":
                // Return system type.
                socket.write("215 UNIX emulated by NodeFTPd\r\n");
                break;
            case "TYPE":
                // Sets the transfer mode (ASCII/Binary).
                if (!authenticated()) break;
                if(commandArg == "A"){
                    conn.mode = "ascii";
                    socket.write("200 Type set to A\r\n");			
                }
                else{
                    conn.mode = "binary";
                    socket.write("200 Type set to I\r\n");			
                }
                break;
            case "USER":
                // Authentication username.
                conn.emit(
                    "command:user",
                    commandArg,
                    function() { // implementor should call this on successful password check
                        socket.write("331 Password required for " + commandArg + "\r\n");
                    },
                    function() { // call second callback if password incorrect
                        socket.write("530 Invalid username: " + commandArg + "\r\n");
                    }
                );
                break;
            case "XPWD":
                // 
                socket.write("257 " + conn.cwd + " is the current directory\r\n");
                break;
            default:
                socket.write("202 Not supported\r\n");
                break;
            }
        });

        socket.addListener("end", function () {
            logIf(1, "Client connection ended", socket);
        });
        socket.addListener("error", function (err) {
            logIf(0, "Client connection error: " + err, socket);
            socket.destroy();
        });
    });

    this.server.addListener("close", function() {
        logIf(0, "Server closed");
    });
}