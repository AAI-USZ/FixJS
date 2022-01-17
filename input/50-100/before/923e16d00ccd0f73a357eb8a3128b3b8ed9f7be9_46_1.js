function()
  {
    if (window.messages)
    {
      window.messages.addListener('active-tab', this._on_active_tab.bind(this));
      window.messages.addListener('reset-state', this._on_reset_state.bind(this));
    }
  }