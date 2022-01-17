function(message, expectedFields) {
      ok(message in calls, message + " was triggered");
      if (expectedFields) this.testObjectValuesEqual(calls[message], expectedFields);
    }