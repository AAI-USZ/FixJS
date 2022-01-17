function()
  {
    this._has_pseudo_element_version = this._es_debugger.satisfies_version(6, 9);
    if (window.messages)
    {
      window.messages.addListener('element-selected', this._on_element_selected.bind(this));
      window.messages.addListener('reset-state', this._on_reset_state.bind(this));
      window.messages.addListener('profile-disabled', this._on_profile_disabled.bind(this));
    }

    if (window.eventHandlers)
    {
      window.eventHandlers.input['css-inspector-text-search'] = function(event, target)
      {
        this._search(target.value);
      }.bind(this);
    }
  }