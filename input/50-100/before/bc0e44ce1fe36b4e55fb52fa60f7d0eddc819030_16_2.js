function() {
      //seen can be set to anything other
      //then false to override this behaviour
      if (this.seen === false) {
        this.onfirstseen();
      }

      this.seen = true;
      if (this.element) {
        this.element.classList.add(this.activeClass);
      }
    }