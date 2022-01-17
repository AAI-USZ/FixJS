function(err) {
                self._logIf(0, "Passive data event: error: " + err, self);
                self.dataSocket = null;
            }