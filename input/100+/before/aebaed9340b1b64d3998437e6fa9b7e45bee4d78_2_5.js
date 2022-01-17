function(last_selected_view)
  {
    var tag = tagManager.set_callback(null, function(status, message)
    {
      const OBJECT_ID = 0;
      if (!message[OBJECT_ID])
      {
        // if last_selected_view is hidden and the tab has a fallback_view_id, use that.
        if (
          views[last_selected_view] &&
          views[last_selected_view].is_hidden &&
          views[last_selected_view].fallback_view_id
        )
        {
          last_selected_view = views[last_selected_view].fallback_view_id;
        }
        UI.get_instance().show_view(last_selected_view);
      }
    });
    window.services['ecmascript-debugger'].requestGetSelectedObject(tag);
  }