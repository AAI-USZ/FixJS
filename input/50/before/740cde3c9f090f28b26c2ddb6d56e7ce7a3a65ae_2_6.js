function(manager) {
        var record = get(manager, 'record');
        record.fire('becameError', record);
      }