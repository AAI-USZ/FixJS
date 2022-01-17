function(iface, cb, channel) {
      var cmd;
      if (channel == null) {
        channel = false;
      }
      cmd = ['start', iface];
      if (channel) {
        cmd.push(channel);
      }
      return this.run(cmd, function(res) {
        var _ref;
        if (((_ref = res.enabledOn) != null ? _ref.length : void 0) > 0) {
          res.success = true;
        } else {
          res.success = false;
        }
        return cb(res);
      });
    }