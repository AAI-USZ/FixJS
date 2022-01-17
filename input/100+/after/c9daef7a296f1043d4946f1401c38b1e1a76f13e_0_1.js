function (expressServerInstance) {

    if (!expressServerInstance) {
        throw new Error("(nof5) No instance of an express-server was passed.");
    }

    EventEmitter.call(this);

    var self = this,
        socketIOServer,
        socketCollection = [];

    /**
     * @return {object}
     */
    this.start = function () {
        socketIOServer = socketIO.listen(expressServerInstance);

        __configure();

        socketIOServer.on("connection", function onConnection (newSocket) {

            var oldSocket = __findSocketById(newSocket.id);

            if(!oldSocket) {
                socketCollection.push(newSocket);
                self.emit("connect", newSocket);
            } else {
                self.emit("reconnect", oldSocket);
            }
        });

        socketIOServer.on("disconnect", function onDisconnect(disonnectedSocket) {
            socketCollection = _(socketCollection).filter(function filterSockets(socket) {
                return disonnectedSocket.id !== socket.id;
            });
            self.emit("disconnect", disonnectedSocket);
        });

        return socketIOServer;
    };

    /**
     * @param {string} socketId
     * @return {object}
     * @private
     */
    function __findSocketById(socketId) {
        return _(socketCollection).find(function socketCollectionFinder(socket) {
            return socket.id === socketId;
        });
    }

    function __configure() {
        socketIOServer.configure(function confgiureSocketIoServer() {
            socketIOServer.set("log level", 0);
            socketIOServer.set("heartbeat timeout", 60 * 60 * 12); //socket can open for 12 hours
        });
    }

}