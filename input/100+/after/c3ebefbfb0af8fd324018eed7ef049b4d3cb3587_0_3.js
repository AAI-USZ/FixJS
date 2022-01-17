function(config, options) {
    var code, key, module_code, success, value;
    code = mb.generateLibraryCode();
    success = true;
    for (key in config) {
      value = config[key];
      if (contains(RESERVED, key)) {
        continue;
      }
      module_code = mb.generateModuleCode(key, value, options);
      if (module_code) {
        code += module_code;
      } else {
        success = false;
      }
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
    if (success) {
      return code;
    } else {

    }
  }