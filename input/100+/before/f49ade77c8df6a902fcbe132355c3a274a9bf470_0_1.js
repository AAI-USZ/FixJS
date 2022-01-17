function() {
        var parsedMessage;
        this.resetTestStatus();
        console.log(this.message);
        parsedMessage = new ParsedMessage(this.message, this.projectName);
        console.log(parsedMessage);
        if (parsedMessage.isSyntaxError) {
          return this.handleSyntaxError();
        } else if (parsedMessage.isAllGreen) {
          return this.allSpecsPass();
        } else if (parsedMessage.isFailure) {
          return this.handleFailures(parsedMessage);
        } else {
          return console.log('Unknown message');
        }
      }