function(msg)
  {
    if (msg.profile == window.app.profiles.DEFAULT)
    {
      this._sheets = {};
      this._new_runtimes = null;
    }
  }