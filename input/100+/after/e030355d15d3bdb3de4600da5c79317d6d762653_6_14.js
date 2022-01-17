function(callback) {
      var message,
        _this = this;
      this.autoOpen = true;
      if (this.state !== 'closed') {
        return;
      }
      message = {
        doc: this.name,
        open: true
      };
      if (this.snapshot === void 0) {
        message.snapshot = null;
      }
      if (this.type) {
        message.type = this.type.name;
      }
      if (this.version != null) {
        message.v = this.version;
      }
      if (this._create) {
        message.create = true;
      }
      this.connection.send(message);
      this.state = 'opening';
      return this._openCallback = function(error) {
        _this._openCallback = null;
        return typeof callback === "function" ? callback(error) : void 0;
      };
    }