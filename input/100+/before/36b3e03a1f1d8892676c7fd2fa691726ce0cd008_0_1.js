function() {
    var mode = pst.mode(UnitTest.fn.createErrorWithNoChromeArguments());
    var e = [];
    e.push({
      stack: 'f1(1,"abc")@file.js:40\n()@file.js:41\n@:0  \nf44()@file.js:494'
    });
    if (mode == 'firefox') {
      function f1(arg1, arg2) {
        try {
          this.undef();
        } catch (exception) {
          e.push(exception);
        }
      }
      var f2 = function() {
        f1(1, "abc");
      };
      f2();
    }
    expect(3 * e.length);
    for (var i = 0; i < e.length; i++) {
      var stack = pst.firefox(e[i]);
      //equals(stack.join("\n"), '', 'debug');
      equals(stack[0].indexOf('f1(1,"abc")') >= 0, true, 'f1');
      equals(stack[1].indexOf('{anonymous}()@') >= 0, true, 'f2 anonymous');
      equals(stack[2].indexOf('@:0'), -1, '@:0 discarded');
    }
  }