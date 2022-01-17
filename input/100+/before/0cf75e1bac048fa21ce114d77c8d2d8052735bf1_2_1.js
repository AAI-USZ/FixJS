function add(value) {
    var arg, prefix, calledFromBackground

    // arg is the value, prefix is extracted
    if (_.isString(value)) {
      arg = arguments[1]
      prefix = SettingsUtils.getPrefix(value) || 'background'
      calledFromBackground = false;
    } else if (_.isObject(value) && arguments.length > 1) {
      calledFromBackground = true;
      // prefix is passed from background page
      prefix = arguments[1]
      if (prefix === 'background' && !window.ranCustomJS) {
        // Note(hbt): This is necessary because the settings are sent asynchronously and therefore runIt could be initialized before any settings are stored
        // in the localstorage of the site
        runCustomJS()
        window.ranCustomJS = true
      }
    }

    // get data based on prefix
    var obj = SettingsUtils.getCurrentSettings(prefix)

    // transform string to object
    var fvalue = SettingsUtils.removePrefixFromValue(value)

    var obj2 = fvalue

    // create object
    if (_.isString(fvalue)) {
      obj2 = {}
      var arr = fvalue.split('.')
      obj2[arr.pop()] = arg
      while (arr.length > 0) {
        obj2[arr.pop()] = _.clone(obj2)
      }
    }

    // merge
    obj = SettingsUtils.mergeValues(obj, obj2)

    // save in local storage
    localStorage[SettingsUtils.getStorageName(prefix)] = JSON.stringify(obj)

    // sync in background storage
    if (typeof syncSettingAllTabs !== "function" && !calledFromBackground) {
      obj = SettingsUtils.transformObject(obj, prefix)
      Post({
        action: "Settings.syncBackgroundStorage",
        arguments: [obj, prefix]
      })
    }
  }