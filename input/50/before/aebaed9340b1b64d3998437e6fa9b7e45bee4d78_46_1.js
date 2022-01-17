function(msg)
  {
    if (!msg.runtimes_with_dom.length)
    {
      this._on_reset_state();
    }
    else
    {
      this._new_runtimes = msg.runtimes_with_dom.slice(0);
      this._check_new_runtimes();
    }
  }