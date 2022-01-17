function (suite) {
        var results = suite.results(),
            passed,
            data = this._topLevelSuiteMap[suite.getFullName()];
        
        if ((suite.getFullName() === this.params.get("spec")) && data) {
            passed = results.passed();
                               
            data.$badgeAll.hide();
        }
    }