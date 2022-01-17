function() {
  var assert, everythingTestPath, expected, runner, spawn, stdout;

  spawn = require('child_process').spawn;

  assert = require('assert');

  everythingTestPath = __dirname + '/../example/everything.test.js';

  expected = "10/11 tests ran successfully, with 1 errors";

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
    var message, result;
    result = stdout.indexOf(expected) !== -1;
    message = 'THE ABOVE WAS EXACTLY WHAT WE EXPECTED. TESTS HAVE PASSED!';
    assert.ok(result, message);
    return console.log(message);
  });

}