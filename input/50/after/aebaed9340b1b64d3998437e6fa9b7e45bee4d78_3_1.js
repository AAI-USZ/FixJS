function()
  {
    services["ecmascript-debugger"].addListener("window-filter-change", this._on_window_filter_change.bind(this));
    window.messages.addListener("profile-enabled", this._on_profile_enabled.bind(this));
    this.init();
  }