function(reporterInstance) {
      joePrivate.reporters = [];
      if (reporterInstance != null) {
        joe.addReporter(reporterInstance);
      }
      return joe;
    }