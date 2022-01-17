function() {
    var results = [];
    var p = new printStackTrace.implementation();
    var file = 'http://' + window.location.hostname + '/file.js';
    p.sourceCache[file] = ['var f2 = function() {', 'var b = 2;', '};'];
    results.push(['createException() (' + file + ':1:1)', 'run() (' + file + ':1:1)', 'f2() (' + file + ':1:1)']);

    var f2 = function() {
      try {
        this.undef();
      } catch (e) {
        if (p.mode(e) == 'chrome') {
          results.push(p.run());
        }
      }
    };
    f2();

    expect(results.length);
    for (var i = 0; i < results.length; ++i) {
      //equals((results[i]), '', 'debug');
      var functions = p.guessAnonymousFunctions(results[i]);
      //equals(functions.join("\n"), '', 'debug contents of stack');
      equals(functions[2].indexOf('f2()'), 0, 'guessed f2 in ' + functions[2]);
    }
  }