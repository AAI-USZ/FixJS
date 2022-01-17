function(data) {
    $('body').removeClass('guest').addClass('logged-in');

    var model = data instanceof WebUser ? data : new WebUser(data);
    var view = new NavbarView({model: model});
    view.render();

    model.on('destroy',function() {
      view.close();
      App.vent.trigger('webUser:guest');
      App.vent.trigger('post:list');
    });
    this.vent.on('logout', model.destroy, model);
  }