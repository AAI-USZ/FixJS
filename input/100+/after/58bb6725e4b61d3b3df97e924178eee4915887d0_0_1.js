function(buffer) {
    var code, returnValue, _;
    if (multilineMode) {
      backlog += "" + buffer + "\n";
      repl.setPrompt(REPL_PROMPT_CONTINUATION);
      repl.prompt();
      return;
    }
    if (!buffer.toString().trim() && !backlog) {
      repl.prompt();
      return;
    }
    code = backlog += buffer;
    if (code[code.length - 1] === '\\') {
      backlog = "" + backlog.slice(0, -1) + "\n";
      repl.setPrompt(REPL_PROMPT_CONTINUATION);
      repl.prompt();
      return;
    }
    repl.setPrompt(REPL_PROMPT);
    backlog = '';
    try {
      _ = global._;
      returnValue = CoffeeScript.eval("_=(" + code + "\n)", {
        filename: 'repl',
        modulename: 'repl'
      });
      if (returnValue === void 0) global._ = _;
      repl.output.write("" + (inspect(returnValue, false, 2, enableColours)) + "\n");
    } catch (err) {
      error(err);
    }
    return repl.prompt();
  }