function() {
    $('body').removeClass('logged-in').addClass('guest');
    var model = new WebUser;
    var view = new LoginView({model: model});
    view.render();
    model.on('login', function() {
      view.close();
      App.vent.trigger('webUser:init', this);
    }, model);
  }