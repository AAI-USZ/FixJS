function(err) {
                logIf(0, "Passive data event: error: " + err, conn);
                self.dataSocket = null;
            }