function(message) {
			var console, err;
      if (VERBOSITY) {
        // FF/Safari/Opera DOMException.SYNTAX_ERR = 12
        if (typeof global.DOMException !== 'undefined') {
          err = new Error();
          err.message = 'SYNTAX_ERR: (Selectors) ' + message;
          err.code = 12;
          throw err;
        } else {
          throw new Error(12, 'SYNTAX_ERR: (Selectors) ' + message);
        }
      } else {
        console = global.console;
        if (console && console.log) {
          console.log(message);
        } else {
          if (/exception/i.test(message)) {
            global.status = message;
            global.defaultStatus = message;
          } else {
            global.status += message;
          }
        }
      }
    }