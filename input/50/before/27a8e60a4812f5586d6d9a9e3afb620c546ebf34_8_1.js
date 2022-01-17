function handleAddressVerifyCheckResponse(onComplete, status, textStatus, jqXHR) {
    if (status.status === 'complete') {
      // The user at this point can ONLY be logged in with password
      // authentication. Once the registration is complete, that means
      // the server has updated the user's cookies and the user is
      // officially authenticated.
      auth_status = 'password';

      if (status.userid) setUserID(status.userid);
    }
    complete(onComplete, status.status);
  }