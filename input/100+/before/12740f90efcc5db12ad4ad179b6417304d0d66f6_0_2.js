function repl(){
  var code, cont, readline, reset, prompt, that, vm, server, _ttyWrite, __ref;
  argv[1] = 'repl';
  code = repl.infunc ? '  ' : '';
  cont = false;
  readline = require('readline').createInterface(process.stdin, process.stdout);
  reset = function(){
    readline.line = code = '';
    readline.prompt();
  };
  (_ttyWrite = readline._ttyWrite, readline)._ttyWrite = function(chr){
    cont = chr == '\n' || chr == '>';
    return _ttyWrite.apply(this, arguments);
  };
  prompt = 'livescript';
  if (that = [o.bare ? 'b' : void 8, o.compile ? 'c' : void 8].join('')) {
    prompt += " -" + that;
  }
  if (typeof LiveScript != 'undefined' && LiveScript !== null) {
    LiveScript.history = readline.history;
  }
  if (!o.compile) {
    module.paths = module.constructor._nodeModulePaths(module.filename = process.cwd() + '/repl');
    vm = require('vm');
    global.module = module;
    global.exports = exports;
    global.require = require;
    server = (__ref = __clone(require('repl').REPLServer.prototype), __ref.context = global, __ref.commands = [], __ref.useGlobal = true, __ref.eval = function(code, __arg, __arg1, cb){
      var res, err;
      try {
        res = vm.runInThisContext(code, 'repl');
      } catch (e) {
        err = e;
      }
      cb(err, res);
    }, __ref);
    rl.completer = __bind(server, 'complete');
  }
  rl.on('attemptClose', function(){
    if (rl.line || code) {
      say('');
      reset();
    } else {
      rl.close();
    }
  });
  rl.on('close', __bind(process.stdin, 'destroy'));
  rl.on('line', function(it){
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
  });
  process.on('uncaughtException', function(it){
    say("\n" + ((it != null ? it.stack : void 8) || it));
  });
  readline.setPrompt(prompt + "> ");
  readline.prompt();
}