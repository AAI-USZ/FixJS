function()
  {
    if (!_is_initial_settings_set)
    {
      for (var prop in stop_at_settings)
      {
        var value = window.settings['js_source'].get(prop);
        if (typeof value == "boolean")
          stop_at_settings[prop] = value;
      }
      var msg = get_config_msg();
      ecma_debugger.requestSetConfiguration(cls.TagManager.IGNORE_RESPONSE, msg);
      _is_initial_settings_set = true;
    }
  }