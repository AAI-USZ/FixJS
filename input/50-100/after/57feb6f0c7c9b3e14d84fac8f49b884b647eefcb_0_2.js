function(message) {
        console.log(message);
        return message.indexOf('SyntaxError:') !== -1;
      }