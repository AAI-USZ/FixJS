function(data) {
    $('body').removeClass('guest').addClass('logged-in');

    var model = data instanceof WebUser ? data : new WebUser(data);
    var navbarView = new NavbarView({model: model});
    navbarView.render();

    model.on('destroy',function() {
      navbarView.close();
      App.vent.trigger('webUser:guest');
    });

    model.on('destroy', function() {App.vent.trigger('login')});
    this.vent.on('logout', model.destroy, model);
  }