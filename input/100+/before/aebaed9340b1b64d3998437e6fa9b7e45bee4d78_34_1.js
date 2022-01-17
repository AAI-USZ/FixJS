function(id, name, container_class)
  {
    this.init(id, name, container_class);
    window.eventHandlers.click['color-palette-add-color'] =
      this._handlers['color-palette-add-color'];
    window.eventHandlers.dblclick['color-palette-edit-color'] =
      this._handlers['color-palette-edit-color'];
    window.eventHandlers.mouseup['color-palette-edit-color'] = function()
    {
      if (window.getSelection())
      {
        window.getSelection().removeAllRanges();
      }
    }
    ContextMenu.get_instance().register("color-palette", this._menu, true);
  }