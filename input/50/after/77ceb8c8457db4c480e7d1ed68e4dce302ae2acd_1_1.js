function (user) {
  $('body').empty().append('<div id=widgets></div>');

  this.initHashChangeTracker();
  this.init(user);
}