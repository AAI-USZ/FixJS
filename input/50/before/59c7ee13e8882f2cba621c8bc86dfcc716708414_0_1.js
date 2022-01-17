function() {
      navbarView.close();
      App.vent.trigger('webUser:guest');
    }