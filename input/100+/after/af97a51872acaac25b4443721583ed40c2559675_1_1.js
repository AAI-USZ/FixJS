function() {
  "use strict";

  var bid = BrowserID,
      dom = bid.DOM,
      user = bid.User,
      errors = bid.Errors,
      domHelpers = bid.DOMHelpers,
      email;

  var Module = bid.Modules.PageModule.extend({
    start: function(options) {
      options = options || {};
      email = options.email;

      var self = this;

      self.renderWait("is_this_your_computer", options);

      // renderWait does not automatically focus the first input element or
      // button, so it must be done manually.
      dom.focus("#this_is_my_computer");

      self.click("#this_is_my_computer", self.yes);
      self.click("#this_is_not_my_computer", self.no);

      // Force all the buttons to be of equal width
      domHelpers.makeEqualWidth("#your_computer_content button");

      Module.sc.start.call(self, options);
    },

    yes: function() {
      this.confirmed(true);
    },

    no: function() {
      this.confirmed(false);
    },

    confirmed: function(status) {
      var self=this;
      user.setComputerOwnershipStatus(status, function() {
        self.close("user_computer_status_set", { users_computer: status });
      }, self.getErrorDialog(errors.setComputerOwnershipStatus));
    }
  });


  return Module;

}