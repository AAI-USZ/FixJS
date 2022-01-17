function RedisClient(stream, options) {
    this.stream = stream;
    this.options = options = options || {};

    this.connection_id = ++connection_id;
    this.connected = false;
    this.ready = false;
    this.connections = 0;
    if (this.options.socket_nodelay === undefined) {
        this.options.socket_nodelay = true;
    }
    this.should_buffer = false;
    this.command_queue_high_water = this.options.command_queue_high_water || 1000;
    this.command_queue_low_water = this.options.command_queue_low_water || 0;
    this.max_attempts = null;
    if (options.max_attempts && !isNaN(options.max_attempts) && options.max_attempts > 0) {
        this.max_attempts = +options.max_attempts;
    }
    this.command_queue = new Queue(); // holds sent commands to de-pipeline them
    this.offline_queue = new Queue(); // holds commands issued but not able to be sent
    this.commands_sent = 0;
    this.connect_timeout = false;
    if (options.connect_timeout && !isNaN(options.connect_timeout) && options.connect_timeout > 0) {
        this.connect_timeout = +options.connect_timeout;
    }
    this.enable_offline_queue = this.options.enable_offline_queue || true;

    this.initialize_retry_vars();
    this.pub_sub_mode = false;
    this.subscription_set = {};
    this.monitoring = false;
    this.closing = false;
    this.server_info = {};
    this.auth_pass = null;
    this.parser_module = null;
    this.selected_db = null;	// save the selected db here, used when reconnecting

    var self = this;

    this.stream.on("connect", function () {
        self.on_connect();
    });

    this.stream.on("data", function (buffer_from_socket) {
        self.on_data(buffer_from_socket);
    });

    this.stream.on("error", function (msg) {
        self.on_error(msg.message);
    });

    this.stream.on("close", function () {
        self.connection_gone("close");
    });

    this.stream.on("end", function () {
        self.connection_gone("end");
    });

    this.stream.on("drain", function () {
        self.should_buffer = false;
        self.emit("drain");
    });

    events.EventEmitter.call(this);
}