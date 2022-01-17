function onauthready() {
  if (! server) {
    return;
  }
  var self = server;
  Auth.onlogin = function () {
    self.loginStatus.text(Auth.email + ' ');
    var logoutEl = $('<a href="#">logout</a>').attr('style', styles.link);
    self.loginStatus.append(logoutEl);
    logoutEl.click(function () {
      // FIXME: should I reload here?
      Auth.logout();
      return false;
    });
  };
  Auth.onlogout = function () {
    self.loginStatus.clear();
    var loginEl = $('<a href="#">login</a>').attr('style', styles.link);
    self.loginStatus.append(loginEl);
    loginEl.click(function () {
      Auth.request();
    });
  };
}