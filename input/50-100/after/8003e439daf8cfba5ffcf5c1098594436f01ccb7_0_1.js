function(event) {
    var as_cancel = jQuery(this);
    var action_link = ActiveScaffold.find_action_link(as_cancel);  
    
    if (action_link) {
      var cancel_url = as_cancel.attr('href');
      var refresh_data = action_link.tag.data('cancel-refresh') || as_cancel.data('refresh');
      if (!refresh_data || !cancel_url) {
        action_link.close();
        return false;
      }
    }
    return true;
  }