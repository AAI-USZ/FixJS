function() {
      view.close();
      App.vent.trigger('webUser:guest');
      App.vent.trigger('post:list');
    }