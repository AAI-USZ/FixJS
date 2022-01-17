function() {

    function Connection(host) {
      var _this = this;
      this.docs = {};
      this.state = 'connecting';
      this.socket = new BCSocket(host, {
        reconnect: true
      });
      this.socket.onmessage = function(msg) {
        var docName;
        if (msg.auth === null) {
          _this.lastError = msg.error;
          _this.disconnect();
          return _this.emit('connect failed', msg.error);
        } else if (msg.auth) {
          _this.id = msg.auth;
          _this.setState('ok');
          return;
        }
        docName = msg.doc;
        if (docName !== void 0) {
          _this.lastReceivedDoc = docName;
        } else {
          msg.doc = docName = _this.lastReceivedDoc;
        }
        if (_this.docs[docName]) {
          return _this.docs[docName]._onMessage(msg);
        } else {
          return typeof console !== "undefined" && console !== null ? console.error('Unhandled message', msg) : void 0;
        }
      };
      this.connected = false;
      this.socket.onclose = function(reason) {
        _this.setState('disconnected', reason);
        if (reason === 'Closed' || reason === 'Stopped by server') {
          return _this.setState('stopped', _this.lastError || reason);
        }
      };
      this.socket.onerror = function(e) {
        return _this.emit('error', e);
      };
      this.socket.onopen = function() {
        _this.lastError = _this.lastReceivedDoc = _this.lastSentDoc = null;
        return _this.setState('handshaking');
      };
      this.socket.onconnecting = function() {
        return _this.setState('connecting');
      };
    }

    Connection.prototype.setState = function(state, data) {
      var doc, docName, _ref, _results;
      if (this.state === state) return;
      this.state = state;
      if (state === 'disconnected') delete this.id;
      this.emit(state, data);
      _ref = this.docs;
      _results = [];
      for (docName in _ref) {
        doc = _ref[docName];
        _results.push(doc._connectionStateChanged(state, data));
      }
      return _results;
    };

    Connection.prototype.send = function(data) {
      var docName;
      docName = data.doc;
      if (docName === this.lastSentDoc) {
        delete data.doc;
      } else {
        this.lastSentDoc = docName;
      }
      return this.socket.send(data);
    };

    Connection.prototype.disconnect = function() {
      return this.socket.close();
    };

    Connection.prototype.makeDoc = function(name, data, callback) {
      var doc,
        _this = this;
      if (this.docs[name]) throw new Error("Doc " + name + " already open");
      doc = new Doc(this, name, data);
      this.docs[name] = doc;
      return doc.open(function(error) {
        if (error) delete _this.docs[name];
        return callback(error, (!error ? doc : void 0));
      });
    };

    Connection.prototype.openExisting = function(docName, callback) {
      var doc;
      if (this.state === 'stopped') return callback('connection closed');
      if (this.docs[docName]) return callback(null, this.docs[docName]);
      return doc = this.makeDoc(docName, {}, callback);
    };

    Connection.prototype.open = function(docName, type, callback) {
      var doc;
      if (this.state === 'stopped') return callback('connection closed');
      if (typeof type === 'function') {
        callback = type;
        type = 'text';
      }
      callback || (callback = function() {});
      if (typeof type === 'string') type = types[type];
      if (!type) throw new Error("OT code for document type missing");
      if (docName == null) {
        throw new Error('Server-generated random doc names are not currently supported');
      }
      if (this.docs[docName]) {
        doc = this.docs[docName];
        if (doc.type === type) {
          callback(null, doc);
        } else {
          callback('Type mismatch', doc);
        }
        return;
      }
      return this.makeDoc(docName, {
        create: true,
        type: type.name
      }, callback);
    };

    return Connection;

  }