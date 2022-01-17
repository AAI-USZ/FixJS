function (callback) {
    var self = this;

    if (self.passive) {
        // how many data connections are allowed?
        // should still be listening since we created a server, right?
        if (self.dataSocket) {
            self._logIf(3, "A data connection exists", self);
            callback(self.dataSocket);
        } else {
            self._logIf(3, "Currently no data connection; expecting client to connect to pasv server shortly...", self);
            self.passive.once('ready', function () {
                self._logIf(3, "...client has connected now");
                callback(self.dataSocket);
            });
        }
    } else {
        // Do we need to open the data connection?
        if (self.dataSocket) { // There really shouldn't be an existing connection
            self._logIf(3, "Using existing non-passive dataSocket", self);
            callback(self.dataSocket);
        } else {
            // This branch of the conditional used to contain code for reopening the passive connection.
            // Currently removed because it needs to be updated to handle TLS, and I'm not sure how
            // to trigger this branch in testing as of yet. (Maybe it's not even necessary?)
            self._logIf(3, "No passive connection");
            wwenc(self.socket, "425 Can't open data connection (not in passive mode)\r\n");
        }
    }
}