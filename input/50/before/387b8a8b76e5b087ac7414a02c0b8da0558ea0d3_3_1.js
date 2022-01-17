function onComplete(authenticated) {
      equal(authenticated, undefined, "We are not authenticated!");
      start();
    }