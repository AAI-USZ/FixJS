function(client)
  {
    var is_remote_connection = this.connection_is_remote(client);
    var port = client.port;

    if (!is_remote_connection && window.topCell)
    {
      this.create_top_level_views(window.services);
      if(window.topCell)
      {
        window.topCell.cleanUp();
      }
    }

    if(_first_setup)
    {
      _first_setup = false;
      _waiting_screen_timeout = setTimeout(function() {
        show_info(ui_strings.S_INFO_WAITING_FORHOST_CONNECTION.replace(/%s/, port), port);
      }, 250);
    }
    else if (is_remote_connection)
    {
      UI.get_instance().get_button("toggle-remote-debug-overlay")
                       .removeClass("alert");

      Overlay.get_instance().set_info_content(
        window.templates.remote_debug_waiting_help(port)
      );

      var remote_debug_setting = document.getElementById("remote-debug-settings");
      if (remote_debug_setting)
      {
        var tmpl = window.templates.remote_debug_waiting(port);
        remote_debug_setting.clearAndRender(tmpl);
      }
    }
    else
    {
      show_info(ui_strings.S_INFO_WAITING_FORHOST_CONNECTION.replace(/%s/, port), port);
    }
  }