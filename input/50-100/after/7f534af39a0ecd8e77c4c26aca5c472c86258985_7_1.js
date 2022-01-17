function onAddressInfo(info) {
      addressInfo = info;
      dom.removeAttr('#email', 'disabled');

      if(info.type === "primary") {
        self.close("primary_user", info, info);
      }
      else if(info.known) {
        enterPasswordState.call(self);
      } else {
        createSecondaryUser.call(self);
      }
    }