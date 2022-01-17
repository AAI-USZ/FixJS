function (e1, uname) { self.getGroupFromGid(s.gid, function (e2, gname) {
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
                                            }) }