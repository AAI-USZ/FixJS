function() {
    spy = jasmine.createSpy();
    notCalled = jasmine.createSpy();

    //transform.init();

    this.addMatchers({

      toHaveLogged: function(expected) {
        var args = this.actual.wasCalled ? this.actual.mostRecentCall.args[0] : {},
            actualValue,
            key,
            hasError = false;

        for (key in args) {
          if (args.hasOwnProperty(key)) {

            actualValue = args[key];
            hasError = expected[key] !== actualValue;

            if (hasError) break;
          }
        }

        if (!hasError) {
          for (key in expected) {
            if (expected.hasOwnProperty(key)) {

              actualValue = args[key];
              hasError = expected[key] !== actualValue;

              if (hasError) break;

            }
          }
        }

        this.message = function() {
          if (hasError) {
            return 'Expected ' + key + ' ' + actualValue + ' to be ' + expected[key];
          }
        }

        return !hasError;
      }
    });
  }