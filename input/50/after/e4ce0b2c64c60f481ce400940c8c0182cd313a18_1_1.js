function() {
      if (!errorSent) {
        errorSent = true;
        this.trigger('error', 'An error occured - ' + this.player.error.code);
      }
    }