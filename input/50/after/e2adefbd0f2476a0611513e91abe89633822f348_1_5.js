function() {
    var self = this;

    cb = cb || arguments[1];

    self.file.backupLogs(cb);
}