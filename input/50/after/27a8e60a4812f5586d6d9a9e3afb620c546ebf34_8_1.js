function handleAddressVerifyCheckResponse(onComplete, status, textStatus, jqXHR) {
    if (status.status === 'complete' && status.userid)
      setUserID(status.userid);
    complete(onComplete, status.status);
  }