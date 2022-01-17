function() {
    $('body').removeClass('logged-in').addClass('guest');

    var model = new WebUser;
    var view = new LoginView({model: model});
    view.render();

    model.on('login', function() {
      App.vent.trigger('webUser:init', this);
      App.vent.trigger('post:list');
    }, model);
  }