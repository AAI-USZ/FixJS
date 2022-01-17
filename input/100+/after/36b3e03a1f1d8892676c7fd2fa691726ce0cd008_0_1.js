function() {
    var e = [], ex;
    var stack = 'f1(1,"abc")@file.js:40\n' +
      '()@file.js:41\n' + 
      '@:0  \n' + 
      'f44()@file.js:494';
    e.push({
      stack: stack
    }); // test saved Firefox stacktrace
    function f1(arg1, arg2) {
      try {
        this.undef();
      } catch (exception) {
        ex = exception;
      }
    }
    var f2 = function() {
      f1(1, "abc");
    };
    f2();
    if (pst.mode(ex) == 'firefox') {
      e.push(ex);
    }
    expect(3 * e.length);
    for (var i = 0; i < e.length; i++) {
      var stack = pst.firefox(e[i]);
      // equals(stack.join("\n"), '', 'debug');
      equals(stack[0].indexOf('f1(1,"abc")') >= 0, true, 'f1');
      equals(stack[1].indexOf('{anonymous}()@') >= 0, true, 'f2 anonymous');
      equals(stack[2].indexOf('@:0'), -1, '@:0 discarded');
    }
  }