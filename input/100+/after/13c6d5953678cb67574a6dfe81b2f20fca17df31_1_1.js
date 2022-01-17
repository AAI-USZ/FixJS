function() {
      Utils.debug("CORPUS init: " + this.el);
  
      this.changeViewsOfInternalModels();
      this.model.bind('change', this.changeViewsOfInternalModels, this);

    }