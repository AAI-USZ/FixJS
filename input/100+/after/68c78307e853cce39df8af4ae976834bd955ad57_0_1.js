function RedisStore(options) {
    var self = this;

    options = options || {};
    Store.call(this, options);
    this.prefix = null == options.prefix
      ? 'sess:'
      : options.prefix;

    this.client = options.client || new redis.createClient(options.port || options.socket, options.host, options);

    // If the safe mode is enabled, a conenction problem will not make node crash
    // The connectionProblem flag will instead be set so that the problem can be gracefully handled by Connect's session middleware
    // On reconnection, the connectionProblem flag gets unset and normal behaviour resumes
    if (options.safeMode) {
      this.client.on('error', function(err) {
        self.connectionProblem = true;
      });

      this.client.on('connect', function() {
        self.connectionProblem = false;
      });
    }

    if (options.pass) {
      this.client.auth(options.pass, function(err){
        if (err) throw err;
      });    
    }

    this.ttl =  options.ttl;

    if (options.db) {
      var self = this;
      self.client.select(options.db);
      self.client.on("connect", function() {
        self.client.send_anyways = true;
        self.client.select(options.db);
        self.client.send_anyways = false;
      });
    }
  }