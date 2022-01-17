function checkEmail(info) {
    var email = getEmail(),
        self = this;

    if (!email) return;

    dom.setAttr('#email', 'disabled', 'disabled');
    if(info && info.type) {
      onAddressInfo(info);
    }
    else {
      showHint("addressInfo");
      user.addressInfo(email, onAddressInfo,
        self.getErrorDialog(errors.addressInfo));
    }

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
  }