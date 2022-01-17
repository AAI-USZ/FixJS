function() {
  if(NOTIFIER.hasSupport()) {
    permissionCallback(NOTIFIER.hasPermission());
    
    $("#request_notification_permission a").click(function(event) {
      NOTIFIER.requestPermission(permissionCallback);
      event.preventDefault();
    });
  }
  else {
    $("#request_notification_permission").hide();
  }

  $('#colorpicker').farbtastic('#user_color');
}