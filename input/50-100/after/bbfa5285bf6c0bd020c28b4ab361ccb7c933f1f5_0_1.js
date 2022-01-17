function defaultReportDiagnosis(severity, status, problemList) {
    var classification = ses.logger.classify(severity);
    ses.logger[classification.consoleLevel](
      problemList.length + ' ' + status);
    if(status !== "Apparently fine") {
      problemList.forEach(function(p) {
        console.log("Reporting diagnosis for " + status);
        console.log(p);
      });
    }
  }