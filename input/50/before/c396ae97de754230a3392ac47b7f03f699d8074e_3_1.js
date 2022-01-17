function() {
      this.model.bind("change:skin", this.renderSkin, this);
      
      if (this.model.get("skin") == "") {
        this.randomSkin();
      }
    }