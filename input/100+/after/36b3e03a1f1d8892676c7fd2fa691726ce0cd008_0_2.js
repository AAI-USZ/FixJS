function() {
    var e = [], ex;

    var stack = "TypeError: Object [object Window] has no method 'undef'\n" +
    "    at f0 (test/test-stacktrace.js:198:20)\n" +
    "    at f1 (test/test-stacktrace.js:203:10)\n" +
    "    at f2 (test/test-stacktrace.js:206:10)\n" +
    "    at Object.<anonymous> (test/test-stacktrace.js:208:6)\n" +
    "    at Object.run (test/qunit.js:89:18)\n" +
    "    at test/qunit.js:214:10\n" +
    "    at process (test/qunit.js:783:23)\n" +
    "    at test/qunit.js:383:5";
    e.push({
      stack: stack
    }); // test saved Chrome stacktrace
    function f0() {
      try {
        this.undef();
      } catch (exception) {
        ex = exception;
      }
    }
    function f1(arg1, arg2) {
      f0();
    }
    var f2 = function() {
      f1(1, "abc");
    };
    f2();
    if (pst.mode(ex) == 'chrome') {
      e.push(ex);
    } // test native Chrome stacktrace
    expect(4 * e.length);
    for (var i = 0; i < e.length; i++) {
      var message = pst.chrome(e[i]);
      // equals(e[i].stack, '', 'original stack trace');
      // equals(message.join("\n"), '', 'processed stack trace');
      equals(message[0].indexOf('f0') >= 0, true, 'f0 is top of stack');
      equals(message[1].indexOf('f1') >= 0, true, 'f1 is second called function');
      equals(message[2].indexOf('f2') >= 0, true, 'f2 anonymous function guessed automatically');
      equals(message[3].indexOf('anonymous') >= 0, true, 'f2 anonymous function called');
    }
  }