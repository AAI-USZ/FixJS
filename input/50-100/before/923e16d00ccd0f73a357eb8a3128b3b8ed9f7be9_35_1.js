function(msg)

  {

    this._top_rt_id = msg.runtimes_with_dom[0];

    if (this._take_screenshot && this.isvisible())

    {

      this._pixel_magnifier.scale = 1;

      window.messages.post('screenshot-scale',

                             {scale: this._pixel_magnifier.scale});

      this._get_window_size();

    }

  }