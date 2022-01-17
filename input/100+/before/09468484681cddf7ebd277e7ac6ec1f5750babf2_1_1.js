function() {
      Utils.debug("DATALIST render: " + this.el);
      
      if (this.format == "link") {
        // Display the Data List
        this.setElement($("#data-list-link"));
        $(this.el).html(this.linkTemplate(this.model.toJSON()));
      } else if (this.format == "leftSide") {
        this.setElement($("#data-list-embedded"));
        $(this.el).html(this.embeddedTemplate(this.model.toJSON()));
          
        // Display the pagination footer
        this.renderUpdatedPagination();
       
      }else if (this.format == "fullscreen") {
        // Display the Data List
        this.setElement($("#data-list-fullscreen"));
        $(this.el).html(this.fullscreenTemplate(this.model.toJSON()));
          
        // Display the pagination footer
        this.renderUpdatedPagination();
        
        // TODO Display the first page of DatumReadViews.
        // this.renderNewModel();
      }else if(this.format == "middle"){
        
        this.setElement($("#new-data-list-embedded"));
        $(this.el).html(this.embeddedTemplate(this.model.toJSON()));
        // Display the pagination footer
        this.renderUpdatedPagination();
        // TODO Display the first page of DatumReadViews.
        // this.renderNewModel();
      
      }
      
      return this;
    }