function (aSubject, aTopic, aData) {
    switch (aTopic) {
    case "profile-after-change":
      updateFilter();
      checkIECompatMode();
      break;
    };
  }