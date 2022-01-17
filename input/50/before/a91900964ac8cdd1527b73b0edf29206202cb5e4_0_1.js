function() {
      var n = this.get('node'); 
      if (! n) { return false; }
      _bridge.request(n);

      return this;
    }