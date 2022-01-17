function(isRegistered) {
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
        }