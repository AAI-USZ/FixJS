function(over) {
        var readline;
        readline = require('readline');
        if (readline.emitKeypressEvents) {
          readline.emitKeypressEvents(process.stdin);
        }
        return Program.password('Choose a password:', function(password) {
          config.password = PasswordHash.generate(password);
          return over();
        });
      }