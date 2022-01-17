function (aSubject, aTopic, aData) {
    switch (aTopic) {
    case "profile-after-change":
      updateFilter();
      checkIECompatMode();
      setPref();
      Services.obs.addObserver(this, "quit-application", true);
      break;
    case "quit-application":
      resetPref();
      break;
    };
  }