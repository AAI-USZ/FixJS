function(tpl, context) {
        var msg, to_html;
        try {
          to_html = require('mustache').to_html;
        } catch (e) {
          msg = "" + 'Mustache module not found, run neat install.'.red + "\n\n" + e.stack;
          return error(msg);
        }
        return to_html(tpl, context);
      }