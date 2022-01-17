function(request, status, err, lock, action)
  {
    var errmsg = request.statusText;

    this.set_busy(false, null, lock);
    request.abort();

    if (request.status && errmsg)
      this.display_message(this.get_label('servererror') + ' (' + errmsg + ')', 'error');
    else if (status == 'timeout')
      this.display_message(this.get_label('requesttimedout'), 'error');
    else if (request.status == 0 && status != 'abort')
      this.display_message(this.get_label('servererror') + ' (No connection)', 'error');

    // re-send keep-alive requests after 30 seconds
    if (action == 'keep-alive')
      setTimeout(function(){ ref.keep_alive(); }, 30000);
    else if (action == 'check-recent')
      setTimeout(function(){ ref.check_for_recent(false); }, 30000);
  }