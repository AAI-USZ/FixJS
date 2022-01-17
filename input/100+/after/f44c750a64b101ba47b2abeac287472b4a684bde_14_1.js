function(container)
  {
    this._container = container;
    var storage_data = this.data.get_cookies();
    this._sortable_table.set_data(storage_data);
    if (!this._update_expiry_interval)
    {
      this._update_expiry_interval = setInterval(this._bound_update_expiry, 15000);
    }
    this._before_table_render();
    this._table_elem = container.clearAndRender(this._sortable_table.render());
    this._after_table_render({table: this._table_elem});
    window.messages.addListener("debug-context-selected", this._clear_container.bind(this));
  }