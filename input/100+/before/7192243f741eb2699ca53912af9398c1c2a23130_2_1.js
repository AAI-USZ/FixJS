function(count, done) {
  // Master-only operation
  if (this.role != 'master' || this.options.single_mode) {
    return;
  }
  if (typeof count == 'function') {
    done = count;
    count = 1;
  }
  var self = this;
  // For write operations, increment an op counter, to judge freshness of slaves.
  if (!this.opcounterClient) {
    this.opcounterClient = redis.createClient(this.port, this.host, this.options);
    if (this.auth_pass) {
      this.opcounterClient.auth(this.auth_pass);
    }
    this.clients.push(this.opcounterClient);
    if (this.options.haredis_db_num) {
      // Make redis connect to a special db (upon ready) for the opcounter.
      this.opcounterClient.selected_db = this.options.haredis_db_num;
    }
    this.opcounterClient.on('error', function(err) {
      self.emit('error', err);
    });
  }
  if (this.opcounter++ % this.options.opcounterDiviser === 0) {
    this.opcounterClient.INCRBY('haredis:opcounter', count, done);
  }
  else {
    done();
  }
}