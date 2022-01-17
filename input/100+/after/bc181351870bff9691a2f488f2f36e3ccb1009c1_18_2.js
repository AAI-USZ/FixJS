function() {
  "use strict";

  var bid = BrowserID,
      sc,
      win,
      add,
      email,
      auth_url,
      dom = bid.DOM,
      helpers = bid.Helpers,
      dialogHelpers = helpers.Dialog,
      complete = helpers.complete;

  function verify(callback) {
    this.publish("primary_user_authenticating");

    // set up some information about what we're doing
    win.sessionStorage.primaryVerificationFlow = JSON.stringify({
      add: add,
      email: email
    });

    var url = helpers.toURL(auth_url, {email: email});
    
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

      self.renderDialog("verify_primary_user", {
        email: data.email,
        auth_url: data.auth_url,
        requiredEmail: data.requiredEmail || false,
        personaTOSPP: data.personaTOSPP
      });

      if (data.siteTOSPP) {
        dialogHelpers.showRPTosPP.call(self);
      }

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