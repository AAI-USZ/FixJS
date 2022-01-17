function(message) {
        return this.flash.append(this.error = new ErrorView({
          message: message
        }));
      }