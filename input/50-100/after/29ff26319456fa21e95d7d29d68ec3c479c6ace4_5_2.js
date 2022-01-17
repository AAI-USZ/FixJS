function(event) {
      event.preventDefault();
      var $target = $(event.target);

      // make sure that this isn't propagation
      if ($target.is('a')) {
        this.forceActive();
      }
    }