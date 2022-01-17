function (user) {
  this.notificationFetcher = new NotificationHandler();

  $('body').empty().append('<div id=widgets></div>');

  this.initHashChangeTracker();
  this.init(user);
}