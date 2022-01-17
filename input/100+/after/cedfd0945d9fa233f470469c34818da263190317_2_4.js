function(_super) {

    __extends(WebProcess, _super);

    WebProcess.name = 'WebProcess';

    function WebProcess() {
      return WebProcess.__super__.constructor.apply(this, arguments);
    }

    WebProcess.prototype.timeout = 30000;

    WebProcess.prototype.spawn = function() {
      var _this = this;
      this.port = getOpenPort();
      WebProcess.__super__.spawn.apply(this, arguments);
      return tryConnect(this.port, this.timeout, function(err) {
        if (err) {
          return _this.emit('error', err);
        } else {
          return _this.emit('ready');
        }
      });
    };

    return WebProcess;

  }