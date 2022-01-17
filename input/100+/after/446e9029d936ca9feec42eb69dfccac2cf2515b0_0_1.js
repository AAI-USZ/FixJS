function factory(sharedProperties, defaultProperties,
        instanceInit, factoryInit) {
      var optionNames = 'sharedProperties, defaultProperties,'
          + ' instanceInit, factoryInit',
        config,
        initObj = o();

      config = getConfig(optionNames, sharedProperties,
        defaultProperties, instanceInit, factoryInit);
      config.instanceInit = config.instanceInit || defaultInit;

      // factoryInit can be used to initialize shared private state.
      if (typeof config.factoryInit === 'function') {
        config.factoryInit.call(initObj);
      }

      return bless(function (options) {
        var defaultProperties = config.defaultProperties || {},
          sharedProperties = extend(config.sharedProperties || {}, initObj),
          instance = extend(defaultProperties, options),
          obj = extend(o(sharedProperties, instance)),
          init = config.instanceInit;
        return ((typeof init === 'function')
          ? init.call(obj)
          : obj);
      });
    }