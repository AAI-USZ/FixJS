function() {
  "use strict";

  var bid = BrowserID,
      dom = bid.DOM,
      helpers = bid.Helpers,
      dialogHelpers = helpers.Dialog,
      errors = bid.Errors,
      complete = helpers.complete,
      tooltip = bid.Tooltip,
      hints = ["addressInfo"],
      ANIMATION_TIME = 250;

  function hideHint(selector) {
    $("." + selector).hide();
  }

  function showHint(selector, callback) {
    _.each(hints, function(className) {
      if (className !== selector) {
        hideHint(className);
      }
    });

    $("." + selector).fadeIn(ANIMATION_TIME, function() {
      dom.fireEvent(window, "resize");
      complete(callback);
    });
  }

  function addEmail(callback) {
    var email = helpers.getAndValidateEmail("#newEmail"),
        self=this;

    if (email) {
      showHint("addressInfo");
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
      hideHint("addressInfo");

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