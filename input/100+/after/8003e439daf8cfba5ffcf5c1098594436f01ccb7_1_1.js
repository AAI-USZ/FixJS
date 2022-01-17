function(event) {
    var as_cancel = event.findElement();
    var action_link = ActiveScaffold.find_action_link(as_cancel);
    
    if (action_link) {
      var refresh_data = action_link.readAttribute('data-cancel-refresh') || as_cancel.readAttribute('data-refresh');
      if (refresh_data && action_link.refresh_url) {
        event.memo.url = action_link.refresh_url;
      } else if (!refresh_data || as_cancel.readAttribute('href').blank()) {
        action_link.close();
        event.stop();
      }
    }
    return true;
  }