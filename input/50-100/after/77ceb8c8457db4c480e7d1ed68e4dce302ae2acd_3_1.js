function NotificationHandler(api) {
  this.api = api;
  this.timeoudId = undefined;
  this.request = undefined;

  BUS.on('api.user', function() {
    this.restart();
  }, this);
}