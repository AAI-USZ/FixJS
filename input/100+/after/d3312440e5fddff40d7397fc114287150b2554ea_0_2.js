function(message) {
        return this.flash.show(this.error = new ErrorView({
          message: message
        }));
      }