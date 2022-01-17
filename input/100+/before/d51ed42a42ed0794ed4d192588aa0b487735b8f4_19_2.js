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

        if (message.key !== "detail-view-left-pos")
        {
          this.needs_instant_update = true;
          this.update();
        }
        break;
      }
    }
  }