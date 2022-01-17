function () {
                logIf(3, "...client has connected now");
                callback(self.dataSocket);
            }