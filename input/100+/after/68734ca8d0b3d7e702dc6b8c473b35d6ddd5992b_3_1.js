function() {
  var assert, everythingTestPath, expected, runner, spawn, stdout;

  spawn = require('child_process').spawn;

  assert = require('assert');

  everythingTestPath = __dirname + '/../example/everything.test.js';

  expected = "FAILURE: 10/11 tests ran successfully; 1 failed, 0 incomplete, 1 errors";

  stdout = '';

  runner = spawn('node', [everythingTestPath]);

  runner.stdout.on('data', function(data) {
    stdout += data;
    return process.stdout.write(data);
  });

  runner.stderr.on('data', function(data) {
    return process.stderr.write(data);
  });

  runner.on('exit', function(code) {
    var pass;
    pass = stdout.indexOf(expected) !== -1;
    if (pass) {
      console.log('THE ABOVE IS WHAT WE EXPECTED. TESTS HAVE PASSED');
    } else {
      console.log('THE ABOVE IS NOT WHAT WE WE EXPECTED. TESTS HAVE FAILED');
    }
    return assert.ok(pass);
  });

}