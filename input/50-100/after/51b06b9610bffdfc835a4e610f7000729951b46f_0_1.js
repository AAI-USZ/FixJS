function(line) {
        var _this = this;
        console.log("linenumber is " + line);
        line = line - 1;
        return setTimeout((function() {
          return _this.startLiveCoffee(line);
        }), OPEN_FILE_TIMEOUT);
      }