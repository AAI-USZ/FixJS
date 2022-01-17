function emailSent(onComplete) {
    origStoredEmail = getStoredEmail();
    dom.setInner('#sentToEmail', origStoredEmail);

    clearStoredEmail();

    replaceInputsWithNotice(".emailsent");

    user.waitForUserValidation(origStoredEmail, function(status) {
      userValidationComplete(status);
    });
    onComplete && onComplete();
  }