function(suite, testName, separator) {
      var result, suiteName;
      result = testName;
      if (separator && (suite != null)) {
        suiteName = joe.getSuiteName(suite, separator);
        result = '';
        result += "" + suiteName;
        if (testName) {
          result += "" + separator + testName;
        }
      }
      return result;
    }