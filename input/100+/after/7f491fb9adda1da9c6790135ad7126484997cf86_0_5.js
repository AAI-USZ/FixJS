function () {
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
                        logIf(3, "Sending file list", conn);
                        var dir = withCwd(conn.cwd, commandArg);
                        conn.fs.readdir(PathModule.join(conn.root, dir), function(err, files) {
                            if (err) {
                                logIf(0, "While sending file list, reading directory: " + err, conn);
                                socket.write("550 Not a directory\r\n");
                                pasvconn.end();
                            } else {
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
                                            next();
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
                                                
                                                next();
                                            }) });
                                        }
                                        
                                        function next() {
                                            ++count;
                                            if (i < files.length) {
                                                doStat(files[i], i);
                                                ++i;
                                            }
                                            else if (count == files.length) {
                                                finishStat();
                                            }
                                        }
                                    });
                                }
                                function finishStat() {
                                    pasvconn.write(lines.join('\r\n'));
                                    // write the last bit, so we can know when it's finished
                                    pasvconn.write("\r\n", success);
                                }
                            }
                        });
                    });
                }