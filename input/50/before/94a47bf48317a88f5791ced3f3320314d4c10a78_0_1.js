function() {
    view.init(this);
    if(navigator.network && navigator.network.connection == "NONE") {
      view.showError("networkNone", "There is no network connection");
    }
  }