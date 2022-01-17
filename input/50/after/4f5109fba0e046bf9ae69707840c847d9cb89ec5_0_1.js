function failure_message(failures) {
      var count = failures.length;
      if (count === 1) {
        return "1 JSHINT Failure";
      } else {
        return count + " JSHint Failures";
      }
    }