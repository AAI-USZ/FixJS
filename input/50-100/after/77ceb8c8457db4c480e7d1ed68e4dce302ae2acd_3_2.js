function(err, notifications) {
    if (err && err.type === 'connectionerror') {
      return;
    }
    if (notifications && notifications.messages) {
      for (var i = 0; i < notifications.messages.length; i++) {
        BUS.fire('api.notification', notifications.messages[i]);
      }
    }
    that.timeoutId = window.setTimeout(function() {
      that.fetch_notifications(notifications ? notifications.next_timestamp : null);
    }, 500);  // Check in 0.5secs
  }