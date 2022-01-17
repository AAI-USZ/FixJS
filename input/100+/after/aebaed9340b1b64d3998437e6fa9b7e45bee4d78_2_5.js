function(last_selected_view, msg)
  {
    if (msg.profile == window.app.profiles.DEFAULT)
    {
      var tag = window.tag_manager.set_callback(this, function(status, message)
      {
        const OBJECT_ID = 0;
        if (!message[OBJECT_ID])
          this._show_last_selected_view(last_selected_view);
      });
      var esdi = window.services["ecmascript-debugger"];
      esdi.requestGetSelectedObject(tag);
    }
    else
      this._show_last_selected_view(last_selected_view);
    
    window.messages.removeListener("profile-enabled", this._on_profile_enabled_cb);

  }