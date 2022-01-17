function(info) {
              if(info.type === "primary") {
                createPrimaryUser.call(self, info, oncomplete);
              }
              else {
                enterPasswordState.call(self, info);
                oncomplete && oncomplete(!isRegistered);
              }
            }