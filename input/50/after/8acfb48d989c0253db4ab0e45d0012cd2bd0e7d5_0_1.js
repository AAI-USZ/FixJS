function defaultReportRepairs(reports) {
    reports.forEach(function(report) {
      if (report && report.status !== "All fine") {
        console.log(report.description);
        console.log(report.status);
      }
    });
  }