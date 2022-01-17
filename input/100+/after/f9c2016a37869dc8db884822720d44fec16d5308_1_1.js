function()
  {
    var config_arr = [];
    for (var prop in stop_at_settings)
    {
      var index = stop_at_id_map[prop];
      var depending = requires_version_map[index];
      if (depending && !ecma_debugger.satisfies_version.apply(ecma_debugger, depending))
        continue;

      if (prop == "script")
        config_arr[index] = 1;
      else if (prop == "use_reformat_condition")
        config_arr[index] = stop_at_settings[prop] ? reformat_condition : "";
      else
        config_arr[index] = stop_at_settings[prop] ? 1 : 0;
    }
    return config_arr;
  }