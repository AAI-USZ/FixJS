function(had_error) {
                logIf(
                    (had_error ? 0 : 3),
                    "Passive data event: close " + (had_error ? " due to error" : ""),
                    self.socket
                );
            }