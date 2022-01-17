function() {
  "use strict";

  var bid = BrowserID,
      sc,
      win,
      add,
      email,
      auth_url,
      helpers = bid.Helpers,
      complete = helpers.complete;

  function verify(callback) {
    this.publish("primary_user_authenticating");

    // replace any hashes that may be there already.
    var returnTo = win.document.location.href.replace(/#.*$/, "");

    var type = add ? "ADD_EMAIL" : "CREATE_EMAIL";
    var url = helpers.toURL(auth_url, {
      email: email,
      return_to: returnTo + "#" + type + "=" +email
    });

    win.document.location = url;

    complete(callback);
  }

  function cancel(callback) {
    this.close("cancel_state");
    callback && callback();
  }

  var Module = bid.Modules.PageModule.extend({
    start: function(data) {
      var self=this;
      data = data || {};

      win = data.window || window;
      add = data.add;
      email = data.email;
      auth_url = data.auth_url;

      var templateData = helpers.extend({}, data, {
        requiredEmail: data.requiredEmail || false,
        privacy_url: data.privacyURL || null,
        tos_url: data.tosURL || null
      });
      self.renderDialog("verify_primary_user", templateData);

      self.click("#cancel", cancel);

      sc.start.call(self, data);
    },

    submit: verify

    // BEGIN TESTING API
    ,
    cancel: cancel
    // END TESTING API
  });

  sc = Module.sc;

  return Module;
}