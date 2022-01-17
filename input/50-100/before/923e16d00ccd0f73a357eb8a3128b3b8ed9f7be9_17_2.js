function()
  {
    if(!_is_initial_settings_set )
    {
      var config_arr = [], prop = '';
      for ( prop in stop_at_settings )
      {
        config_arr[stop_at_id_map[prop]] =
          ( ( stop_at_user_settings[prop] = settings['js_source'].get(prop) )
            || stop_at_settings[prop] ) && 1 || 0;
      }
      ecma_debugger.requestSetConfiguration(0, config_arr);
      _is_initial_settings_set = true;
    }
  }