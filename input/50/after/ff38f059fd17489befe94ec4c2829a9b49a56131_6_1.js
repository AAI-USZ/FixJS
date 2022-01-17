function() {
      if( !this.$$instance ) {
        this.$$allowconstruct = true;
        var Constructor = this;
        this.$$instance = new Constructor();
        delete this.$$allowconstruct;
      }
      return this.$$instance;
    }