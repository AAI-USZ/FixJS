function()
  {
    this._filters = {};
    this._filter_bound = this._filter.bind(this);

    window.messages.addListener("setting-changed", this._on_setting_change.bind(this));
    window.messages.addListener("debug-context-selected", this.clear_all.bind(this));

    var logger = window.services["console-logger"];
    logger.add_listener("consolemessage", this._on_console_message.bind(this));
  }