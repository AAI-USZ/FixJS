function emailSent(pollFuncName, onComplete) {
    origStoredEmail = getStoredEmail();
    dom.setInner('#sentToEmail', origStoredEmail);

    clearStoredEmail();

    replaceInputsWithNotice(".emailsent");

    user[pollFuncName](origStoredEmail, function(status) {
      userValidationComplete(status);
    });
    onComplete && onComplete();
  }