function() {
        Services.obs.notifyObservers(observerSubject,
                                     CSP_VIOLATION_TOPIC,
                                     violatedDirective);
        reportSender.sendReports(blockedContentSource, violatedDirective,
                                 aSourceFile, aScriptSample, aLineNum);
      }