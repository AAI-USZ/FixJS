function() {
      var n = this.get('node'); 
      _bridge.request(n);

      return this;
    }