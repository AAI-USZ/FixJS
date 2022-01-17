function Agent(manager, registration) {
    this.manager = manager;

    this.id = registration.id;
    this.ua = registration.ua;

    var abortNow;

    this.ttl = registration.ttl || Agent.TTL;

    if (!this.id) {
        throw new Error("ID required.");
    } else if (!this.ua) {
        // TODO Zombies should be killed.
        // If the Yeti Client goes away, the zombies should
        // move back to the capture page.
        abortNow = "Unknown (zombie browser from previous test run)";
        this.ua = abortNow;
    }

    this.name = parseUA(this.ua);

    this.seen = new Date();
    this.waiting = true;
    this.connected = true;

    this.urlQueue = [];
    this.currentUrl = null;

    EventEmitter2.call(this);

    // The this.socketEmitter EventYoshi should
    // contain at most 1 Socket.io socket.
    //
    // We use an EventYoshi so that event
    // listeners for sockets only need to be
    // setup once. We can then connect and
    // disconnect the Agent's socket as needed.
    this.socketEmitter = new EventYoshi();

    this.setupEvents();
    this.connect(registration.socket);
    
    if (abortNow) {
        this.abort();
        this.emit("agentError", abortNow);
    }
}