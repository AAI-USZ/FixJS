function (name, sourceFiles, callback) {
  if (typeof callback !== 'function') {
    callback = function () {
      console.log("No callback supplied");
    };
  }
  executeTestSuite(name, sourceFiles, new CustomReporterWithCallback(callback, jasminens.jasmine.pp));
}