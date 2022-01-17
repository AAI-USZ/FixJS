function() {
      this.model.bind("change:skin", this.renderSkin, this);
          
      this.model.bind("change", this.render, this);
    }