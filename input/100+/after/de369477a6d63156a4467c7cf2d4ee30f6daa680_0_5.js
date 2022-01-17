function(blockedContentSource, violatedDirective, observerSubject,
           aSourceFile, aScriptSample, aLineNum) {
    // if optional observerSubject isn't specified, default to the source of
    // the violation.
    if (!observerSubject)
      observerSubject = blockedContentSource;

    // gotta wrap things that aren't nsISupports, since it's sent out to
    // observers as such.  Objects that are not nsISupports are converted to
    // strings and then wrapped into a nsISupportsCString.
    if (!(observerSubject instanceof Ci.nsISupports)) {
      let d = observerSubject;
      observerSubject = Cc["@mozilla.org/supports-cstring;1"]
                          .createInstance(Ci.nsISupportsCString);
      observerSubject.data = d;
    }

    var reportSender = this;
    Services.tm.mainThread.dispatch(
      function() {
        Services.obs.notifyObservers(observerSubject,
                                     CSP_VIOLATION_TOPIC,
                                     violatedDirective);
        reportSender.sendReports(blockedContentSource, violatedDirective,
                                 aSourceFile, aScriptSample, aLineNum);
      }, Ci.nsIThread.DISPATCH_NORMAL);
  }