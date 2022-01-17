function(id, name, container_class)
  {
    this.init(id, name, container_class);
    this._selected_ele = null;
    window.messages.add_listener("element-selected", this._on_element_selected.bind(this));
  }