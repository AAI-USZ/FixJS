function(name){
      return this.each(function(){ if (this.nodeType === 1) this.removeAttribute(name) })
    }