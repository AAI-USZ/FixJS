function() {
      Utils.debug("DATALIST init: " + this.el);
      
      this.model.bind("change", this.showReadonly, this);
    }