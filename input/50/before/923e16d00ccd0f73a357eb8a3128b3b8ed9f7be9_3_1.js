function()
  {
    services["ecmascript-debugger"].addListener("window-filter-change", this._on_window_filter_change.bind(this));
    this.init();
  }