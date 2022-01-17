function cli() {
    var optparser = new util.OptParser([
      ["E", "only-parse",   false, "Only parse"],
      ["A", "emit-ast",     false, "Do not generate JS, emit AST"],
      ["P", "pretty-print", false, "Pretty-print AST instead of emitting JSON (with -A)"],
      ["b", "bare",         false, "Do not wrap in a module"],
      ["l", "load-instead", false, "Emit load('memory') instead of require('memory')"],
      ["W", "warn",         true,  "Print warnings (enabled by default)"],
      ["Wconversion", null, false, "Print intra-integer and pointer conversion warnings"],
      ["0", "simple-log",   false, "Log simple messages. No colors and snippets."],
      ["t", "trace",        false, "Trace compiler execution"],
      ["h", "help",         false, "Print this message"]
    ]);

    var p = optparser.parse(argv);
    if (!p) {
      quit();
    }

    var options = p.options;
    var files = p.rest;

    if (!files.length || options.help) {
      print("ljc: [option(s)] file");
      print(optparser.usage());
      quit();
    }

    var filename = files[0];
    var path = filename.split("/");
    var basename = path.pop();
    var dir = path.join("/");
    basename = basename.substr(0, basename.lastIndexOf(".")) || basename;

    var source = snarf(filename);
    var code = compile(basename, filename, source, options);

    if (options["pretty-print"]) {
      print(pretty(code));
    } else {
      // SpiderMonkey has no way to write to a file, but if we're on node we can
      // emit .js.
      if (mode === NODE_JS) {
        var outname = (dir ? dir + "/" : "") + basename;
        if (options["emit-ast"]) {
          require('fs').writeFileSync(outname + ".json", JSON.stringify(code, null, 2));
        } else {
          // Escodegen doesn't emit a final newline for some reason, so add one.
          require('fs').writeFileSync(outname + ".js", code + "\n");
        }
      } else {
        print(code);
      }
    }
  }