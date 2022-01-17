function MultiRedis(options) {

  EventEmitter.call(this);

  options = options || {};

  if (options.server) {

    options.host = [];

    options.port = [];

    if (options.server instanceof String) {

      var stemp = server.split(':');

      options.host.push(stemp[0]);

      options.port.push(stemp[1]);

    } else {

      if (options.server instanceof Array) {

        for (var i=0, len=options.server.length; i!=len; ++i) {

          var stemp = options.server[i].split(':');

          options.host.push(stemp[0]);

          options.port.push(stemp[1]);

        }

      }

    }

  } else {

    options.host = options.host || ['127.0.0.1'];

    options.port = options.port || [6379];

    if (!(options.host instanceof Array)) {

      options.host = [options.host];

      options.port = options.port && [options.port];

      options.socket = options.socket && [options.socket];

    }

  }

  this.debug = options.debug;

  this.clients = [];

  this.total = options.port.length;

  this.alive = 0;

  this.index = 0;

  this.speedFirst = options.speedFirst;

  this.pingInterval = options.pingInterval || 3000;

  //create clients and bind event

  for (var i=0, len=options.host.length; i!=len; ++i) {

    var client = redis.createClient(options.port[i] || options.socket[i], options.host[i], options);

    if(this.debug) {

      console.log("%s: Redis connection to %s:%d",Date(), client.host, client.port);

    }   

    this.clients.push(client);

    ++this.alive;

    var self = this;

    (function(client) {

      //when connect end

      client.on('end', function() {

        for(var i=0, len=self.total; i!=len; ++i) {

          if(self.clients[i] === client) {

            if(self.debug) {

              console.log("%s: Redis disconnect to %s:%d", Date(), client.host, client.port);

            }

            --self.alive;

            self.clients[i] = null;

            //if last client down

            if(self.alive === 0) {

              self.emit('error', new Error('All servers are down.'));

            }

            //reping

            if(options.speedFirst) {

              self._ping();

            }

            break;

          }

        }

        self.emit('end', client);

      });

      //when error

      client.on('error', function(err) {

        var alive = false;

        for (var i=0, len=self.total; i!=len; ++i) {

          if (client.port === options.port[i] && client.host === options.host[i]) {

            if (self.clients[i]) {

              alive = true;

            }

            break;

          }

        }

        if (alive && err.message && err.message.indexOf('connect ECONNREFUSED') < 0) {

          self.emit('error', err);

        }

      });

      //when connect

      client.on("connect", function() {

        var index = 0;

        for(var i=0, len=self.total; i!=len; ++i) {

          if(client.port === options.port[i] && client.host === options.host[i]) {

            index = i; break;

          }

        }

        if(self.clients[index]) {

          return;

        }

        //if reconnect

        self.clients[index] = client;

        ++self.alive;

        self._ping();

        if(self.debug) {

          console.log("%s: Redis connection to %s:%d",Date(), client.host, client.port);

        }

        self.emit('connect', client);

      });

    }) (client);

  }

  //ping each server to test the delay

  if(this.speedFirst) {

    this._doPing();

  }

}