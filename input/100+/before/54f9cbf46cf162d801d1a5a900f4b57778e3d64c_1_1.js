function() {
  "use strict";

  var bid = BrowserID,
      helpers = bid.Helpers,
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
          templateData = helpers.extend({}, options, {
            privacy_url: options.privacyURL || null,
            tos_url: options.tosURL || null
          });

      self.renderDialog("add_email", templateData);

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