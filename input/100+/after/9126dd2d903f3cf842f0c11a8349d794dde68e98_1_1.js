f  // The other stuff is done so reuse unix socket
  var read_buffer = '';
  client_unix.removeAllListeners('data');

  client_unix.on('data', function(data) {
    read_buffer += data.toString('ascii', 0, data.length);
    common.error('Unix data: ' + JSON.stringify(read_buffer) + ', expecting ' +
                 (client_unix.expect.exec ?
                  client_unix.expect :
                  JSON.stringify(client_unix.expect)));

    if (read_buffer.indexOf(prompt_unix) !== -1) {
      // if it's an exact match, then don't do the regexp
      if (read_buffer !== client_unix.expect) {
        assert.ok(read_buffer.match(client_unix.expect));
        common.error('match');
      }
      read_buffer = '';
      if (client_unix.list && client_unix.list.length > 0) {
        send_expect(client_unix.list);
      } else {
        common.error('End of Error test, running TCP test.');
        tcp_test();
      }

    } else if (read_buffer.indexOf(prompt_multiline) !== -1) {
      // Check that you meant to send a multiline test
      assert.strictEqual(prompt_multiline, client_unix.expect);
      read_buffer = '';
      if (client_unix.list && client_unix.list.length > 0) {
        send_expect(client_unix.list);
      } else {
        common.error('End of Error test, running TCP test.\n');
        tcp_test();
      }

    } else {
      common.error('didn\'t see prompt yet, buffering.');
    }
  });

  send_expect([
    // Uncaught error throws and prints out
    { client: client_unix, send: 'throw new Error(\'test error\');',
      expect: /^Error: test error/ },
    // Common syntax error is treated as multiline command
    { client: client_unix, send: 'function test_func() {',
      expect: prompt_multiline },
    // You can recover with the .break command
    { client: client_unix, send: '.break',
      expect: prompt_unix },
    // Can parse valid JSON
    { client: client_unix, send: 'JSON.parse(\'{"valid": "json"}\');',
      expect: '{ valid: \'json\' }'},
    // invalid input to JSON.parse error is special case of syntax error,
    // should throw
    { client: client_unix, send: 'JSON.parse(\'{invalid: \\\'json\\\'}\');',
      expect: /^SyntaxError: Unexpected token i/ },
    // Named functions can be used:
    { client: client_unix, send: 'function blah() { return 1; }',
      expect: prompt_unix },
    { client: client_unix, send: 'blah()',
      expect: '1\n' + prompt_unix },
    // Functions should not evaluate twice (#2773)
    { client: client_unix, send: 'var I = [1,2,3,function() {}]; I.pop()',
      expect: '[Function]' },
    // Multiline object
    { client: client_unix, send: '{ a: ',
      expect: prompt_multiline },
    { client: client_unix, send: '1 }',
      expect: '{ a: 1 }' },
    // Multiline anonymous function with comment
    { client: client_unix, send: '(function () {',
      expect: prompt_multiline },
    { client: client_unix, send: '// blah',
      expect: prompt_multiline },
    { client: client_unix, send: 'return 1;',
      expect: prompt_multiline },
    { client: client_unix, send: '})()',
      expect: '1' },
    // npm prompt error message
    { client: client_unix, send: 'npm install foobar',
      expect: expect_npm },
    { client: client_unix, send: '(function () {\n\nreturn 1;\n})()',
      expect: '1' },
    { client: client_unix, send: '{\n\na: 1\n}',
      expect: '{ a: 1 }' }
  ]);
}
