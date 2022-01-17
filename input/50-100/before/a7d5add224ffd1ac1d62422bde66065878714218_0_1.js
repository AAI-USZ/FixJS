function(manager, context) {
      setProperty(manager, context);

      var record = get(manager, 'record'),
          errors = get(record, 'errors'),
          key = context.key;

      errors.set(key, null);

      if (!hasDefinedProperties(errors)) {
        manager.send('becameValid');
      }
    }