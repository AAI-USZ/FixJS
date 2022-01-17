function (testCase, callback) {
  this.stats.time -= Date.now();

  var self = this, input = ''
    , testCasePad = typeof testCase === 'number' ? this.rjust(testCase, this.options.rjust) : ''
    , testDir = typeof testCase === 'string' ? testCase : testCasePad
    , testCase = this.options.prefix + testDir;

  if (path.existsSync(testCase) && path.existsSync(testCase + '/' + this.options.program)) {
    if (path.existsSync(testCase + '/' + this.options.input)) {
      input = " < " + testCase + '/' + this.options.input;
    }
    console.log(testDir.cyan.bold);
    cp.exec(this.command + ' ' + testCase + '/' + this.options.program + input + ' > ' + testCase + '/output', function (err, data) {
      if (err) {
        self.result('> NO TESTCASE', callback);
      } else {
        cp.exec('diff -N ' + testCase + '/' + self.options.answer + ' ' + testCase + '/output', function (err, data) {
          self.result(data, callback);
        });
      }
    });
  } else {
    this.stats.time += Date.now();
    callback();
  }
}