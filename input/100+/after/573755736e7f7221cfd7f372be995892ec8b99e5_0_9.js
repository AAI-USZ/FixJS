function (err, s) {
                            // An error could conceivably occur here if e.g. the file gets deleted
                            // in between the call to readdir and stat. Not really sure what a sensible
                            // thing to do would be in this sort of scenario. At the moment, we just
                            // pretend that the file doesn't exist in this case.
                            if (err) {
                                self._logIf(0, "Weird failure of 'stat' " + err, self);
                                next();
                            }
                            else {
                                self.server.getUsernameFromUid(s.uid, function (e1, uname) { self.server.getGroupFromGid(s.gid, function (e2, gname) {
                                    if (e1) self._logIf(0, "While attempting to get username: " + e1, self);
                                    if (e2) self._logIf(0, "While attempting to get group:" + e2, self);
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
                                    lines[li] += leftPad(dateformat(d, 'mmm dd HH:MM'), 12) + ' ';
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
                        }