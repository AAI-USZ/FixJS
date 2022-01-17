function() {
    view.init(this);
    if(navigator.network && navigator.network.connection == "NONE") {
      view.showError("networkNone", "#error", "There is no network connection");
    }
  }