function(manager) {
      var record = get(manager, 'record');
      record.fire('becameInvalid', record);
    }