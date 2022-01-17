function(tests, status) {
    var url = this.getURL();
    this.report({
      "message": "Finished test, status " + status.status,
      "result": status.status === status.OK,
      "todo":
        url in this.expectedFailures &&
        this.expectedFailures[url] === "error"
    });

    if (this.dumpFailures) {
      dump("@@@ @@@ Failures\n");
      dump(url + "@@@" + JSON.stringify(this.failures) + "\n");
    }
    this.runner.testFinished(this.tests);
  }