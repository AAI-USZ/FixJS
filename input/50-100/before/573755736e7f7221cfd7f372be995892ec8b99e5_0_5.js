function(err, files) {
                if (err) {
                    logIf(0, "During NLST, error globbing files: " + err, self);
                    wwenc(self.socket, "451 Read error\r\n");
                    pasvconn.end();
                    return;
                }
                logIf(3, "Directory has " + files.length + " files", self);
                wwenc(pasvconn, files.map(PathModule.basename).join("\015\012") + "\015\012", success);
            }