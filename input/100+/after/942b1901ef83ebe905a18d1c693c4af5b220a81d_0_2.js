function() {
    if (this.wrapped) return this.validate
    this.wrapped = true
    
    var publicFunctions = [ 'seal', 'toJSON', 'generate', 'getId', 'leafs', 'unwrap' ]
    publicFunctions = publicFunctions.concat(this.publicFunctions || [])
    
    for (var i = 0; i < publicFunctions.length; i++) {
      if (!this[publicFunctions[i]]) continue
      this.validate[publicFunctions[i]] = this[publicFunctions[i]].bind(this)
    }
    
    return this.validate
  }