function cancelAccount(oncomplete) {
    if (confirmAction(gettext("Are you sure you want to cancel your Persona account?"))) {
      user.cancelUser(function() {
        doc.location="/";
        oncomplete && oncomplete();
      }, pageHelpers.getFailure(errors.cancelUser, oncomplete));
    }
  }