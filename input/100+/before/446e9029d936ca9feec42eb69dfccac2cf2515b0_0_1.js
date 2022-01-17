function factory(sharedProperties, defaultProperties,
        initFunction) {
      var optionNames = 'sharedProperties, defaultProperties,'
          + ' initFunction',
        config;

      config = getConfig(optionNames, sharedProperties,
        defaultProperties, initFunction);
      config.initFunction = config.initFunction || defaultInit;

      return bless(function (options) {
        var defaultProperties = config.defaultProperties || {},
          sharedProperties = config.sharedProperties || {},
          instance = extend(defaultProperties, options),
          obj = extend(o(sharedProperties, instance));
        return config.initFunction.call(obj);
      });
    }