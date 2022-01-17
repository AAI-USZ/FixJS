function(had_error) {
                self._logIf(
                    (had_error ? 0 : 3),
                    "Passive data event: close " + (had_error ? " due to error" : ""),
                    self.socket
                );
            }