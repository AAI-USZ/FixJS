function() {
        Services.obs.notifyObservers(observerSubject,
                                     CSP_VIOLATION_TOPIC,
                                     violatedDirective);
        reportSender.sendReports(blockedContentSource, originalUri,
                                 violatedDirective,
                                 aSourceFile, aScriptSample, aLineNum);
      }