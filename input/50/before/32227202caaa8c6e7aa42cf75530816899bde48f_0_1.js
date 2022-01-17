function(message, priority) {
      if (priority == null) priority = 'info';
      if (priority === 'deprecate') priority = 'warn';
      Ext.log({
        msg: message,
        level: priority
      });
    }