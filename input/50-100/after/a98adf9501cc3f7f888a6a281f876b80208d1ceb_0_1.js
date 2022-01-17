function(values) {
      if(!values) {
        cb.call(self, undefined);
        return;
      }

      var members = values.map(function(value) {
        return value.split(':').splice(1).join(':');
      });

      cb.call(self, members);
    }