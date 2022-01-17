function KeyEventManager(mappings, selector) {
      this.mappings = mappings;
      this.selector = selector;
      this.keyup = __bind(this.keyup, this);
      this.keydown = __bind(this.keydown, this);
      if (!this.mappings) this.mappings = new Map();
      $(document).on({
        keydown: this.keydown,
        keyup: this.keyup
      }, this.selector);
    }