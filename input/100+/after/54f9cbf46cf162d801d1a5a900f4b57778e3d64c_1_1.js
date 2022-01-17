function() {
  "use strict";

  var bid = BrowserID,
      helpers = bid.Helpers,
      user = bid.User,
      dialogHelpers = helpers.Dialog,
      errors = bid.Errors,
      complete = helpers.complete,
      tooltip = bid.Tooltip;

  function addEmail(callback) {
    var email = helpers.getAndValidateEmail("#newEmail"),
        self=this;

    if (email) {
      dialogHelpers.addEmail.call(self, email, callback);
    }
    else {
      complete(callback, false);
    }
  }


  function cancelAddEmail() {
    this.close("cancel_state");
  }

  var Module = bid.Modules.PageModule.extend({
    start: function(options) {
      var self=this,
          originEmail = user.getOriginEmail();

      self.renderDialog("add_email", options);

      // Only show the RP's TOS/PP if the user has not been to this site
      // before.
      if(!originEmail && options.siteTOSPP) {
        dialogHelpers.showRPTosPP.call(self);
      }

      self.click("#cancel", cancelAddEmail);
      Module.sc.start.call(self, options);
    },
    submit: addEmail
    // BEGIN TESTING API
    ,
    addEmail: addEmail,
    cancelAddEmail: cancelAddEmail
    // END TESTING API
  });

  return Module;

}