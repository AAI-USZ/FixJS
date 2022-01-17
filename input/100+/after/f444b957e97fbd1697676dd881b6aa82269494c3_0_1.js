function() {
      var args, cmd, command;
      cmd = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      command = ("" + cmd).toLowerCase();
      return this.each(function() {
        var instance;
        instance = $.data(this, 'sqstatus');
        if (!instance) {
          return $.data(this, 'sqstatus', new SQStatus(this, args));
        } else if (typeof options === "string") {
          return instance[command].apply(instance, args);
        }
      });
    }