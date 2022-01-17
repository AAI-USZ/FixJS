function() {
      var errorLogs, result, success, totalErrors, totalFailedSuites, totalFailedTests, totalIncompleteSuites, totalIncompleteTests, totalPassedSuites, totalPassedTests, totalSuites, totalTests;
      totalSuites = joePrivate.totalSuites, totalPassedSuites = joePrivate.totalPassedSuites, totalFailedSuites = joePrivate.totalFailedSuites, totalTests = joePrivate.totalTests, totalPassedTests = joePrivate.totalPassedTests, totalFailedTests = joePrivate.totalFailedTests, errorLogs = joePrivate.errorLogs;
      totalIncompleteSuites = totalSuites - totalPassedSuites - totalFailedSuites;
      totalIncompleteTests = totalTests - totalPassedTests - totalFailedTests;
      totalErrors = errorLogs.length;
      success = (totalIncompleteSuites === 0) && (totalFailedSuites === 0) && (totalIncompleteTests === 0) && (totalFailedTests === 0) && (totalErrors === 0);
      result = {
        totalSuites: totalSuites,
        totalPassedSuites: totalPassedSuites,
        totalFailedSuites: totalFailedSuites,
        totalIncompleteSuites: totalIncompleteSuites,
        totalTests: totalTests,
        totalPassedTests: totalPassedTests,
        totalFailedTests: totalFailedTests,
        totalIncompleteTests: totalIncompleteTests,
        totalErrors: totalErrors,
        success: success
      };
      return result;
    }