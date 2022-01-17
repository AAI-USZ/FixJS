function FtpServer(host, options) {
    var self = this;
    events.EventEmitter.call(self);

    self.host = host;

    self.options = options;

    self.server = net.createServer();
    self.getInitialCwd = options.getInitialCwd || function () { return "/"; };
    self.getUsernameFromUid = options.getUsernameFromUid || function (uid, c) { c(null, "ftp"); };
    self.getGroupFromGid = options.getGroupFromGid || function (gid, c) { c(null, "ftp"); }
    self.getRoot = options.getRoot || function () { return "/"; };
    self.debugging = options.logLevel || 0;
    self.uploadMaxSlurpSize = options.uploadMaxSlurpSize || 0;

    self.server.on('connection', function (socket) { self._onConnection(socket); });
    self.server.on('error', function (err) { self.emit('error', err); });
    self.server.on('close', function () { self.emit('close'); });
}