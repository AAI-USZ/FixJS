function(isRegistered) {
          if(isRegistered) {
            dom.removeAttr('#email', 'disabled');
            $('#registeredEmail').html(email);
            showNotice(".alreadyRegistered");
            oncomplete && oncomplete(false);
          }
          else {
            user.addressInfo(email, function(info) {
              dom.removeAttr('#email', 'disabled');
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