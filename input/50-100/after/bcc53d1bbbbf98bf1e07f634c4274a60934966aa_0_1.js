function(node) {
        var error, livecoffee;
        error = {
          filePath: node.getAttribute('errorFilePath'),
          line: node.getAttribute('errorLine'),
          column: node.getAttribute('errorColumn')
        };
        livecoffee = require('ext/livecoffee/livecoffee');
        return livecoffee.show(error.filePath, error.line, error.column);
      }