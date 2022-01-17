function FtpServer(host, options) {
    var self = this;
    events.EventEmitter.call(this);

    this.host = host;

    this.options = options;

    this.server = net.createServer();
    this.getInitialCwd = options.getInitialCwd || function () { return "/"; };
    this.getUsernameFromUid = options.getUsernameFromUid || function (uid, c) { c(null, "ftp"); };
    this.getGroupFromGid = options.getGroupFromGid || function (gid, c) { c(null, "ftp"); }
    this.getRoot = options.getRoot || function () { return "/"; };
    this.debugging = options.logLevel || 0;
    this.uploadMaxSlurpSize = options.uploadMaxSlurpSize || 0;

    this.server.on('connection', function (socket) { self._onConnection(socket); });
}