function emailSubmit(oncomplete) {
      var email = helpers.getAndValidateEmail("#email"),
          self = this;

      if (email) {

        user.isEmailRegistered(email, function(isRegistered) {
          if(isRegistered) {
            $('#registeredEmail').html(email);
            showNotice(".alreadyRegistered");
            oncomplete && oncomplete(false);
          }
          else {
            user.addressInfo(email, function(info) {
              if(info.type === "primary") {
                createPrimaryUser.call(self, info, oncomplete);
              }
              else {
                enterPasswordState.call(self, info);
                oncomplete && oncomplete(!isRegistered);
              }
            }, pageHelpers.getFailure(errors.addressInfo, oncomplete));
          }
        }, pageHelpers.getFailure(errors.isEmailRegistered, oncomplete));
      }
      else {
        oncomplete && oncomplete(false);
      }
    }