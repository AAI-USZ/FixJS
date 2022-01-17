function(message)
  {
    switch (message.id)
    {
      case "monospacefont":
      {
        this.mono_lineheight = null;
        break;
      }
      case "network_logger":
      {
        if (message.key === "pause")
        {
          var is_paused = this._service.is_paused;
          var pause = settings.network_logger.get(message.key);
          if (is_paused && !pause)
            this._service.unpause();
          else if (!is_paused && pause)
            this._service.pause();
        }
        else if (message.key === "network-profiler-mode")
        {
          var set_profile = settings.network_logger.get(message.key) ?
                            window.app.profiles.HTTP_PROFILER : window.app.profiles.DEFAULT;
          var current_profile = settings.general.get("profile-mode");
          if (current_profile !== set_profile)
            window.services.scope.enable_profile(set_profile);
        }

        if (message.key !== "detail-view-left-pos")
        {
          this.needs_instant_update = true;
          this.update();
        }
        break;
      }
      case "general":
      {
        if (message.key === "profile-mode")
        {
          var set_network_profiler = settings.general.get(message.key) === window.app.profiles.HTTP_PROFILER;
          var is_profiler_mode = settings.network_logger.get("network-profiler-mode");
          if (is_profiler_mode !== set_network_profiler)
            settings.network_logger.set("network-profiler-mode", set_network_profiler);

        }
      }
    }
  }