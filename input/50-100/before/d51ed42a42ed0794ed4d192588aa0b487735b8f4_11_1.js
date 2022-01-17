function(msg)
  {
    if (msg.profile == window.app.profiles.DEFAULT)
    {
      var dbg_ctx = window.window_manager_data.get_debug_context();
      if (dbg_ctx)
      {
        var tag = window.tag_manager.set_callback(null, set_new_debug_context, [dbg_ctx]);
        ecma_debugger.requestListRuntimes(tag, [[],1]);
      }
    }
  }