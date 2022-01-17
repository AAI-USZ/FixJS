function Vein(options) {
      var _base, _base1, _base2, _base3, _base4, _base5, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      this.options = options != null ? options : {};
      this.getId = __bind(this.getId, this);

      this.handleClose = __bind(this.handleClose, this);

      this.handleMessage = __bind(this.handleMessage, this);

      this.handleError = __bind(this.handleError, this);

      this.handleOpen = __bind(this.handleOpen, this);

      this.refresh = __bind(this.refresh, this);

      this.connect = __bind(this.connect, this);

      this.disconnect = __bind(this.disconnect, this);

      this.cookie = __bind(this.cookie, this);

      if (isBrowser) {
        if ((_ref = (_base = this.options).host) == null) {
          _base.host = window.location.hostname;
        }
        if ((_ref1 = (_base1 = this.options).port) == null) {
          _base1.port = (window.location.port.length > 0 ? parseInt(window.location.port) : 80);
        }
        if ((_ref2 = (_base2 = this.options).secure) == null) {
          _base2.secure = window.location.protocol === 'https:';
        }
      }
      if ((_ref3 = (_base3 = this.options).path) == null) {
        _base3.path = '/vein';
      }
      if ((_ref4 = (_base4 = this.options).forceBust) == null) {
        _base4.forceBust = true;
      }
      if ((_ref5 = (_base5 = this.options).debug) == null) {
        _base5.debug = false;
      }
      this.socket = new eio.Socket(this.options);
      this.socket.on('open', this.handleOpen);
      this.socket.on('error', this.handleError);
      this.socket.on('message', this.handleMessage);
      this.socket.on('close', this.handleClose);
      return;
    }