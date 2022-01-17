function(message) {
        var error;
        return this.flash.append(error = new ErrorView({
          message: message
        }));
      }