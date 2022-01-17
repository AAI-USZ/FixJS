function(newStatus) {
    failure = null;

    status = newStatus;

    if(newStatus === Provisioning.NOT_AUTHENTICATED) {
      failure = {
        code: "primaryError",
        msg: "user is not authenticated as target user"
      };
    }
  }