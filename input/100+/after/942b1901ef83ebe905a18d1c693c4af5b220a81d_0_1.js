function() {
    if (this.sealed) return this.validate
    this.sealed = true
    
    if (this.leafs) {
      var leafs = this.leafs()
      if (leafs.certain.indexOf(schema.self) !== -1) {
        throw new Error('There\'s no object that satisfies this schema.')
      }
      if (leafs.uncertain.indexOf(schema.self) !== -1) {
        // If the validate function is compiled then recompiling it with self inlining
        if (this.compile) {
          var newValidate = linker.link(this.compile(), schema.self.validate)
          for (var key in this.validate) newValidate[key] = this.validate[key]
          newValidate.schema = newValidate
          this.validate = newValidate
        }
        
        // schema.self needs to be pointed to this schema, and then it must be reset
        schema.self.set(this.validate)
        schema.self = new SelfSchema()
      }
    }
    
    delete this.validate.assembly
    
    return this.validate
  }