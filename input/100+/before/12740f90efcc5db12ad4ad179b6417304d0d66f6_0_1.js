function(it){
    var ops, _;
    if (cont) {
      code += it + '\n';
      rl.output.write(__repeatString('.', prompt.length) + '. ');
      return;
    }
    code += it;
    try {
      if (o.compile) {
        say(LiveScript.compile(code, {
          bare: o.bare
        }));
      } else {
        ops = {
          'eval': 'eval',
          bare: true,
          saveScope: LiveScript
        };
        if (code.match(/^\s*!?function/)) {
          ops = {
            bare: true
          };
        }
        _ = vm.runInThisContext(LiveScript.compile(code, ops), 'repl');
        _ != null && (global._ = _);
        pp(_);
        if (typeof _ === 'function') {
          say(_);
        }
      }
    } catch (e) {
      say(e);
    }
    reset();
  }