function(code) {
    var pass;
    pass = stdout.indexOf(expected) !== -1;
    if (pass) {
      console.log('THE ABOVE IS WHAT WE EXPECTED. TESTS HAVE PASSED');
    } else {
      console.log('THE ABOVE IS NOT WHAT WE WE EXPECTED. TESTS HAVE FAILED');
    }
    return assert.ok(pass);
  }