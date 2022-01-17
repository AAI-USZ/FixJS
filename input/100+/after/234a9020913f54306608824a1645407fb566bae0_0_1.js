function(opts) {
    opts = opts || {}
    if (!this.host)
      return;
    socket = new WebSocket(this.host+":4444", "vvvvjs");
    var initialized = false;
    var opened = false;
    socket.onopen = function() {
      opened = true;
      console.log("connected to VVVV ...");
      that.pushCompletePatch();
      window.setTimeout(function() {
        that.pullCompletePatch();
      }, 1000);
      if (opts.success)
        opts.success();
    }
    socket.onclose = function() {
      if (!opened && opts.error)
        opts.error();
      opened = false;
    }
    socket.onmessage = function(m) {
      patch.doLoad(m.data);
      if (!initialized) {
        initialized = true;
        if (patch.success)
          patch.success();
        patch.afterUpdate();
      }
      else
        patch.afterUpdate();
    }
  }