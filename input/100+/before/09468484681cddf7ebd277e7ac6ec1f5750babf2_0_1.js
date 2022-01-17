function() {
      if (this.model == undefined) {
        Utils.debug("\tDataList model is not defined");
        return this;
      }
      if (this.format == "fullscreen") {
        Utils.debug("DATALIST fullscreen render: " + this.el);

        this.setElement($("#data-list-fullscreen"));
        $(this.el).html(this.fullscreenTemplate(this.model.toJSON()));
        // Display the pagination footer
        this.renderUpdatedPagination();
        // TODO Display the first page of DatumReadViews.
        // this.renderNewModel();
      } else if (this.format == "leftSide") {
        Utils.debug("DATALIST leftSide render: " + this.el);

        this.setElement($("#data-list-embedded"));
        $(this.el).html(this.embeddedTemplate(this.model.toJSON()));
        // Display the pagination footer
        this.renderUpdatedPagination();
        // TODO Display the first page of DatumReadViews.
        // this.renderNewModel();
      } else if (this.format == "import"){
        this.setElement($("#import-data-list-view"));
        $(this.el).html(this.embeddedTemplate(this.model.toJSON()));
        // Display the pagination footer
        this.renderUpdatedPagination();
      }else if(this.format == "centreWell"){
        Utils.debug("DATALIST CentreWell render: " + this.el);

        this.setElement($("#new-datalist-embedded"));
        $(this.el).html(this.embeddedTemplate(this.model.toJSON()));
        // Display the pagination footer
        this.renderUpdatedPagination();
        // TODO Display the first page of DatumReadViews.
        // this.renderNewModel();
      
      }
      
      

      return this;
    }