function() {
      Utils.debug("DATALIST init: " + this.el);
      
      this.model.bind("change:title change:dateCreated change:description", this.renderUpdatedDataList, this);
      this.model.bind("change:title ", this.render, this);
    }