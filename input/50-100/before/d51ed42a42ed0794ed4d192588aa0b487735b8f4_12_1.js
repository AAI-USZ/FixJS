function(msg)
  {
    if(msg.id == 'js_source' )
    {
      var key = msg.key;
      var value = settings['js_source'].get(key);
      stop_at_settings[key] = value;
      var msg = get_config_msg();
      ecma_debugger.requestSetConfiguration(cls.TagManager.IGNORE_RESPONSE, msg);

      if (msg.key == 'reformat_javascript')
      {
        new ConfirmDialog(ui_strings.D_REFORMAT_SCRIPTS,
                          function() { window.runtimes.reloadWindow(); }).show();
      }
    }
  }