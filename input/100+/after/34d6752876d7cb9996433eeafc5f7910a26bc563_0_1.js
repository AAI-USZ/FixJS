function (err, data) {
      if (err) return callback(err);

      var code = "";
      var lines = data.split("\n");

      if (query.tag) {
        // extract code between tag
        var arr = [];
        var re = new RegExp("\/{2} ?\/{2}#" + query.tag + "$", "i");
        var i = 0;
        var positions = [];

        lines.forEach(function (line) {
          i++;
          if (line.match(re))
            positions.push(i);
        });
        
        if ((positions.length > 0) && (positions.length % 2 === 0)) {
          var tmp = [];
          for (var j=0; j<positions.length; j=j+2) {
            var start = positions[j];
            var end = positions[j + 1];
            tmp = tmp.concat(lines.slice(start, end - 1), ["\n"]);            
          }
          tmp.pop();  // to remove the last \n          
          code = tmp.join("\n");          
        }        
      } else {
        // skip tags and check for linestart and lineend
        var arr = [];
        lines.forEach(function (line) {
          if (line.match(/\/{2} ?\/{2}#.*/) == null)
            arr.push(line);
        });
        code = arr.join("\n");

        if (query.linestart && query.lineend) {
          lines = code.split("\n");
          var linestart = parseInt(query.linestart, 10) || 0;
          var lineend = parseInt(query.lineend, 10) || 0;
          if (lineend) lines.length = lineend;
          if (linestart) lines = lines.slice(linestart - 1);

          code = lines.join("\n");
        }
      }

      // Unindent block if needed
      if (query.outdent) {
      	lines = code.split("\n");
        
        // remove spaces
        var min = Infinity;
        lines.forEach(function (line) {
          var match = line.match(/^([ \t]+).*/);
          if (match != null) {
            var i = match[1].length;            
            if (i < min) min = i;
          }
        });
        if (min && min < Infinity) {
          lines = lines.map(function (line) {
            return line.substr(min);
          });
        }
        code = lines.join("\n");
      }

      var supportedLang = ["1c", "actionscript", "apache", "at", "avrasm", "axapta", "bash", "clojure", "cmake", "coffeesc", "ript", "cpp", "cs", "css", "d", "delphi", "diff", "django", "dos", "erlang", "erlang-repl", "glsl", "go", "haskell", "http", "ini", "java", "javascript", "json", "lisp", "lua", "markdown", "matlab", "mel", "nginx", "objectivec", "parser3", "perl", "php", "profile", "python", "r", "rib", "rsl", "ruby", "rust", "scala", "smalltalk", "sql", "tex", "vala", "vbscript", "vhdl", "xml"];

      if ((query.lang) && (supportedLang.indexOf(query.lang) != -1)) {
        html = hljs.highlight(query.lang, code).value;
      } else {
        var extension = Path.extname(req.params.file);
        var html;

        switch(extension) {
          case '.js':
          case '.tpl':
          case '.tml':
            html = hljs.highlight("at", code).value;
            break;
          case '.css':
            if (req.params.file.indexOf(".tpl.css") != -1) {
              html = hljs.highlight("at", code).value;
            } else {
              html = hljs.highlight("css", code).value;
            }
            break;
          default:
            html = hljs.highlightAuto(code).value;
            break;
        }
      }
      var url = getOriginalUrl(),
          name = req.params.file,
          js = createSnippet(url, name, html, query);
      callback(null, js);
    }