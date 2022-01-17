function(report) {
      if (report !== undefined && report.status !== "All fine") {
        console.log(report.description);
        console.log(report.status);
      }
    }