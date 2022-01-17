function makeurl() {
  var testEnv = QUnit.current_testEnvironment;
  var url = testEnv.url || 'http://example.com/search';
  var q   = testEnv.q   || 'a search test';
  return url + '?q='+encodeURIComponent(q);
}