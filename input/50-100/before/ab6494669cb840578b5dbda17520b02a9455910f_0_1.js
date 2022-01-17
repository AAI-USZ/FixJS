function() {
    logout();
    app.instance.render();
    if ($('#start').length > 0) {
      app.instance.start();
    } else {
      app.instance.mainView.render();
    }
    
    return false;
  }