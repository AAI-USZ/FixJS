function() {
        var instance;
        instance = $.data(this, 'sqstatus');
        if (!instance) {
          return $.data(this, 'sqstatus', new SQStatus(this, args));
        } else if (typeof options === "string") {
          return instance[command].apply(instance, args);
        }
      }