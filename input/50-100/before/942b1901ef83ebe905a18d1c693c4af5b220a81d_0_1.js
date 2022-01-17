function() {
    if (this.initialize) this.initialize.apply(this, arguments)
    
    this.validate = this.compile ? linker.link(this.compile())
                                 : this.validate.bind(this)
  }