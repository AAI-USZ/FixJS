function() {
      //seen can be set to anything other
      //then false to override this behaviour
      if (this.seen === false) {
        this.onfirstseen();
      }

      // intentionally using 'in'
      if ('dispatch' in this) {
        this.dispatch.apply(this, arguments);
      }

      this.seen = true;
      if (this.element) {
        this.element.classList.add(this.activeClass);
      }
    }