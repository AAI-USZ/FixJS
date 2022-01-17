function(manager, context) {
      setProperty(manager, context);

      var record = get(manager, 'record'),
          errors = get(record, 'errors'),
          key = context.key;

      set(errors, key, null);

      if (!hasDefinedProperties(errors)) {
        manager.send('becameValid');
      }
    }