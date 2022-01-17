function(code) {
    var message, result;
    result = stdout.indexOf(expected) !== -1;
    message = 'THE ABOVE WAS EXACTLY WHAT WE EXPECTED. TESTS HAVE PASSED!';
    assert.ok(result, message);
    return console.log(message);
  }