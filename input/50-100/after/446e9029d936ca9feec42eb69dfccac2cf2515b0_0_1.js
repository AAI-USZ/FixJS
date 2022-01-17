function o(sharedProperties, instanceProperties,
      initFunction) {
    var optionNames = 'sharedProperties, instanceProperties,'
        + ' initFunction',
      config,
      proto,
      obj;

    config = getConfig(optionNames, sharedProperties,
      instanceProperties, initFunction);
    config.initFunction = config.initFunction || defaultInit;
    proto = config.sharedProperties || {};

    bless(proto);

    obj = extend(Object.create(proto), {proto: proto},
      config.instanceProperties);

    return config.initFunction.call(obj);
  }