function(client)
  {
    var port = client.port;
    self.current_client = null;
    if (client.connected)
    {
      window.window_manager_data.clear_debug_context();
      messages.post('host-state', {state: global_state.ui_framework.spin_state = 'inactive'});
      window.client.setup();
    }
    else if (self.connection_is_remote(client))
    {
      var remote_debug_setting = document.getElementById("remote-debug-settings");
      if (remote_debug_setting)
      {
        var tmpl = window.templates.remote_debug_settings(port + 1);
        remote_debug_setting.clearAndRender(tmpl);
      }

      UI.get_instance().get_button("toggle-remote-debug-overlay")
                       .addClass("alert");

      Overlay.get_instance().set_info_content(
        ["p", ui_strings.S_INFO_ERROR_LISTENING.replace(/%s/, port)]
      );

      // Reset this so we don't start in remote debug next time
      settings.debug_remote_setting.set('debug-remote', false);
      window.helpers.setCookie('debug-remote', "false");
    }
    else
    {
      show_info(ui_strings.S_INFO_ERROR_LISTENING.replace(/%s/, port), port);
    }
  }