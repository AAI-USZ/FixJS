function() {
    window.KexpApp = PopupApp;
    options.popout = $("body").hasClass("popout");
    window.KexpApp.start(options);
  }