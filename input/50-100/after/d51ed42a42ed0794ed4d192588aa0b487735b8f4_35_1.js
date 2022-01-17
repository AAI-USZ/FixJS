function()
  {
    this.required_services = ["ecmascript-debugger"];
    this.init(id, name, container_class);
    this._container = null;
    this._update_layout_bound = this.update_layout.bind(this);
    this._update_offsets_bound = this.update_offsets.bind(this)
    window.messages.addListener("setting-changed", this._on_setting_change.bind(this));
  }