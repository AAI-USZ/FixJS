function(manager) {
        var record = get(manager, 'record');
        record.trigger('didLoad');
      }