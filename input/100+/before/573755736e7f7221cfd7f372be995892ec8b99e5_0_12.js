function(pasvconn) {
            var success = function() {
                wwenc(self.socket, "226 Transfer OK\r\n");
                pasvconn.end();
            };
            // Use temporary filesystem path maker since a path might be sent with NLST
            var temp = '';
            if (dirname) {
                // Remove double slashes or "up directory"
                dirname = dirname.replace(/\/{2,}|\.{2}/g, '');
                if (dirname.substr(0, 1) == '/') {
                    temp = dirname;
                } else {
                    temp = withCwd(self.cwd, dirname);
                }
            } else temp = self.cwd;
            logIf(3, "Sending file list", self);
            
            glob.glob(temp, self.fs, function(err, files) {
                if (err) {
                    logIf(0, "During NLST, error globbing files: " + err, self);
                    wwenc(self.socket, "451 Read error\r\n");
                    pasvconn.end();
                    return;
                }
                logIf(3, "Directory has " + files.length + " files", self);
                wwenc(pasvconn, files.map(PathModule.basename).join("\015\012") + "\015\012", success);
            });
        }