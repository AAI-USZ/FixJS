function(manager, context) {
      setProperty(manager, context);

      var record = get(manager, 'record'),
          errors = get(record, 'errors'),
          key = context.key;

      delete errors[key];

      if (!hasDefinedProperties(errors)) {
        manager.send('becameValid');
      }
    }