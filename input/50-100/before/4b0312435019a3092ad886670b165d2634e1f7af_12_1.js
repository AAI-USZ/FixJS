function(tpl, context) {
        var compile, msg;
        try {
          compile = require('haml-coffee').compile;
        } catch (e) {
          msg = "" + (error('Haml-coffee module not found, run neat install.'.red)) + "\n\n" + e.stack;
          return puts(msg);
        }
        return compile(tpl)(context);
      }