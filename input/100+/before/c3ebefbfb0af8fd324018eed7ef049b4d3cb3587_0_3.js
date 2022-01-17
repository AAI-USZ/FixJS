function(config, options) {
    var code, key, value;
    code = mb.generateLibraryCode();
    for (key in config) {
      value = config[key];
      if (contains(RESERVED, key)) {
        continue;
      }
      code += mb.generateModuleCode(key, value, options);
    }
    if (config.hasOwnProperty('_alias')) {
      code += mb.generateAliasCode(config._alias);
    }
    if (config.hasOwnProperty('_publish')) {
      code += mb.generatePublishCode(config._publish);
    }
    if (config.hasOwnProperty('_load')) {
      code += mb.generateLoadCode(config._load);
    }
    return code;
  }