function() {
      Utils.debug("CORPUS DETAILS init: " + this.el);
      this.changeViewsOfInternalModels();
     
      
      // If the model changes, re-render
      this.model.bind('change', this.showEditable, this);
    }