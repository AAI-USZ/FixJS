function() {
      Utils.debug("USER init: " + this.el);
      
      if(this.model._callbacks == undefined){
        this.model.set((new User()).parse(this.model));
      }
      // this.model.bind('change:gravatar', this.render, this);
    }