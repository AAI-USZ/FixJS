function (options) {
        var defaultProperties = config.defaultProperties || {},
          sharedProperties = extend(config.sharedProperties || {}, initObj),
          instance = extend(defaultProperties, options),
          obj = extend(o(sharedProperties, instance)),
          init = config.instanceInit;
        return ((typeof init === 'function')
          ? init.call(obj)
          : obj);
      }