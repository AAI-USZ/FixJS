function defaultReportDiagnosis(severity, status, problemList) {
    var classification = ses.logger.classify(severity);
    ses.logger[classification.consoleLevel](
      problemList.length + ' ' + status);
  }