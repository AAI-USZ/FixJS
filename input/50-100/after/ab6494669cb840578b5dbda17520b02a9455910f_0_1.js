function() {
    logout();
    app.instance.render();
    if ($('#start').length > 0) {
      app.instance.start();
    } else {
      window.location.reload();
    }
    
    return false;
  }