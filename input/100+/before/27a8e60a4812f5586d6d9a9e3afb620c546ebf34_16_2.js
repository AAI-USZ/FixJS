function changePassword(oncomplete) {
    var oldPassword = dom.getInner("#old_password"),
        newPassword = dom.getInner("#new_password");

    function complete(status) {
      typeof oncomplete == "function" && oncomplete(status);
    }

    function changePassword() {
      user.changePassword(oldPassword, newPassword, function(status) {
        if(status) {
          dom.removeClass("#edit_password", "edit");
          dom.setInner("#old_password", "");
          dom.setInner("#new_password", "");
        }
        else {
          tooltip.showTooltip("#tooltipInvalidPassword");
        }

        complete(status);
      }, pageHelpers.getFailure(errors.updatePassword, oncomplete));
    }

    if(!oldPassword) {
      tooltip.showTooltip("#tooltipOldRequired");
      complete(false);
    }
    else if(!newPassword) {
      tooltip.showTooltip("#tooltipNewRequired");
      complete(false);
    }
    else if(newPassword === oldPassword) {
      tooltip.showTooltip("#tooltipPasswordsSame");
      complete(false);
    }
    else if(newPassword.length < 8 || 80 < newPassword.length) {
      tooltip.showTooltip("#tooltipPasswordLength");
      complete(false);
    }
    else if(authLevel !== "password") {
      var email = getSecondary();
      // go striaght to the network level instead of user level so that if
      // the user gets the password wrong, we don't clear their info.
      network.authenticate(email, oldPassword, function(status) {
        if(status) {
          authLevel = "password";
          changePassword();
        }
        else {
          tooltip.showTooltip("#tooltipInvalidPassword");
          complete(false);
        }
      }, pageHelpers.getFailure(errors.authenticate, oncomplete));
    }
    else {
      changePassword();
    }
  }