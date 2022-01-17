function(info) {
              dom.removeAttr('#email', 'disabled');
              if(info.type === "primary") {
                createPrimaryUser.call(self, info, oncomplete);
              }
              else {
                enterPasswordState.call(self, info);
                oncomplete && oncomplete(!isRegistered);
              }
            }