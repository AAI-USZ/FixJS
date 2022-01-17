function(suite) {
      var parentSuite, parentSuiteName, suiteName;
      suiteName = suite.getSuiteName();
      parentSuite = suite.getParentSuite();
      if (parentSuite) {
        parentSuiteName = this.getSuiteName(parentSuite);
        suiteName = "" + parentSuiteName + this.config.sub + suiteName;
      }
      return suiteName;
    }