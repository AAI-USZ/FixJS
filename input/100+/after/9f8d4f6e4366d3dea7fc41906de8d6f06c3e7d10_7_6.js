function subprint(f) {
    var _ref;
    if (!(f != null)) {
      return "UNDEFINED";
    } else if (f === null) {
      return 'NULL';
    } else {
      switch (getType(f)) {
        case 'lexCons':
          return "LexCons(" + (f.start()) + ", " + (f.end()) + ")[" + (elements(f, true)) + "]";
        case 'cons':
          return "[" + (elements(f, true)) + "]";
        case 'nil':
          return "[]";
        case 'token':
          return "" + f;
        case 'ioMonad':
          return "IO";
        case 'lit':
          return f(function() {
            return function(v) {
              return JSON.stringify(v());
            };
          });
        case 'ref':
          return f(function() {
            return function(v) {
              return JSON.stringify(v());
            };
          });
        case 'lambda':
          return f(function() {
            return function(v) {
              return function(bod) {
                return "\u03BB" + (printLambda(v(), bod()));
              };
            };
          });
        case 'apply':
          return f(function() {
            return function(func) {
              return function(arg) {
                return printApply(func(), arg());
              };
            };
          });
        case 'some':
          return f(function() {
            return function(v) {
              return "Some(" + (print(v())) + ")";
            };
          })(null);
        case 'some2':
          return f(function() {
            return function(a) {
              return function(b) {
                return "Some2(" + (print(a())) + ", " + (print(b())) + ")";
              };
            };
          })(null);
        case 'left':
          return f(function() {
            return function(l) {
              return "Left(" + (print(l())) + ")";
            };
          })(null);
        case 'right':
          return f(null)(function() {
            return function(r) {
              return "Right(" + (print(r())) + ")";
            };
          });
        case 'html':
          return f(function() {
            return function(txt) {
              return "HTML(" + (txt()) + ")";
            };
          });
        case 'svgNode':
          return f(function() {
            return function(txt) {
              return "SVG NODE(" + (txt()) + ")";
            };
          });
        default:
          if (f instanceof Error) {
            return f.stack;
          } else {
            return (_ref = f.leisureName) != null ? _ref : (inspect != null ? inspect : function(v) {
              return "" + v;
            })(f);
          }
      }
    }
  }