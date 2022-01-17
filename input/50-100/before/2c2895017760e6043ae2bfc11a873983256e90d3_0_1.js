function() {
    if($(this).prop("checked")) {
      window.webkitNotifications.requestPermission();
    }
  }