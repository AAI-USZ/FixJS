function(tpl, context) {
        var compile, msg;
        try {
          compile = require('haml-coffee').compile;
        } catch (e) {
          msg = "" + 'Haml-coffee module not found, run neat install.'.red + "\n\n" + e.stack;
          return error(msg);
        }
        return compile(tpl)(context);
      }