function(suite) {
  var results = suite.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.totalCount === 0) { // todo: change this to check results.skipped
    status = 'skipped';
  }
  this.suiteDivs[suite.id].className += " " + status;
}