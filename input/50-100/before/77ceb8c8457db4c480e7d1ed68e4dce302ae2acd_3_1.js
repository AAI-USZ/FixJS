function NotificationHandler() {
  // Start fetching, when user is available
  if (window.API && window.API.user() !== null) {
    this.fetch_notifications();
  } else {
    BUS.on('api.user', function() {
      this.fetch_notifications();
    }, this);
  }
}