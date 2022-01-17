function(msg) {
      var callback, docOp, error, oldInflightOp, op, path, response, undo, value, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if (msg.open === true) {
        this.state = 'open';
        this._create = false;
        if (this.created == null) this.created = !!msg.create;
        if (msg.type) this._setType(msg.type);
        if (msg.create) {
          this.created = true;
          this.snapshot = this.type.create();
        } else {
          if (this.created !== true) this.created = false;
          if (msg.snapshot !== void 0) this.snapshot = msg.snapshot;
        }
        if (msg.v != null) this.version = msg.v;
        if (this.inflightOp) {
          response = {
            doc: this.name,
            op: this.inflightOp,
            v: this.version
          };
          if (this.inflightSubmittedIds.length) {
            response.dupIfSource = this.inflightSubmittedIds;
          }
          this.connection.send(response);
        } else {
          this.flush();
        }
        this.emit('open');
        return typeof this._openCallback === "function" ? this._openCallback(null) : void 0;
      } else if (msg.open === false) {
        if (msg.error) {
          if (typeof console !== "undefined" && console !== null) {
            console.error("Could not open document: " + msg.error);
          }
          this.emit('error', msg.error);
          if (typeof this._openCallback === "function") {
            this._openCallback(msg.error);
          }
        }
        this.state = 'closed';
        this.emit('closed');
        if (typeof this._closeCallback === "function") this._closeCallback();
        return this._closeCallback = null;
      } else if (msg.op === null && error === 'Op already submitted') {} else if ((msg.op === void 0 && msg.v !== void 0) || (msg.op && (_ref = msg.meta.source, __indexOf.call(this.inflightSubmittedIds, _ref) >= 0))) {
        oldInflightOp = this.inflightOp;
        this.inflightOp = null;
        this.inflightSubmittedIds.length = 0;
        error = msg.error;
        if (error) {
          if (this.type.invert) {
            undo = this.type.invert(oldInflightOp);
            if (this.pendingOp) {
              _ref2 = this._xf(this.pendingOp, undo), this.pendingOp = _ref2[0], undo = _ref2[1];
            }
            this._otApply(undo, true);
          } else {
            this.emit('error', "Op apply failed (" + error + ") and the op could not be reverted");
          }
          _ref3 = this.inflightCallbacks;
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            callback = _ref3[_i];
            callback(error);
          }
        } else {
          if (msg.v !== this.version) {
            throw new Error('Invalid version from server');
          }
          this.serverOps[this.version] = oldInflightOp;
          this.version++;
          this.emit('acknowledge', oldInflightOp);
          _ref4 = this.inflightCallbacks;
          for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
            callback = _ref4[_j];
            callback(null, oldInflightOp);
          }
        }
        return this.flush();
      } else if (msg.op) {
        if (msg.v < this.version) return;
        if (msg.doc !== this.name) {
          return this.emit('error', "Expected docName '" + this.name + "' but got " + msg.doc);
        }
        if (msg.v !== this.version) {
          return this.emit('error', "Expected version " + this.version + " but got " + msg.v);
        }
        op = msg.op;
        this.serverOps[this.version] = op;
        docOp = op;
        if (this.inflightOp !== null) {
          _ref5 = this._xf(this.inflightOp, docOp), this.inflightOp = _ref5[0], docOp = _ref5[1];
        }
        if (this.pendingOp !== null) {
          _ref6 = this._xf(this.pendingOp, docOp), this.pendingOp = _ref6[0], docOp = _ref6[1];
        }
        this.version++;
        return this._otApply(docOp, true);
      } else if (msg.meta) {
        _ref7 = msg.meta, path = _ref7.path, value = _ref7.value;
        switch (path != null ? path[0] : void 0) {
          case 'shout':
            return this.emit('shout', value);
          default:
            return typeof console !== "undefined" && console !== null ? console.warn('Unhandled meta op:', msg) : void 0;
        }
      } else {
        return typeof console !== "undefined" && console !== null ? console.warn('Unhandled document message:', msg) : void 0;
      }
    }