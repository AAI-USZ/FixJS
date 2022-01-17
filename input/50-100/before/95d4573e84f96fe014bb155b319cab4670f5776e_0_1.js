function( options ) {
    
    var defaults = this.options || Consumer.defaults
    
    for( var i in defaults ) {
      if( defaults.hasOwnProperty( i ) ) {
        this[i] = options[i] || defaults[i]
      }
    }
    
    this.signature_method = this.signature_method.toUpperCase()
    
  }