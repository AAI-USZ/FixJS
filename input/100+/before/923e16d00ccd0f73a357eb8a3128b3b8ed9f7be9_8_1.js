function(msg)
  {
    if (!this._data_runtime_id || 
        msg.activeTab.indexOf(this._data_runtime_id) == -1)
    {
      if (this._element_selected_state == CHECK_AGAIN_NO_RUNTIME)
      {
        this._get_selected_element();
        this._active_window = msg.activeTab.slice();
      }
      else
      {
        this._on_reset_state();
        // the first field is the top runtime
        this._data_runtime_id = msg.activeTab[0];
        messages.post("runtime-selected", {id: this._data_runtime_id});
        window['cst-selects']['document-select'].updateElement();
        this._active_window = msg.activeTab.slice();
        if (window.views[this._view_id].isvisible())
          this._on_show_view({id: this._view_id})
      }
    }
  }